import type { Metadata } from "next";
import { PublicPage } from "@/components/PublicPage";

export const metadata: Metadata = {
  title: "Arquivo",
};

export default function ArquivoPage() {
  return (
    <PublicPage
      eyebrow="Documentos de Injorn"
      title="Arquivo"
      intro="Um acervo público de objetos, cartas, símbolos e registros que já podem ser consultados pelos jogadores."
    >
      <div className="content-grid">
        <article className="content-card">
          <span className="content-card__index">01 · ARTEFATOS</span>
          <h2>Objetos importantes</h2>
          <p>Armas, relíquias e itens relevantes podem ter páginas próprias e ser acessados a partir de cenas interativas.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">02 · DOCUMENTOS</span>
          <h2>Cartas e registros</h2>
          <p>Materiais encontrados em jogo poderão ser preservados aqui para consulta posterior.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">03 · HERÁLDICA</span>
          <h2>Brasões e símbolos</h2>
          <p>Emblemas de reinos, casas e facções poderão explicar visualmente seus vínculos e significados públicos.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">04 · DESCOBERTAS</span>
          <h2>Conteúdo revelado</h2>
          <p>O arquivo cresce conforme a campanha entrega novas informações aos jogadores.</p>
        </article>
      </div>
    </PublicPage>
  );
}
