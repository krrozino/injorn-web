# Atlas Vivo de Injorn — Especificação base v1

Estado: decisões de produto aprovadas em 20/10/2026; implementação ainda não iniciada. Este documento é de arquitetura e não contém informações privadas de lore.

## 1. Visão
Transformar Injorn num **worldbuilder/atlas público navegável**, em que o leitor pode explorar a história inteira do universo que o mestre autorizou publicar e, separadamente, acompanhar a jornada real do grupo principal. A experiência deve se assemelhar a um atlas histórico de fantasia com uma camada de viagem narrativa — não somente um diário das sessões ou uma wiki estática.

Duas linhas independentes e relacionáveis:
1. **História de Injorn** — eras, anos, acontecimentos, lugares, figuras, facções, artefatos, religiões, criaturas, culturas, documentos e interpretações oficiais/contestadas.
2. **Jornada dos aventureiros** — atos, sessões jogadas, deslocamentos, paradas, ações e descobertas que realmente ocorreram; cada evento se relaciona aos registros do mundo.

O Notion continua sendo a **Bíblia Viva**, a fonte principal de escrita/cânone. Google Drive guarda mídias de origem. O site é a experiência de consulta e o Studio é um editor cartográfico/editorial complementar, não um novo Notion.

## 2. Decisões do proprietário
- Mapa geográfico enviado do **Reino de Injorn** é canônico; mudanças cartográficas devem ser versionadas. Imagem original conhecida: 1448 x 1086 pixels. O usuário pode fornecer versão **sem rótulos**, mas não de resolução maior; iniciar com original se necessário.
- Mapa exibido representa somente o reino; arquitetura aceita mapas filhos (cidade, castelo, estrutura, região).
- **Ponta da Luz faz parte do mapa** segundo o mestre; localizar sua âncora corretamente na revisão cartográfica, sem concluir que está ausente ou inventar coordenadas.
- Público: jogadores atuais **e** leitores de fora, com experiência de descoberta para os dois.
- Campanha: todas as **sessões efetivamente jogadas** são candidatas à publicação; apenas fatos ocorridos entram no cânone da jornada. Planos de sessão não equivalem a acontecimentos.
- História geral do universo não se limita àquilo que o grupo presenciou. A enciclopédia deve contemplar todo o conteúdo aprovado pelo mestre.
- Foco cartográfico principal: trajetória do grupo, mas mostrar outros locais, eventos e rotas do universo como camadas independentes.
- Suportar mapas de detalhe vinculados a mapas superiores.
- Studio: editor inicialmente exclusivo do proprietário; desenho visual de marcadores, polígonos e linhas, sem digitação obrigatória de coordenadas.
- Sincronização Notion/Drive: detectar mudanças e preparar revisão, **publicar somente com aprovação**.
- **Meta operacional: R$ 0/mês**. Firebase é o backend escolhido. Pode-se evoluir do Spark para o Blaze com aprovação explícita do proprietário, desde que exista avaliação de risco/cotas; o Blaze é pagamento por uso, não tem garantia técnica de custo zero. Não ativar faturamento, domínio pago ou outros gastos sem nova autorização explícita.

## 3. Navegação proposta
- **Atlas**: mapa ilustrado, zoom/pan, lugares, regiões, camadas, busca, painel com ligações.
- **História**: cronologia universal, períodos, versões históricas e acontecimentos.
- **Jornada**: progressão por ato e sessão, rota da expedição sobre o mapa, fichas de paradas e eventos ocorridos.
- **Códice**: personagens, NPCs, facções, culturas, religiões, criaturas, objetos, organizações, etc.
- **Arquivo**: livros, cartas, manuscritos e registros, com procedência e contexto.
- **Ecos**: música e áudio conectados a lugares/figuras/sessões.
- **Studio privado**: curadoria, associação de fontes e mídias, ferramentas cartográficas, revisão/publicação.

A identidade já produzida em Injorn Web (ouro envelhecido, verde profundo, sete portas, rituais e efeitos relevantes) permanece. Navegação precisa ser responsiva, por teclado, legível sem animação e compatível com prefers-reduced-motion.

## 4. Modelo de dados conceitual
As entidades têm ID estável, nome/título, resumo, links, fontes/proveniência e estado de publicação.
- `WorldMap`: mapa, imagem, largura/altura originais, versão, sistema local de coordenadas, parent_map_id.
- `GeoFeature`: marcador/polígono/linha ancorado a um mapa, tipo, geometria e feature_id. Geometria normalizada x/y entre 0 e 1; não são latitude/longitude reais.
- `Place` / `Region`: nome, tipo, descrição, recursos, relações, geo_feature_id opcional.
- `WorldEvent`: período/ano da cronologia global, texto público, fontes, local, participantes e natureza da afirmação.
- `Act`, `PlayedSession`, `Journey`, `JourneyStop`, `JourneySegment`: sessões realmente jogadas e sequência espacial/temporal. Segmento pode ser exato, aproximado com aviso ou desconhecido; não fabricar trilhas.
- `Character`, `Faction`, `Artifact`, `Creature`, `Culture`, `Religion`, `Document` e tipos expansíveis.
- `MediaAsset`: imagem, áudio ou documento, vínculo ao Drive/origem em armazenamento privado; só a mídia aprovada gera cópia/publicação apropriada.
- `Relation`: conexão tipada entre entidades (visitou, apareceu em, pertence a, ocorreu em, etc.).
- `SourceRef` / `SyncRevision`: referências privadas ao Notion/Drive, versões, data de leitura, hashes e divergências.
- `Publication`: estado draft/review/approved/published/withdrawn, aprovação, versão pública.
- `KnowledgeProvenance`: oficial, observado, descoberto, rumor; estas categorias **não** substituem a permissão de publicação.

