import type { Metadata } from "next";
import { KnowledgeStatus } from "@/components/KnowledgeStatus";
import { PublicPage } from "@/components/PublicPage";
import { currentParty } from "@/content/party";
import { publicFigures, spoilerBoundary } from "@/content/playerKnowledge";

export const metadata: Metadata = {
  title: "Personagens",
};

export default function PersonagensPage() {
  const officialFigures = publicFigures.filter((figure) => figure.status === "official");
  const encounteredFigures = publicFigures.filter((figure) => figure.status !== "official");

  return (
    <PublicPage
      eyebrow="Nomes de Injorn"
      title="Personagens"
      intro="Aventureiros, figuras políticas, religiosas e pessoas encontradas ao longo da campanha, sempre limitados ao que pode ser compartilhado entre os jogadores."
    >
      <section className="knowledge-boundary" aria-label="Limite de conhecimento">
        <span>{spoilerBoundary.label}</span>
        <p>
          Retratos interativos serão adicionados quando suas artes canônicas estiverem fechadas. Segredos
          individuais de personagens jogadores não entram no site só porque existem nas páginas privadas do Notion.
        </p>
      </section>

      <section className="lore-section" aria-labelledby="party-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">O grupo</p>
            <h2 id="party-title">Aventureiros do Ato II</h2>
          </div>
          <p className="lore-section__aside">
            Dossiês deliberadamente públicos. Memórias apagadas, revelações futuras e segredos pessoais
            permanecem onde pertencem: na mesa e nas anotações privadas.
          </p>
        </header>

        <div className="party-grid">
          {currentParty.map((member, index) => (
            <article className="party-card" key={member.name}>
              <div className="party-card__index">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <span className="party-card__descriptor">{member.descriptor}</span>
                <h3>{member.name}</h3>
                <p>{member.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="lore-section" aria-labelledby="official-figures-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Poder, fé e propaganda</p>
            <h2 id="official-figures-title">Figuras da narrativa oficial</h2>
          </div>
          <p className="lore-section__aside">Como o Estado e a doutrina pública apresentam estes nomes.</p>
        </header>

        <div className="figure-grid">
          {officialFigures.map((figure) => (
            <article className="figure-card" key={figure.name}>
              <div className="figure-card__top">
                <span>{figure.role}</span>
                <KnowledgeStatus status={figure.status} />
              </div>
              <h3>{figure.name}</h3>
              <div className="tag-row" aria-label="Títulos conhecidos">
                {figure.titles.map((title) => (
                  <span key={title}>{title}</span>
                ))}
              </div>
              <p>{figure.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lore-section" aria-labelledby="encounters-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">A campanha</p>
            <h2 id="encounters-title">Pessoas já encontradas ou identificadas</h2>
          </div>
          <KnowledgeStatus status="observed" />
        </header>

        <div className="figure-grid">
          {encounteredFigures.map((figure) => (
            <article className="figure-card" key={figure.name}>
              <div className="figure-card__top">
                <span>{figure.role}</span>
                <KnowledgeStatus status={figure.status} />
              </div>
              <h3>{figure.name}</h3>
              <div className="tag-row">
                {figure.titles.map((title) => (
                  <span key={title}>{title}</span>
                ))}
              </div>
              <p>{figure.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lore-section lore-section--quiet" aria-labelledby="portraits-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Próxima camada</p>
            <h2 id="portraits-title">Retratos exploráveis</h2>
          </div>
        </header>
        <div className="lore-prose">
          <p>
            As páginas individuais receberão a linguagem interativa de Injorn: armas, símbolos,
            coroas, documentos e outros elementos só reagirão quando levarem a informação real.
            Charles von Helder II será remapeado quando seu novo visual estiver definido.
          </p>
        </div>
      </section>
    </PublicPage>
  );
}
