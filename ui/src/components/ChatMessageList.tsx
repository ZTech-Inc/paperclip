import { useEffect, useRef } from "react";
import type { ChatMessage, Agent } from "@paperclipai/shared";
import { cn, formatDateTime } from "@/lib/utils";
import { MarkdownBody } from "./MarkdownBody";
import { AgentIcon } from "./AgentIconPicker";

interface ChatMessageListProps {
  messages: ChatMessage[];
  agentMap?: Map<string, Agent>;
}

export function ChatMessageList({ messages, agentMap }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
        No messages yet. Send a message to start the conversation.
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
      {messages.map((msg) => {
        const isUser = msg.senderType === "user";
        const agent = msg.senderAgentId ? agentMap?.get(msg.senderAgentId) : null;

        return (
          <div
            key={msg.id}
            className={cn("flex gap-2.5 max-w-[85%]", isUser ? "ml-auto flex-row-reverse" : "")}
          >
            {!isUser && (
              <div className="shrink-0 mt-1">
                <AgentIcon
                  icon={agent?.icon ?? null}
                  className="h-5 w-5 text-muted-foreground"
                />
              </div>
            )}
            <div
              className={cn(
                "rounded-lg px-3 py-2 text-sm",
                isUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted",
              )}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                <MarkdownBody>{msg.body}</MarkdownBody>
              </div>
              <div
                className={cn(
                  "text-[10px] mt-1",
                  isUser ? "text-primary-foreground/60" : "text-muted-foreground",
                )}
              >
                {formatDateTime(msg.createdAt)}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
