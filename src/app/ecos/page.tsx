import type { Metadata } from "next";
import { PublicPage } from "@/components/PublicPage";

export const metadata: Metadata = {
  title: "Ecos",
};

export default function EcosPage() {
  return (
    <PublicPage
      eyebrow="Música de Injorn"
      title="Ecos de Injorn"
      intro="Temas, leitmotivs e paisagens sonoras ligados a personagens, lugares e acontecimentos do mundo."
    >
      <div className="content-grid">
        <article className="content-card">
          <span className="content-card__index">01 · PERSONAGENS</span>
          <h2>Leitmotivs</h2>
          <p>Temas associados a personagens poderão aparecer também dentro de suas páginas e cenas.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">02 · LUGARES</span>
          <h2>Paisagens sonoras</h2>
          <p>Músicas de regiões e locais podem acompanhar a exploração sem transformar o site em um player invasivo.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">03 · EVENTOS</span>
          <h2>Momentos da campanha</h2>
          <p>Trilhas de batalhas, revelações ou acontecimentos importantes podem ficar ligadas às crônicas correspondentes.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">04 · REPRODUÇÃO</span>
          <h2>Player contextual</h2>
          <p>O sistema visual já reserva espaço para áudio; a integração definitiva entra quando fecharmos a biblioteca musical.</p>
        </article>
      </div>
    </PublicPage>
  );
}