Separação operacional: conteúdo privado (inclusive URLs de páginas, links temporários, segredos e texto futuro) nunca é armazenado em bundles estáticos, JSON público, rotas de cliente ou repositório público. Não basta ocultar por CSS.

## 5. Geografia
- Leaflet + CRS.Simple + ImageOverlay para mapas não geográficos; sem Google Maps real.
- Coordenadas normalizadas relativas à imagem permitem ajuste de resolução sem reancorar pontos.
- Camadas separadas e ativáveis: locais, regiões, fronteiras, estradas conhecidas, história, facções, marcos, percurso do grupo e época/sessão.
- Rotas de campanha são **geometrias autoradas** e associadas à sessão realmente jogada. Os tempos/distâncias conhecidos na Bíblia Viva são metadados, não justificativa para calcular caminhos fictícios.
- Clique em um marco abre painel com texto, imagens, som, eventos, personagens e sessões publicados.
- Mapas filhos em níveis: reino -> cidade/região -> prédio/castelo, publicados individualmente.
- Evitar esconder informação em camadas desligadas: dados ainda secretos não devem ser enviados ao cliente.
- Se mapa com rótulos fixos for usado inicialmente, não duplicar rótulos visualmente; versão sem rótulos será adotada quando disponibilizada.

## 6. Cronologia vs jornada — regra central
**História universal** pode conter fatos de qualquer época previamente aprovados, ainda que não relacionados ao grupo. **Jornada** contém apenas acontecimentos realmente jogados. Um evento pode pertencer a ambas as interfaces por relacionamento, sem duplicar o texto-fonte. O filtro por sessão afeta somente a progressão da jornada e qualquer conteúdo explicitamente configurado para desbloqueio narrativo, não apaga a história geral do mundo.

Reproduzir jornada como trilha da Sociedade do Anel: pontos, caminhos, eventos e mudanças ao longo do tempo; não transformar o mundo inteiro num apêndice da campanha.

## 7. Cânone e publicação
- O Notion pode conter rascunhos, planos, interpretações oficiais e notas reais de mesa.
- Só registros de **acontecimentos jogados e confirmados** alimentam o cânone da campanha.
- Para cada atualização: detectar mudança -> importar para área privada -> classificar origem e conflitos -> relacionar ao modelo -> preparar versão pública -> validar spoilers e mídias -> aprovação manual -> publicar snapshot.
- Fonte pública de lore histórico pode ser apresentado como declaração da Coroa ou interpretação quando for o caso, nunca confundir propaganda interna com verdade objetiva.
- Não publicar todos os conteúdos do Notion automaticamente: a Bíblia Viva é a referência total, não um feed público integral.
- Se uma sessão estiver jogada mas ainda não revisada editorialmente, manter a versão anterior pública até aprovação. A antiga barreira fixa da sessão 11 deverá ser substituída por um limite de publicação versionado e explícito.
- Jamais promover rascunhos ou páginas futuras do Notion ao site só pelo título ou por número.
- A publicação inclui possibilidade de revisão, rollback, logs de versão e remoção.

## 8. Integração Notion / Drive
- Notion: texto canônico, proveniência, títulos e referências; sincronização autenticada **no servidor**, incremental e com cache para evitar chamadas por cada visitante.
- Drive: catálogo de mídia privada; o mestre aprova explicitamente licenças, imagem final, legenda e direitos de exposição. Nada de hospedar mídias públicas através de URLs privadas/temporárias do Drive.
- Ciclo sugerido: verificação programada de alterações, fila de revisão e publicação após comando do proprietário; em caso de conflito, nunca sobrescrever silenciosamente.
- Não duplicar um editor completo de textos no Studio inicialmente: manter edição textual no Notion e edição espacial/associações no Studio.

