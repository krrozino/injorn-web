export type KnowledgeStatus = "official" | "discovered" | "observed" | "rumor";

export const statusLabels: Record<KnowledgeStatus, string> = {
  official: "Registro oficial",
  discovered: "Descoberto pelo grupo",
  observed: "Observado em sessão",
  rumor: "Rumor conhecido",
};

export const officialTimeline = [
  { year: "Ano 0", title: "Fundação de Injorn", text: "Charles von Helder I estabelece o reino nas Planícies Centrais e organiza o novo assentamento sob o princípio de ordem, proteção e trabalho." },
  { year: "Ano 32", title: "Primeira Resistência", text: "A versão oficial registra a derrota de aproximadamente 250 insurgentes e consolida a doutrina de que a benevolência de Injorn deve ser protegida pela lâmina de seus heróis." },
  { year: "Ano 33,5", title: "Constituição Perpétua", text: "O reino formaliza os pilares de Equidade Jurídica, Individualidade Sagrada, Justiça Distributiva e Seguridade Real." },
  { year: "Ano 40,2", title: "Partidos autorizados", text: "Unidade Central e Frente Libertária da Fronteira passam a representar correntes políticas permitidas, ambas submetidas à autoridade da Coroa." },
  { year: "Ano 50,1", title: "Destino Manifesto", text: "Começa uma fase de expansão territorial em direção às montanhas do sul e à floresta densa." },
  { year: "Ano 55,4", title: "Descoberta do Manadium", text: "Cristais de Manadium são encontrados no Vale do Oeste e tornam-se um dos motores da expansão econômica e arcana do reino." },
  { year: "Ano 76,2", title: "Ameaça Aérea", text: "Um incidente envolvendo uma entidade dracônica dá origem a uma nova doutrina de defesa e militarização." },
  { year: "Ano 78", title: "Zona de Exclusão Militar", text: "A capital passa a ser cercada por um vasto perímetro defensivo com torres, patrulhas e controle de trânsito." },
  { year: "Ano 80,5", title: "Segunda Emenda", text: "O Estado amplia o acesso de cidadãos elegíveis a armamentos de padrão militar." },
  { year: "Ano 100", title: "Sucessão da Coroa", text: "A morte oficial de Charles von Helder I é anunciada e Charles von Helder II assume o trono sem crise sucessória." },
  { year: "Ano 101,4", title: "Manufatura Arcana", text: "A produção mágica em escala acelera a urbanização e amplia a presença de bens arcanos na vida cotidiana." },
  { year: "Ano 136", title: "Neutralidade Armada", text: "Sob Charles II, Injorn sustenta uma política de neutralidade acompanhada por forte presença militar nas fronteiras e pela defesa da ordem interna." },
];

export const knownPlaces = [
  {
    name: "Capital Injorn",
    kind: "Capital do reino",
    status: "official" as KnowledgeStatus,
    summary: "Cidade murada de cerca de 22 mil habitantes, cortada por um grande rio e cercada por uma extensa Área Militarizada.",
    details: ["≈ 16 mil habitantes intramuros", "≈ 6 mil nos subúrbios e população flutuante", "Castelo Real e elite ao norte", "Zona militar no sudoeste"],
  },
  {
    name: "Ponta da Luz",
    kind: "Cidade do reino",
    status: "observed" as KnowledgeStatus,
    summary: "Local do primeiro grande surto conhecido da Praga. Prefeitura, hospital e Casa dos Fazendeiros tornaram-se pontos centrais dos acontecimentos do início da campanha.",
    details: ["Quarentena improvisada", "Mortos reanimados", "Medicamentos estabilizavam, mas não curavam", "Rastros do líquido negro foram encontrados"],
  },
  {
    name: "Monastério de São Kael",
    kind: "Montanhas orientais",
    status: "observed" as KnowledgeStatus,
    summary: "Antigo centro religioso cercado por frio intenso e tempestades. O grupo encontrou o complexo abandonado, profanado e ligado aos experimentos da Praga.",
    details: ["Aproximadamente 3 dias a cavalo da capital", "Biblioteca e criptas", "Símbolo do Eclipse encontrado no local", "Cavaleiro do Eclipse foi encontrado nos corredores"],
  },
  {
    name: "Vael Karun",
    kind: "Fortaleza nas montanhas do sul",
    status: "discovered" as KnowledgeStatus,
    summary: "Ruína dos Vapula que despertou com a chegada do grupo. A fortaleza reage especialmente à presença de Niccolò e possui estruturas muito mais profundas do que sua superfície sugere.",
    details: ["Também chamada Casa do Pacto", "Guardada por Kahra", "Dois grandes dragões observam as cristas", "O Nível -1 já foi acessado"],
  },
  {
    name: "Área Militarizada",
    kind: "Perímetro da capital",
    status: "official" as KnowledgeStatus,
    summary: "Faixa defensiva que se estende por aproximadamente 100 km a partir da capital em diversas direções, patrulhada e pontilhada por torres de vigia.",
    details: ["≈ 2 dias a cavalo até a borda", "Controle de rotas e checkpoints", "Viagens oficiais são consideradas seguras dentro do perímetro"],
  },
];

