import type { KnowledgeStatus } from "@/content/playerKnowledge";

export interface FactionRecord {
  name: string;
  kind: string;
  status: KnowledgeStatus;
  aliases?: string[];
  summary: string;
  playerNote: string;
}

export const factions: FactionRecord[] = [
  {
    name: "A Coroa Solar",
    kind: "Poder central",
    status: "official",
    summary:
      "A monarquia de Injorn, atualmente personificada por Charles von Helder II. A versão pública apresenta a Coroa como garantia de estabilidade, prosperidade, defesa e continuidade do reino.",
    playerNote:
      "Os aventureiros já viram que a imagem protetora do Estado convive com vigilância, quarentenas, expurgos e forte controle militar.",
  },
  {
    name: "Igreja de Migarazur",
    kind: "Instituição religiosa",
    status: "official",
    summary:
      "A fé institucional ligada a Migarazur e às Sete Luzes. Sua doutrina pública ensina que os sete arcanjos convergiram voluntariamente para formar uma única manifestação divina em defesa de Injorn.",
    playerNote:
      "O grupo já recebeu evidências de que essa doutrina oficial não corresponde à natureza real de Migarazur.",
  },
  {
    name: "Guarda do Silêncio",
    kind: "Força do Estado",
    status: "observed",
    aliases: ["Protetores Mudos"],
    summary:
      "Agentes associados à segurança interna e à proteção da ordem. A propaganda os apresenta como guardiões disciplinados do reino.",
    playerNote:
      "O grupo encontrou membros da Guarda em operações de controle, transporte e repressão durante a crise da Praga.",
  },
  {
    name: "Inquisição do Silêncio",
    kind: "Autoridade inquisitorial",
    status: "observed",
    summary:
      "Braço de investigação e autoridade ligado ao aparato de Injorn. A Inquisidora Vayne foi a responsável por enviar aventureiros para investigar o desaparecimento dos monges de São Kael.",
    playerNote:
      "Sua estrutura completa e seus limites de autoridade ainda não são conhecidos pelo grupo.",
  },
  {
    name: "Viva Cinis",
    kind: "Resistência",
    status: "discovered",
    aliases: ["A Cinza Viva", "A Brasa", "Os Sem-Sol", "Os Filhos do Crepúsculo"],
    summary:
      "Rede dissidente que busca substituir o regime de Injorn e combater perseguição, escravização, privação e outras formas de opressão atribuídas à ordem vigente.",
    playerNote:
      "Após a queda da antiga base de Elara, o grupo recebeu confirmação de que Viva Cinis ainda possuía remanescentes ativos.",
  },
  {
    name: "A Dissonância",
    kind: "Rede de oposição",
    status: "observed",
    summary:
      "Nome associado à rede que acolheu o grupo durante o retorno clandestino à capital e apresentou uma leitura radicalmente diferente da religião e do Estado de Injorn.",
    playerNote:
      "Foi por meio de Elara e de seus contatos que os aventureiros conheceram a revelação sobre Migarazur.",
  },
];
