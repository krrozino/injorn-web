# Política de conhecimento público — Injorn Web

O site de Injorn é uma superfície para jogadores. O Notion continua sendo a fonte privada do mestre.

## Regra principal

Nenhum conteúdo privado do mestre é carregado, consultado ou enviado ao navegador. Informações do Notion só entram no repositório depois de revisão manual de spoilers.

## Estados de conhecimento

- **Registro oficial**: informação publicada pelo Estado, Igreja ou outra instituição de Injorn. Pode ser propaganda e não deve ser tratada automaticamente como verdade objetiva.
- **Observado em sessão**: fato que os personagens viram ou vivenciaram diretamente.
- **Descoberto pelo grupo**: informação obtida por documentos, investigações ou revelações em jogo.
- **Rumor conhecido**: informação circulante, ainda sem confirmação plena.

## Fronteira atual

O conteúdo está liberado até os acontecimentos confirmados da **Sessão 11 do Ato II**.

Planejamento da Sessão 11.1 e de sessões posteriores é privado. Isso inclui, entre outros, identidades ainda não reveladas, salas ainda não exploradas, tecnologia Vapula ainda não encontrada e consequências futuras previstas pelo mestre.

## Regra para atualizar depois de uma sessão

1. Registrar no Notion o que realmente aconteceu.
2. Separar plano do mestre de resultado canônico.
3. Atualizar `src/content/playerKnowledge.ts` apenas com o que foi revelado.
4. Marcar a origem do conhecimento com o estado adequado.
5. Nunca colocar segredo no código esperando escondê-lo apenas por CSS, rota, feature flag ou condição de interface.

O repositório é público; segredo que entra no código deixou de ser segredo.