export const publicFigures = [
  {
    name: "Charles von Helder I",
    role: "Fundador de Injorn",
    status: "official" as KnowledgeStatus,
    titles: ["O Pai da Pátria", "O Primeiro Soberano", "O Domador da Luz"],
    summary: "A iconografia estatal o apresenta como o soberano que trouxe lei às Planícies Centrais e firmou o Pacto da Prosperidade com as Sete Luzes. Sua morte oficial ocorreu no Ano 100.",
  },
  {
    name: "Charles von Helder II",
    role: "Rei de Injorn",
    status: "official" as KnowledgeStatus,
    titles: ["O Sol de Injorn", "O Herdeiro do Milagre", "O Arquiteto da Paz"],
    summary: "A propaganda do Estado o retrata como jovem, régio e invulnerável, responsável pela Era de Ouro, pelas instituições modernas e pela política de Neutralidade Armada.",
  },
  {
    name: "Migarazur",
    role: "Prisma da Vontade Divina",
    status: "official" as KnowledgeStatus,
    titles: ["A unidade das Sete Luzes"],
    summary: "Na doutrina pública, Migarazur é a convergência das essências dos sete arcanjos: Miguel, Gabriel, Rafael, Uriel, Raguel, Zerachiel e Ramiel.",
  },
  {
    name: "Kahra",
    role: "Guardião de Vael Karun",
    status: "observed" as KnowledgeStatus,
    titles: ["Guardião das ruínas"],
    summary: "Draconato que permaneceu em Vael Karun durante décadas, conservando o que podia e observando o silêncio da fortaleza até a chegada do grupo.",
  },
  {
    name: "Elara",
    role: "Contato da resistência",
    status: "observed" as KnowledgeStatus,
    titles: ["Agente da Dissonância"],
    summary: "Acolheu e orientou o grupo dentro de Injorn durante a quarentena. Morreu durante o ataque que destruiu a antiga base da resistência.",
  },
  {
    name: "Lorde Valerius",
    role: "Inimigo conhecido",
    status: "discovered" as KnowledgeStatus,
    titles: ["Nome ligado à conspiração da Praga"],
    summary: "Documentos, mensagens e ações encontradas durante o Ato I ligam Valerius à disseminação deliberada da Praga e a operações contra Injorn.",
  },
  {
    name: "Gaspar",
    role: "Alquimista",
    status: "discovered" as KnowledgeStatus,
    titles: ["Responsável por pesquisas da Praga"],
    summary: "Inicialmente apareceu como possível aliado em Ponta da Luz. Evidências posteriores ligaram seus experimentos ao Protótipo Catalisador e aos agentes de Valerius.",
  },
  {
    name: "Inquisidora Vayne",
    role: "Inquisição de Injorn",
    status: "observed" as KnowledgeStatus,
    titles: ["Agente do Estado"],
    summary: "Foi a autoridade que enviou parte dos aventureiros para investigar o desaparecimento dos monges do Monastério de São Kael.",
  },
];

