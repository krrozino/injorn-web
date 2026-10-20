import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/PublicPage";
import { AtlasMapViewer } from "@/components/atlas/AtlasMapViewer";
import "./atlas.css";
import "./atlas-places.css";

export const metadata: Metadata = {
  title: "Atlas Vivo — Lugares do Reino",
  description: "Explore o mapa canônico e os primeiros lugares documentados do Reino de Injorn.",
};

export default function AtlasPage() {
  return (
    <PublicPage
      eyebrow="Atlas Vivo de Injorn · M1"
      title="Cartografia do Reino"
      intro="Percorra o Reino de Injorn e descubra lugares documentados, sem confundir a história do mundo com a jornada dos aventureiros."
    >
      <div className="atlas-page-shell">
        {/* Banner de integridade e transparência cartográfica */}
        <div className="atlas-status-banner" role="note" aria-label="Status da cartografia canônica">
          <div className="atlas-status-banner__body">
            <div className="atlas-status-banner__title">
              <span>M1 · Em validação</span>
              Arte Cartográfica Canônica do Reino
            </div>
            <p className="atlas-status-banner__desc">
              Esta superfície apresenta a arte original fornecida pelo criador do universo (1448 × 1086 px).
              Em conformidade com a política editorial de Injorn, não foram gerados mapas por IA,
              nem rotas simuladas. Os três primeiros marcadores foram posicionados sobre os locais desenhados na arte.
            </p>
          </div>
          <Link href="/mundo" className="atlas-portal-card__btn" style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}>
            ← Retornar ao Mundo
          </Link>
        </div>

        {/* Visualizador Leaflet interativo */}
        <section aria-label="Visualizador interativo do mapa de Injorn">
          <AtlasMapViewer />
        </section>

        {/* Seções informativas e diretrizes do Atlas */}
        <div className="atlas-lore-grid">
          <article className="atlas-card">
            <h3>✦ Cânone Cartográfico</h3>
            <p>
              O mapa representa o Reino de Injorn. Três marcos recebem informações já publicadas no
              Códice; outros lugares, como Ponta da Luz, aguardam a confirmação da âncora pelo mestre.
            </p>
            <ul>
              <li>Resolução original de 1448 × 1086 pixels preservada</li>
              <li>Asset otimizado WebP com verificação estrita de hash</li>
              <li>Suporte arquitetural para futuros mapas filhos de cidades</li>
            </ul>
          </article>

          <article className="atlas-card">
            <h3>✦ Coordenadas Normalizadas</h3>
            <p>
              O sistema cartográfico utiliza coordenadas normalizadas [0, 1] com origem no topo-esquerdo.
              Não são projetadas latitudes ou longitudes terrestres fictícias no código.
            </p>
            <ul>
              <li>Origem orientada no canto superior esquerdo (X: 0, Y: 0)</li>
              <li>Inspetor ativo de coordenadas para conferência em tempo real</li>
              <li>Cálculo matemático bidirecional com Leaflet CRS.Simple</li>
            </ul>
          </article>

          <article className="atlas-card">
            <h3>✦ Próximos Marcos (Roadmap)</h3>
            <p>
              O Atlas Vivo evolui em etapas incrementais e auditáveis, sem atalhos com dados não oficiais:
            </p>
            <ul>
              <li><strong>M1:</strong> Três locais visíveis, com pesquisa e leitura interativa</li>
              <li><strong>M2:</strong> Códice histórico universal e cronologia</li>
              <li><strong>M3:</strong> Rota da jornada confirmada das sessões jogadas</li>
            </ul>
          </article>
        </div>
      </div>
    </PublicPage>
  );
}
