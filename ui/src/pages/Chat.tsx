import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Plus } from "lucide-react";
import type { Agent } from "@paperclipai/shared";
import { useNavigate } from "@/lib/router";
import { useCompany } from "@/context/CompanyContext";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";
import { chatApi } from "@/api/chat";
import { agentsApi } from "@/api/agents";
import { queryKeys } from "@/lib/queryKeys";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConversationList } from "@/components/ConversationList";
import { ChatMessageList } from "@/components/ChatMessageList";
import { ChatInput } from "@/components/ChatInput";
import { EmptyState } from "@/components/EmptyState";
import { AgentIcon } from "@/components/AgentIconPicker";

export function Chat() {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const { selectedCompanyId } = useCompany();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([{ label: "Chat" }]);
  }, [setBreadcrumbs]);

  const { data: conversations = [] } = useQuery({
    queryKey: queryKeys.chat.list(selectedCompanyId!),
    queryFn: () => chatApi.listConversations(selectedCompanyId!),
    enabled: !!selectedCompanyId,
  });

  const { data: messages = [] } = useQuery({
    queryKey: queryKeys.chat.messages(conversationId!),
    queryFn: () => chatApi.listMessages(conversationId!),
    enabled: !!conversationId,
    refetchInterval: 5000,
  });

  const { data: agents = [] } = useQuery({
    queryKey: queryKeys.agents.list(selectedCompanyId!),
    queryFn: () => agentsApi.list(selectedCompanyId!),
    enabled: !!selectedCompanyId,
  });

  const agentMap = useMemo(() => {
    const map = new Map<string, Agent>();
    for (const agent of agents) map.set(agent.id, agent);
    return map;
  }, [agents]);

  const activeConversation = conversations.find((c) => c.id === conversationId);
  const activeAgent = activeConversation ? agentMap.get(activeConversation.agentId) : null;

  // Agents that don't already have a conversation
  const existingAgentIds = useMemo(
    () => new Set(conversations.map((c) => c.agentId)),
    [conversations],
  );
  const availableAgents = useMemo(
    () => agents.filter((a) => a.status !== "terminated" && !existingAgentIds.has(a.id)),
    [agents, existingAgentIds],
  );

  const createConversation = useMutation({
    mutationFn: (agentId: string) =>
      chatApi.createConversation(selectedCompanyId!, { agentId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.list(selectedCompanyId!) });
      navigate(`/chat/${data.conversation.id}`);
    },
  });

  const sendMessage = useMutation({
    mutationFn: (body: string) => chatApi.sendMessage(conversationId!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.messages(conversationId!) });
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.list(selectedCompanyId!) });
    },
  });

  const handleSend = useCallback(
    async (body: string) => {
      await sendMessage.mutateAsync(body);
    },
    [sendMessage],
  );

  return (
    <div className="flex h-full">
      {/* Conversation list sidebar */}
      <div className="w-64 border-r border-border flex flex-col shrink-0">
        <div className="flex items-center justify-between px-3 py-3 border-b border-border">
          <h2 className="text-sm font-semibold">Chats</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" disabled={availableAgents.length === 0}>
                <Plus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableAgents.map((agent) => (
                <DropdownMenuItem
                  key={agent.id}
                  onClick={() => createConversation.mutate(agent.id)}
                >
                  <AgentIcon icon={agent.icon} className="h-4 w-4 mr-2 text-muted-foreground" />
                  {agent.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="text-xs text-muted-foreground px-3 py-4 text-center">
              No conversations yet
            </p>
          ) : (
            <ConversationList conversations={conversations} activeId={conversationId} />
          )}
        </div>
      </div>

      {/* Active conversation */}
      <div className="flex-1 flex flex-col min-w-0">
        {conversationId && activeConversation ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
              <AgentIcon
                icon={activeAgent?.icon ?? null}
                className="h-5 w-5 text-muted-foreground"
              />
              <div>
                <span className="text-sm font-semibold">
                  {activeAgent?.name ?? activeConversation.agentName ?? "Agent"}
                </span>
                {activeAgent?.title && (
                  <span className="text-xs text-muted-foreground ml-2">{activeAgent.title}</span>
                )}
              </div>
            </div>

            {/* Messages */}
            <ChatMessageList messages={messages} agentMap={agentMap} />

            {/* Input */}
            <ChatInput
              onSend={handleSend}
              placeholder={`Message ${activeAgent?.name ?? "agent"}...`}
            />
          </>
        ) : (
          <EmptyState
            icon={MessageSquare}
            message="Select a conversation or start a new chat with an agent"
            action={availableAgents.length > 0 ? "New Chat" : undefined}
            onAction={
              availableAgents.length > 0
                ? () => createConversation.mutate(availableAgents[0].id)
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}
