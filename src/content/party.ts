export interface PartyMember {
  name: string;
  descriptor: string;
  summary: string;
}

// This file deliberately contains only surface-level information suitable for
// every player. Private character secrets remain outside the public website.
export const currentParty: PartyMember[] = [
  {
    name: "Niccolò Vapula Gothlieb",
    descriptor: "Espadachim e violinista",
    summary:
      "Tiefling criado pela família Gothlieb, dividido entre aço e música. Sua chegada a Vael Karun revelou uma ligação direta entre seu sangue e a antiga fortaleza Vapula.",
  },
  {
    name: "Adas",
    descriptor: "Clérigo da Paz e marinheiro",
    summary:
      "Anão de temperamento sereno, antigo tripulante da Vento Bravio e mediador do grupo. Quando diplomacia não basta, sua fé e seu martelo assumem a conversa.",
  },
  {
    name: "Anahi",
    descriptor: "Aventureira do Ato II",
    summary:
      "Integrante registrada do grupo atual. Seu dossiê público permanece reduzido até que as informações pessoais que podem ser compartilhadas sejam separadas das anotações privadas de personagem.",
  },
  {
    name: "Tristan",
    descriptor: "Estudioso de magia rúnica",
    summary:
      "Pesquisador precoce fascinado por runas de gigantes e por maneiras de adaptar sua lógica à magia. Em Vael Karun, seu conhecimento tornou-se especialmente útil para interpretar estruturas antigas.",
  },
  {
    name: "M-N21",
    descriptor: "Warforged",
    summary:
      "Construto altamente tecnológico e mágico que passou a lutar contra Injorn após ser encontrado pela resistência. As ruínas Vapula levantaram novas perguntas sobre a origem da tecnologia que o compõe.",
  },
  {
    name: "Bleh",
    descriptor: "Ser alquímico",
    summary:
      "Forma de vida incomum associada aos experimentos de Gaspar, composta por matéria vegetal, resíduos biológicos e alquímicos. Demonstra capacidade singular de absorver e reter magia.",
  },
  {
    name: "Nyx",
    descriptor: "Estudiosa de memórias fragmentadas",
    summary:
      "Integrante da jornada ligada à resistência e à investigação de registros antigos. Seu passado permanece incompleto até para ela; o arquivo público não antecipa respostas que ainda não foram descobertas em mesa.",
  },
  {
    name: "Laerion",
    descriptor: "Aventureiro do Ato II",
    summary:
      "Integrante registrado do grupo atual. Ainda não há um dossiê público consolidado no arquivo de campanha.",
  },
];
