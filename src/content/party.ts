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
      "Tiefling criado pela família Gothlieb, dividido entre aço e música. Em Vael Karun, a fortaleza reagiu à sua presença e tornou seu vínculo com o nome Vapula impossível de ignorar.",
  },
  {
    name: "Adas",
    descriptor: "Clérigo da Paz e marinheiro",
    summary:
      "Anão de temperamento sereno, marinheiro experiente e mediador do grupo. Quando diplomacia não basta, sua fé e seu martelo assumem a conversa.",
  },
  {
    name: "Anahi",
    descriptor: "Aventureira do Ato II",
    summary:
      "Integrante registrada do grupo atual. Seu dossiê público permanece reduzido até que informações pessoais possam ser separadas com segurança das anotações privadas de personagem.",
  },
  {
    name: "Tristan",
    descriptor: "Estudioso de magia rúnica",
    summary:
      "Pesquisador fascinado por runas e por maneiras de adaptar sua lógica à magia. Em Vael Karun, seu conhecimento tornou-se especialmente útil para interpretar estruturas antigas.",
  },
  {
    name: "M-N21",
    descriptor: "Warforged",
    summary:
      "Construto altamente tecnológico e mágico que viaja com o grupo. Parte de sua origem ainda permanece incerta, e Vael Karun levantou novas perguntas em vez de respostas definitivas.",
  },
  {
    name: "Bleh",
    descriptor: "Ser alquímico",
    summary:
      "Forma de vida alquímica incomum, com traços vegetais e capacidade singular de absorver e reter magia. Sua origem completa não é antecipada pelo arquivo público.",
  },
  {
    name: "Nyx",
    descriptor: "Estudiosa de memórias fragmentadas",
    summary:
      "Aventureira ligada à investigação de registros antigos. Seu passado permanece incompleto até para ela, e o arquivo não antecipa respostas que ainda não foram descobertas em mesa.",
  },
  {
    name: "Laerion",
    descriptor: "Aventureiro do Ato II",
    summary:
      "Integrante registrado do grupo atual. Ainda não há um dossiê público consolidado no arquivo de campanha.",
  },
];
