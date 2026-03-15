import { and, desc, eq, lt } from "drizzle-orm";
import type { Db } from "@paperclipai/db";
import { agents, chatMessages, conversations } from "@paperclipai/db";
import { notFound } from "../errors.js";

export function chatService(db: Db) {
  async function getOrCreateConversation(companyId: string, agentId: string, userId: string) {
    // Try to find existing conversation
    const existing = await db
      .select()
      .from(conversations)
      .where(
        and(
          eq(conversations.companyId, companyId),
          eq(conversations.agentId, agentId),
          eq(conversations.userId, userId),
        ),
      )
      .limit(1);

    if (existing.length > 0) return existing[0];

    // Create new conversation
    const [created] = await db
      .insert(conversations)
      .values({ companyId, agentId, userId })
      .returning();
    return created;
  }

  async function listConversations(companyId: string, userId: string) {
    const rows = await db
      .select({
        id: conversations.id,
        companyId: conversations.companyId,
        agentId: conversations.agentId,
        userId: conversations.userId,
        title: conversations.title,
        lastMessageAt: conversations.lastMessageAt,
        createdAt: conversations.createdAt,
        updatedAt: conversations.updatedAt,
        agentName: agents.name,
        agentIcon: agents.icon,
        agentStatus: agents.status,
      })
      .from(conversations)
      .innerJoin(agents, eq(conversations.agentId, agents.id))
      .where(
        and(
          eq(conversations.companyId, companyId),
          eq(conversations.userId, userId),
        ),
      )
      .orderBy(desc(conversations.lastMessageAt), desc(conversations.createdAt));

    // Fetch last message body for each conversation
    const result = [];
    for (const row of rows) {
      const lastMsg = await db
        .select({ body: chatMessages.body })
        .from(chatMessages)
        .where(eq(chatMessages.conversationId, row.id))
        .orderBy(desc(chatMessages.createdAt))
        .limit(1);

      result.push({
        ...row,
        lastMessageBody: lastMsg[0]?.body ?? null,
      });
    }

    return result;
  }

  async function getConversation(conversationId: string) {
    const rows = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, conversationId))
      .limit(1);
    return rows[0] ?? null;
  }

  async function listMessages(
    conversationId: string,
    opts?: { before?: string; limit?: number },
  ) {
    const limit = Math.min(opts?.limit ?? 50, 100);
    const conditions = [eq(chatMessages.conversationId, conversationId)];

    if (opts?.before) {
      // Cursor-based: get the createdAt of the cursor message
      const cursor = await db
        .select({ createdAt: chatMessages.createdAt })
        .from(chatMessages)
        .where(eq(chatMessages.id, opts.before))
        .limit(1);

      if (cursor[0]) {
        conditions.push(lt(chatMessages.createdAt, cursor[0].createdAt));
      }
    }

    const rows = await db
      .select()
      .from(chatMessages)
      .where(and(...conditions))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);

    // Return in chronological order
    return rows.reverse();
  }

  async function sendMessage(
    conversationId: string,
    input: {
      companyId: string;
      senderType: "user" | "agent";
      senderAgentId?: string | null;
      senderUserId?: string | null;
      body: string;
    },
  ) {
    const conversation = await getConversation(conversationId);
    if (!conversation) throw notFound("Conversation not found");

    const [message] = await db
      .insert(chatMessages)
      .values({
        companyId: input.companyId,
        conversationId,
        senderType: input.senderType,
        senderAgentId: input.senderAgentId ?? null,
        senderUserId: input.senderUserId ?? null,
        body: input.body,
      })
      .returning();

    // Update conversation lastMessageAt
    await db
      .update(conversations)
      .set({
        lastMessageAt: message.createdAt,
        updatedAt: new Date(),
      })
      .where(eq(conversations.id, conversationId));

    return message;
  }

  return {
    getOrCreateConversation,
    listConversations,
    getConversation,
    listMessages,
    sendMessage,
  };
}
