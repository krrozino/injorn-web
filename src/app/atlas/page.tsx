import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/PublicPage";
import { AtlasMapViewer } from "@/components/atlas/AtlasMapViewer";
import "./atlas.css";

export const metadata: Metadata = {
  title: "Atlas Vivo",
  description: "Mapa canônico navegável do Reino de Injorn.",
};

export default function AtlasPage() {
  return (
    <PublicPage
      eyebrow="Atlas Vivo de Injorn · M0"
      title="Cartografia Real"
      intro="O mapa canônico do Reino de Injorn em visualização navegável de alta fidelidade. Explore costas, rios, relevo e divisas sem distorções."
    >
      <div className="atlas-page-shell">
        {/* Banner de integridade e transparência cartográfica */}
        <div className="atlas-status-banner" role="note" aria-label="Status da cartografia canônica">
          <div className="atlas-status-banner__body">
            <div className="atlas-status-banner__title">
              <span>M0 Homologado</span>
              Arte Cartográfica Canônica do Reino
            </div>
            <p className="atlas-status-banner__desc">
              Esta superfície apresenta a arte original fornecida pelo criador do universo (1448 × 1086 px).
              Em conformidade com a política editorial de Injorn, não foram gerados mapas por IA,
              nem coordenadas inventadas ou rotas simuladas.
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
              O mapa exibido representa o Reino de Injorn em sua totalidade conhecida. Pontos de difícil
              localização, incluindo Ponta da Luz e regiões limítrofes, têm sua fidelidade preservada
              diretamente a partir do traço original do autor.
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
              <li><strong>M1:</strong> Georreferência manual de lugares e fortalezas</li>
              <li><strong>M2:</strong> Códice histórico universal e cronologia</li>
              <li><strong>M3:</strong> Rota da jornada confirmada das sessões jogadas</li>
            </ul>
          </article>
        </div>
      </div>
    </PublicPage>
  );
}