## 9. Arquitetura Firebase com meta de custo zero
- **Backend decidido**: Firebase Authentication para o proprietário do Studio; Cloud Firestore para coordenadas, camadas, rotas, relacionamentos, estados de revisão e versões de publicação. Sem Supabase para Injorn.
- **Hospedagem inicial**: site Next.js existente na Vercel Hobby, para uso pessoal não comercial, preservando integrações que precisam de servidor. Firebase Hosting estático pode ser avaliado posteriormente, se a exportação estática for compatível; Firebase App Hosting não é requisito.
- **Mapa**: Leaflet (open source) com imagem autoral. Sem API paga de mapa.
- **Conteúdo público**: gerar snapshot previamente aprovado para hospedar em CDN/static build; o visitante não acessa Firestore privado, Notion ou Drive diretamente a cada visita.
- **Mídias**: Google Drive permanece acervo mestre. Em Blaze, Cloud Storage for Firebase pode receber **somente cópias aprovadas para publicação**, preferencialmente em bucket/região elegível ao nível Always Free (validar região, cota e preço antes de criar). Não usar URLs temporárias de itens privados do Drive em páginas públicas.
- **Sincronização**: serviços autenticados no servidor, processando mudanças do Notion/Drive de maneira incremental, com fila de revisão. Cloud Functions pode ser avaliado no Blaze, mas não é obrigatório: builds/deploys de funções podem ter cobranças de armazenamento de contêiner e consumo de serviços complementares mesmo quando invocações estão dentro da cota.
- **Plano**: iniciar Spark se os recursos do MVP couberem nele; permitir futura migração ao **Blaze por decisão explícita**. Blaze é faturado por uso acima das cotas; vincular faturamento não representa promessa de fatura R$ 0.
- **Controles obrigatórios antes de ativar Blaze**: orçamento e alertas no Cloud Billing (limiares baixos); acompanhar uso por serviço; restringir permissões administrativas; consultas paginadas com limites; cache e snapshots; limites de escala/concurrency/quotas onde disponíveis; testes com Firebase Emulator; revisão dos custos da região de Storage e deploy de Functions; política de desativação/redução de uso e de rollback.
- **Alertas não são limites rígidos**: orçamento de alerta não pausa serviços. Spend caps existem apenas para determinados produtos e podem ter atraso, por isso não garantem cobrança zero — Firestore e Storage não recebem o mesmo mecanismo universal de bloqueio. Evitar automações que possam disparar leituras/gravações ilimitadas.
- **Cotas e custo**: manter consumo normalmente bem abaixo dos limites gratuitos e usar o menor número de serviços possível. Se os limites forem ameaçados, reduzir/pausar **novas operações opcionais**; mesmo assim a arquitetura no Blaze possui risco residual de cobrança.
- **Governança**: ninguém deve habilitar Blaze, vincular cartão/billing, contratar recursos pagos ou alterar projetos sem aprovação explícita adicional. Toda decisão sobre ativação deve documentar região, cota gratuita, custo excedente, monitoramento e contingência.
- **Fonte de orientação a rever no dia do provisionamento**: https://firebase.google.com/docs/projects/billing/firebase-pricing-plans ; https://firebase.google.com/docs/projects/billing/budget-alerts ; https://firebase.google.com/docs/projects/billing/spend-caps ; https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024 ; https://firebase.google.com/docs/functions/quotas .

## 10. Entregas incrementalmente verificáveis
1. **M0: base cartográfica** — incorporar imagem original aprovada; zoom/pan, responsividade, coordenadas normalizadas, camadas e legenda. Mapas sem rótulos quando enviados.
2. **M1: georreferência manual** — locais do mapa identificados e revisados, sem coordenadas inventadas, popovers e navegação cruzada; confirmar âncora de Ponta da Luz.
3. **M2: história universal** — cronologia global e Códice, entidades relacionadas, busca e versões narrativas.
4. **M3: jornada** — sessões jogadas e revisadas, paradas ordenadas, trilha desenhada somente em trechos conhecidos; filtro ato/sessão.
5. **M4: importação Notion/Drive** — leitura privada, auditoria, revisão de conflito e geração de snapshot público.
6. **M5: Studio privado** — autenticação do proprietário, editor de mapa/polígonos/trilhas, mídias, prévia e publicação manual.
7. **M6: mapas filhos** — navegação entre reino, cidade e interior quando houver arte e conteúdo aprovados.

Critérios iniciais: nenhum conteúdo inventado; nenhuma publicação acidental; navegação desktop/mobile/teclado; build e lint passam; site público continua estático/barato; toda nova funcionalidade revisada em PR antes de ir à main.

## 11. Itens pendentes que não bloqueiam M0
- Arte sem rótulos do mesmo mapa (desejável, mas a imagem atual serve como base).
- Posicionamento manual confirmado dos pontos difíceis, incluindo Ponta da Luz.
- Marcação dos trajetos e paradas de cada sessão, extraída de registros de mesa e validada pelo mestre.
- Credenciais de integração Notion/Drive e política de backup; nunca colocar tokens no repositório público.
- Quantidade de mapas filhos e acervo final de imagens/sons.
- Decidir quais tipos de conhecimento histórico total podem ser disponibilizados imediatamente e quais exigem liberação editorial.

## 12. Padrão de entrega
PRs separados; preview em Vercel antes de main. Este documento **não** autoriza publicar automaticamente páginas do Notion, fazer upgrade para Blaze ou vincular faturamento. Apenas registra que Blaze é uma evolução permitida após autorização explícita.
