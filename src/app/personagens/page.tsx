import type { Metadata } from "next";
import { PublicPage } from "@/components/PublicPage";

export const metadata: Metadata = {
  title: "Personagens",
};

export default function PersonagensPage() {
  return (
    <PublicPage
      eyebrow="Nomes de Injorn"
      title="Personagens"
      intro="Retratos, títulos, vínculos e informações públicas sobre as figuras que os jogadores já conhecem."
    >
      <div className="content-grid">
        <article className="content-card">
          <span className="content-card__index">01 · DESTAQUES</span>
          <h2>Figuras centrais</h2>
          <p>Espaço para personagens de maior peso narrativo e político já apresentados na campanha.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">02 · RELAÇÕES</span>
          <h2>Casas e alianças</h2>
          <p>Conexões públicas entre personagens, famílias, facções e instituições conhecidas.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">03 · EXPLORAÇÃO</span>
          <h2>Retratos interativos</h2>
          <p>A engine de hotspots está pronta para receber personagens canônicos quando suas artes forem fechadas.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">04 · APARIÇÕES</span>
          <h2>Rastros nas crônicas</h2>
          <p>Cada personagem poderá apontar para sessões, lugares e acontecimentos em que esteve envolvido.</p>
        </article>
      </div>
    </PublicPage>
  );
}
