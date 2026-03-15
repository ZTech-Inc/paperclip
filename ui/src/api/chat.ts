import type { Conversation, ChatMessage } from "@paperclipai/shared";
import { api } from "./client";

export const chatApi = {
  listConversations: (companyId: string) =>
    api.get<Conversation[]>(`/companies/${companyId}/conversations`),

  createConversation: (companyId: string, data: { agentId: string; message?: string }) =>
    api.post<{ conversation: Conversation; message: ChatMessage | null }>(
      `/companies/${companyId}/conversations`,
      data,
    ),

  listMessages: (conversationId: string, params?: { before?: string; limit?: number }) => {
    const qs = new URLSearchParams();
    if (params?.before) qs.set("before", params.before);
    if (params?.limit) qs.set("limit", String(params.limit));
    const suffix = qs.toString() ? `?${qs}` : "";
    return api.get<ChatMessage[]>(`/conversations/${conversationId}/messages${suffix}`);
  },

  sendMessage: (conversationId: string, body: string) =>
    api.post<ChatMessage>(`/conversations/${conversationId}/messages`, { body }),
};
