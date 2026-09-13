import { statusLabels, type KnowledgeStatus as KnowledgeStatusType } from "@/content/playerKnowledge";

interface KnowledgeStatusProps {
  status: KnowledgeStatusType;
}

export function KnowledgeStatus({ status }: KnowledgeStatusProps) {
  return <span className={`knowledge-status knowledge-status--${status}`}>{statusLabels[status]}</span>;
}
