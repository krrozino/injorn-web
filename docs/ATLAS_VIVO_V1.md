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
- **Custo recorrente obrigatório: R$ 0**. Não contratar upgrades, billing por uso, domínios pagos ou serviços novos cobrados.

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

## 9. Arquitetura de custo zero
- Site: Next.js + Vercel Hobby **somente para projeto pessoal não comercial**.
- Mapa: Leaflet (open source), imagem própria; sem APIs pagas de mapa.
- Conteúdo publicado: preferir snapshot estático no build/CDN, para que acessos públicos não gerem consultas ao Notion/Drive/Supabase em tempo real.
- Autenticação, coordenadas autoradas, fila editorial: avaliar Supabase Free no momento da implementação do Studio, com RLS e credenciais exclusivamente no servidor. Projeto gratuito pode pausar com baixa atividade; o atlas público deve continuar funcionando mesmo assim.
- Alternativa/primeiro MVP: dados públicos estáticos e trabalho editorial manual/revisado no repositório; Studio e banco só quando necessários.
- Google Drive API: operar abaixo das cotas, sem habilitar cobrança automática. Google anunciou ajustes/cobranças para usos acima das quotas; vigiar antes de ativar serviços Google Cloud.
- Vercel Hobby, Notion, Supabase e Google Drive possuem quotas e políticas mutáveis: custo zero é requisito com **degradação/bloqueio ao atingir limites**, não promessa de recursos ilimitados.
- Evitar serviços dependentes de cartão, domínio pago, armazenamento de áudio gigantesco e qualquer upgrade silencioso.

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
PRs separados; preview em Vercel antes de main. Este documento **não** autoriza publicar automaticamente páginas do Notion nem habilitar pagamentos/planos pagos.
