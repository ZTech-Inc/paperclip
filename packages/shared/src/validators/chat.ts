import { z } from "zod";

export const createConversationSchema = z.object({
  agentId: z.string().uuid(),
  message: z.string().min(1).optional(),
});
export type CreateConversation = z.infer<typeof createConversationSchema>;

export const sendChatMessageSchema = z.object({
  body: z.string().min(1),
});
export type SendChatMessage = z.infer<typeof sendChatMessageSchema>;
