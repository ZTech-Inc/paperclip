import { Router } from "express";
import type { Db } from "@paperclipai/db";
import { createConversationSchema, sendChatMessageSchema } from "@paperclipai/shared";
import { validate } from "../middleware/validate.js";
import { chatService, publishLiveEvent } from "../services/index.js";
import { forbidden, notFound, unauthorized } from "../errors.js";
import { assertCompanyAccess, getActorInfo } from "./authz.js";

export function chatRoutes(db: Db) {
  const router = Router();
  const svc = chatService(db);

  // List conversations for the current user
  router.get("/companies/:companyId/conversations", async (req, res) => {
    const { companyId } = req.params;
    assertCompanyAccess(req, companyId);
    const actor = getActorInfo(req);
    if (actor.actorType !== "user") throw forbidden("Board access required");

    const conversations = await svc.listConversations(companyId, actor.actorId);
    res.json(conversations);
  });

  // Create or get a conversation with an agent
  router.post(
    "/companies/:companyId/conversations",
    validate(createConversationSchema),
    async (req, res) => {
      const { companyId } = req.params;
      assertCompanyAccess(req, companyId);
      const actor = getActorInfo(req);
      if (actor.actorType !== "user") throw forbidden("Board access required");

      const { agentId, message } = req.body as { agentId: string; message?: string };
      const conversation = await svc.getOrCreateConversation(companyId, agentId, actor.actorId);

      let firstMessage = null;
      if (message) {
        firstMessage = await svc.sendMessage(conversation.id, {
          companyId,
          senderType: "user",
          senderUserId: actor.actorId,
          body: message,
        });

        publishLiveEvent({
          companyId,
          type: "chat.message",
          payload: {
            conversationId: conversation.id,
            messageId: firstMessage.id,
            senderType: "user",
            senderUserId: actor.actorId,
          },
        });
      }

      res.json({ conversation, message: firstMessage });
    },
  );

  // List messages in a conversation
  router.get("/conversations/:conversationId/messages", async (req, res) => {
    const { conversationId } = req.params;
    const conversation = await svc.getConversation(conversationId);
    if (!conversation) throw notFound("Conversation not found");
    assertCompanyAccess(req, conversation.companyId);

    const before = req.query.before as string | undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

    const messages = await svc.listMessages(conversationId, { before, limit });
    res.json(messages);
  });

  // Send a message in a conversation
  router.post(
    "/conversations/:conversationId/messages",
    validate(sendChatMessageSchema),
    async (req, res) => {
      const { conversationId } = req.params;
      const conversation = await svc.getConversation(conversationId);
      if (!conversation) throw notFound("Conversation not found");
      assertCompanyAccess(req, conversation.companyId);

      const actor = getActorInfo(req);
      const { body } = req.body as { body: string };

      const senderType = actor.actorType === "agent" ? "agent" : "user";
      const message = await svc.sendMessage(conversationId, {
        companyId: conversation.companyId,
        senderType,
        senderAgentId: actor.actorType === "agent" ? actor.actorId : null,
        senderUserId: actor.actorType === "user" ? actor.actorId : null,
        body,
      });

      publishLiveEvent({
        companyId: conversation.companyId,
        type: "chat.message",
        payload: {
          conversationId,
          messageId: message.id,
          senderType,
          senderAgentId: message.senderAgentId,
          senderUserId: message.senderUserId,
          body: message.body,
        },
      });

      res.json(message);
    },
  );

  return router;
}
