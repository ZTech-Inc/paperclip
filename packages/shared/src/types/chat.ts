export interface Conversation {
  id: string;
  companyId: string;
  agentId: string;
  userId: string;
  title: string | null;
  lastMessageAt: string | null;
  createdAt: string;
  updatedAt: string;
  /** Joined from agent table for display. */
  agentName?: string;
  agentIcon?: string | null;
  agentStatus?: string;
  /** Preview of the last message body. */
  lastMessageBody?: string | null;
}

export interface ChatMessage {
  id: string;
  companyId: string;
  conversationId: string;
  senderType: "user" | "agent";
  senderAgentId: string | null;
  senderUserId: string | null;
  body: string;
  createdAt: string;
}
