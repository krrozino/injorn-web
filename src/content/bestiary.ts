import type { KnowledgeStatus } from "@/content/playerKnowledge";

export interface BestiaryRecord {
  name: string;
  category: string;
  status: KnowledgeStatus;
  firstSeen: string;
  summary: string;
  knownTraits: string[];
}

export const bestiary: BestiaryRecord[] = [
  {
    name: "Infectados da Praga",
    category: "Contaminados",
    status: "observed",
    firstSeen: "Ponta da Luz",
    summary:
      "Mortos e doentes transformados pela Praga. A deterioração física é acompanhada por agressividade, sangue negro e, em muitos casos, reanimação depois da morte clínica.",
    knownTraits: [
      "O contato com sangue negro pode transmitir a contaminação.",
      "Alguns infectados explodem ao morrer.",
      "O material expelido por certas variantes corrói equipamentos comuns.",
      "O calor acelera o avanço da condição; o frio demonstrou retardá-la.",
    ],
  },
  {
    name: "Cavaleiro do Eclipse",
    category: "Armadura animada",
    status: "observed",
    firstSeen: "Monastério de São Kael",
    summary:
      "Uma armadura escura encontrada nos corredores e catacumbas de São Kael, envolvida por uma névoa violácea e hostil a intrusos.",
    knownTraits: [
      "A presença não parecia depender de um corpo humano visível dentro da armadura.",
      "Estava associada ao símbolo e à atmosfera de Eclipse encontrados no monastério.",
      "Sua origem exata continua fora do conhecimento confirmado do grupo.",
    ],
  },
  {
    name: "Guardião de Pedra",
    category: "Construto Vapula",
    status: "observed",
    firstSeen: "Vael Karun · Nível -1",
    summary:
      "Construto colossal que protege a Câmara do Portal de Vael Karun. Reconheceu o sangue de Niccolò, mas não aceitou automaticamente as intenções de seus companheiros.",
    knownTraits: [
      "Seu comportamento era de contenção e proteção, não de caça.",
      "Respondia a protocolos, símbolos e ao legado Vapula.",
      "Após o confronto, permaneceu parcialmente destruído e desativado.",
    ],
  },
  {
    name: "Sombras de Vael Karun",
    category: "Manifestação hostil",
    status: "observed",
    firstSeen: "Vael Karun · Nível -1",
    summary:
      "Duas presenças sombrias encontradas durante a exploração dos aposentos subterrâneos. Foram derrotadas pelo grupo antes do avanço mais profundo pela fortaleza.",
    knownTraits: [
      "A natureza exata dessas manifestações ainda não foi estabelecida.",
      "Elas fazem parte dos sinais de que o subsolo de Vael Karun não está realmente adormecido.",
    ],
  },
  {
    name: "Dragões das Cristas",
    category: "Dragões",
    status: "observed",
    firstSeen: "Grandes Montanhas do Sul",
    summary:
      "Duas grandes presenças dracônicas foram observadas nas cristas ao redor de Vael Karun. Elas acompanham o movimento na fortaleza sem terem se apresentado como inimigos imediatos.",
    knownTraits: [
      "Mantêm relação antiga com a região de Vael Karun.",
      "O grupo ainda não possui um dossiê completo sobre suas intenções ou história.",
    ],
  },
];