export const campaignChronicles = [
  {
    act: "Ato I",
    title: "A Praga e o Monastério",
    status: "observed" as KnowledgeStatus,
    text: "As primeiras missões levaram os aventureiros a Ponta da Luz e ao Monastério de São Kael. Sangue negro, mortos reanimados, o símbolo do Eclipse e mensagens de Lorde Valerius transformaram duas investigações isoladas em partes da mesma crise.",
  },
  {
    act: "Ato I",
    title: "A Rota do Traidor",
    status: "observed" as KnowledgeStatus,
    text: "A fuga do monastério revelou que o frio desacelerava a doença. Marcus foi perseguido, confessou transportar amostras e morreu após o ataque de uma criatura nascida da Praga. Uma carta encontrada com ele indicava a intenção de levar a epidemia até a capital.",
  },
  {
    act: "Ato I",
    title: "Injorn em Quarentena",
    status: "observed" as KnowledgeStatus,
    text: "O grupo retornou clandestinamente a uma capital sob vigilância, encontrou a resistência e passou a conhecer uma versão do reino incompatível com a doutrina oficial. Foi nesse período que a verdade sobre Migarazur foi apresentada aos aventureiros.",
  },
  {
    act: "Ato I",
    title: "A Casa de Banhos",
    status: "observed" as KnowledgeStatus,
    text: "Uma casa de banhos da Zona Leste funcionava como ponto de distribuição da contaminação. A investigação terminou em explosão, espalhando vapor infectado e deixando membros do grupo contaminados.",
  },
  {
    act: "Ato I",
    title: "O Peso do Sangue Doce",
    status: "observed" as KnowledgeStatus,
    text: "O grupo tentou conter a infecção enquanto a Zona Leste mergulhava em crise. A chamada Neve Negra marcou a exposição em massa da população e o início de uma resposta militar cada vez mais brutal.",
  },
  {
    act: "Ato I",
    title: "Cinzas e a Nobreza",
    status: "observed" as KnowledgeStatus,
    text: "A base de Elara foi atacada, a resistência foi dispersada e a cidade ficou dividida entre o Expurgo e a segurança da elite. A busca pelo Lote P-01 conduziu o grupo à Mansão Gothlieb e ao banquete do Cardeal.",
  },
  {
    act: "Ato I — encerramento",
    title: "A Valsa dos Abutres",
    status: "observed" as KnowledgeStatus,
    text: "Depois do banquete, o Estado associou os aventureiros ao ataque e à morte do Cardeal. Ryan ficou para trás e foi capturado. Sem base segura, o restante do grupo foi lançado para longe da capital por um teletransporte ligado a Niccolò.",
  },
  {
    act: "Ato II · Sessão 10",
    title: "Vael Karun — O Despertar das Pedras",
    status: "observed" as KnowledgeStatus,
    text: "O grupo chegou às Grandes Montanhas do Sul e encontrou Vael Karun, Kahra e duas presenças dracônicas nas cristas. A fortaleza, silenciosa havia décadas, começou a reagir à presença de Niccolò.",
  },
  {
    act: "Ato II · Sessão 11",
    title: "Vael Karun — O Guardião que Não Esqueceu",
    status: "observed" as KnowledgeStatus,
    text: "No Nível -1, o grupo enfrentou um Guardião de Pedra, que terminou parcialmente destruído e desativado. Duas Sombras da Incursão foram derrotadas. Memórias da fortaleza chamaram uma criança de ‘Mestre’, e uma presença ancestral começou a interferir — ainda sem se identificar.",
  },
];

export const archiveEntries = [
  {
    code: "ARQ-INJ-001",
    title: "Cronologia Oficial do Reino",
    status: "official" as KnowledgeStatus,
    summary: "Registro do Arquivo Real sobre a fundação, Constituição, expansão, militarização, sucessão da Coroa e Neutralidade Armada.",
  },
  {
    code: "ARQ-ECL-042",
    title: "São Kael — Catequese Cívica",
    status: "official" as KnowledgeStatus,
    summary: "A versão autorizada descreve Kael de Valoria como Auditor Espiritual e apresenta o monastério como instalação de preservação e resfriamento arcano. O Estado afirma que Kael permanece em ‘serviço perpétuo’.",
  },
  {
    code: "DOS-PRAGA-01",
    title: "Dossiê da Praga",
    status: "discovered" as KnowledgeStatus,
    summary: "O grupo observou febre, tosse, necrose, sangue negro de odor doce e reanimação após a morte. Calor acelera o avanço, o líquido negro transmite a contaminação e algumas criaturas infectadas explodem ou corroem equipamentos ao morrer.",
  },
  {
    code: "DISC-MIG-01",
    title: "A verdade conhecida sobre Migarazur",
    status: "discovered" as KnowledgeStatus,
    summary: "A Dissonância revelou ao grupo que a versão oficial da convergência voluntária é falsa: Migarazur funciona como receptáculo de sete arcanjos aprisionados, e a teurgia de Injorn extrai poder desse sofrimento.",
  },
  {
    code: "LOC-VK-01",
    title: "Vael Karun — estado conhecido",
    status: "observed" as KnowledgeStatus,
    summary: "A fortaleza Vapula é mais do que uma ruína. Ela possui níveis subterrâneos, sistemas ainda ativos, memórias que se manifestam e uma relação evidente com o sangue de Niccolò. Muito do lugar permanece desconhecido.",
  },
  {
    code: "FAC-VC-01",
    title: "Viva Cinis",
    status: "rumor" as KnowledgeStatus,
    summary: "Uma rede de oposição ao regime de Injorn. Entre o povo, seus membros também são chamados de A Brasa, Os Sem-Sol ou Filhos do Crepúsculo. Sua sobrevivência foi confirmada ao grupo em Vael Karun.",
  },
];

export const spoilerBoundary = {
  label: "Conhecimento liberado até a Sessão 11 do Ato II",
  note: "Planejamento de sessões futuras, segredos ainda não descobertos e páginas privadas do mestre não fazem parte deste conteúdo nem são enviados ao navegador.",
};
