import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";
import { companies } from "./companies.js";
import { conversations } from "./conversations.js";
import { agents } from "./agents.js";

export const chatMessages = pgTable(
  "chat_messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    companyId: uuid("company_id").notNull().references(() => companies.id),
    conversationId: uuid("conversation_id").notNull().references(() => conversations.id),
    senderType: text("sender_type").notNull(), // "user" | "agent"
    senderAgentId: uuid("sender_agent_id").references(() => agents.id),
    senderUserId: text("sender_user_id"),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    conversationCreatedAtIdx: index("chat_messages_conversation_created_at_idx").on(
      table.conversationId,
      table.createdAt,
    ),
  }),
);
