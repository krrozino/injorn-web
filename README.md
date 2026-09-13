# Injorn Web

Site público e interativo do universo de Injorn.

## Direção do projeto

O site é voltado exclusivamente ao que os jogadores podem conhecer. Planejamento de mestre, spoilers, eventos futuros e documentação privada permanecem fora desta aplicação.

A experiência segue quatro princípios:

1. **Identidade própria** — interface, tipografia, ritmo e movimento devem parecer Injorn mesmo sem uma ilustração específica na tela.
2. **Descoberta contextual** — elementos reagem quando há algo relevante para explorar.
3. **Interação sem ruído** — animação comunica significado; não existe brilho ou movimento gratuito.
4. **Responsividade real** — hover no desktop e descoberta em dois toques no mobile, com suporte a teclado e `prefers-reduced-motion`.

## Fundação atual

A branch `feat/foundation-v1` estabelece:

- Next.js + TypeScript;
- linguagem visual base de Injorn;
- header responsivo e menu mobile;
- home sem dependência de imagens de personagens;
- áreas públicas para Mundo, Personagens, Crônicas, Arquivo e Ecos;
- contratos de conteúdo público;
- engine reutilizável de cenas interativas e hotspots.

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Conteúdo privado

Nenhuma informação exclusiva do mestre deve ser incluída no bundle, em rotas ocultas, variáveis públicas ou arquivos enviados ao cliente. Se não pode ser visto por um jogador, não pertence a este repositório público.
