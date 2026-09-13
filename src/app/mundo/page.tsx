import type { Metadata } from "next";
import { PublicPage } from "@/components/PublicPage";

export const metadata: Metadata = {
  title: "Mundo",
};

export default function MundoPage() {
  return (
    <PublicPage
      eyebrow="Atlas de Injorn"
      title="O Mundo"
      intro="Lugares, fronteiras e regiões entram aqui somente depois de fazerem parte do conhecimento dos jogadores."
    >
      <div className="content-grid">
        <article className="content-card">
          <span className="content-card__index">01 · REGIÕES</span>
          <h2>Terras conhecidas</h2>
          <p>Base para regiões, reinos e territórios já apresentados durante a campanha.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">02 · LOCAIS</span>
          <h2>Cidades e marcos</h2>
          <p>Castelos, cidades, estradas, ruínas e outros lugares que os jogadores possam consultar.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">03 · MAPA</span>
          <h2>Mapa interativo</h2>
          <p>Esta área receberá o mapa navegável e suas conexões contextuais quando a cartografia estiver pronta.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">04 · HISTÓRIA</span>
          <h2>Memória do mundo</h2>
          <p>Eventos históricos de conhecimento público, sem misturar informações reservadas ao mestre.</p>
        </article>
      </div>
    </PublicPage>
  );
}
