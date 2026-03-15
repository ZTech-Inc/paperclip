import type { Conversation } from "@paperclipai/shared";
import { NavLink } from "@/lib/router";
import { cn } from "@/lib/utils";
import { relativeTime } from "@/lib/utils";
import { AgentIcon } from "./AgentIconPicker";

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
}

function truncateBody(body: string | null | undefined, max = 60): string {
  if (!body) return "";
  const oneLine = body.replace(/\n/g, " ").trim();
  if (oneLine.length <= max) return oneLine;
  return oneLine.slice(0, max - 1) + "\u2026";
}

export function ConversationList({ conversations, activeId }: ConversationListProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {conversations.map((conv) => (
        <NavLink
          key={conv.id}
          to={`/chat/${conv.id}`}
          className={cn(
            "flex items-start gap-2.5 px-3 py-2 text-sm transition-colors",
            activeId === conv.id
              ? "bg-accent text-foreground"
              : "text-foreground/80 hover:bg-accent/50 hover:text-foreground",
          )}
        >
          <AgentIcon
            icon={conv.agentIcon ?? null}
            className="shrink-0 h-4 w-4 text-muted-foreground mt-0.5"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-medium truncate text-[13px]">{conv.agentName ?? "Agent"}</span>
              {conv.agentStatus === "active" || conv.agentStatus === "running" ? (
                <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-green-500" />
              ) : null}
              {conv.lastMessageAt && (
                <span className="ml-auto text-[11px] text-muted-foreground shrink-0">
                  {relativeTime(conv.lastMessageAt)}
                </span>
              )}
            </div>
            {conv.lastMessageBody && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {truncateBody(conv.lastMessageBody)}
              </p>
            )}
          </div>
        </NavLink>
      ))}
    </div>
  );
}
