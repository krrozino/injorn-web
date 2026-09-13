import type { Metadata } from "next";
import { HeraldicGallery } from "@/components/HeraldicGallery";
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

      <section className="lore-section" aria-labelledby="gallery-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Cerimonial público</p>
            <h2 id="gallery-title">Salão das molduras</h2>
          </div>
          <p className="lore-section__aside">
            As artes finais ainda podem mudar. Por enquanto, a moldura, o vitral e a procedência contam a história antes do retrato.
          </p>
        </header>
        <HeraldicGallery figures={publicFigures} />
      </section>

      <section className="lore-section" aria-labelledby="party-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">O grupo</p>
            <h2 id="party-title">Aventureiros do Ato II</h2>
          </div>
          <p className="lore-section__aside">Abra os retratos para consultar apenas o dossiê público de cada personagem.</p>
        </header>

        <div className="portrait-ledger">
          {currentParty.map((member, index) => (
            <details className="portrait-record portrait-record--party" key={member.name}>
              <summary>
                <span className="portrait-record__index">{String(index + 1).padStart(2, "0")}</span>
                <div className="portrait-record__frame" aria-hidden="true"><i /><i /></div>
                <div className="portrait-record__identity">
                  <span>{member.descriptor}</span>
                  <h3>{member.name}</h3>
                </div>
                <span className="portrait-record__command">abrir retrato</span>
              </summary>
              <div className="portrait-record__body">
                <p>{member.summary}</p>
                <span className="portrait-record__seal">DOSSIÊ PÚBLICO</span>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="lore-section" aria-labelledby="official-figures-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Poder, fé e propaganda</p>
            <h2 id="official-figures-title">Galeria oficial</h2>
          </div>
          <p className="lore-section__aside">A moldura é parte da propaganda. O texto continua identificado como registro oficial.</p>
        </header>

        <div className="portrait-ledger portrait-ledger--royal">
          {officialFigures.map((figure, index) => (
            <details className="portrait-record portrait-record--royal" key={figure.name}>
              <summary>
                <span className="portrait-record__index">R{String(index + 1).padStart(2, "0")}</span>
                <div className="portrait-record__frame portrait-record__frame--royal" aria-hidden="true"><i /><i /></div>
                <div className="portrait-record__identity">
                  <span>{figure.role}</span>
                  <h3>{figure.name}</h3>
                </div>
                <KnowledgeStatus status={figure.status} />
                <span className="portrait-record__command">romper cortina</span>
              </summary>
              <div className="portrait-record__body">
                <div className="tag-row" aria-label="Títulos conhecidos">
                  {figure.titles.map((title) => <span key={title}>{title}</span>)}
                </div>
                <p>{figure.summary}</p>
              </div>
            </details>
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

        <div className="portrait-ledger portrait-ledger--encountered">
          {encounteredFigures.map((figure, index) => (
            <details className="portrait-record portrait-record--encountered" key={figure.name}>
              <summary>
                <span className="portrait-record__index">E{String(index + 1).padStart(2, "0")}</span>
                <div className="portrait-record__frame" aria-hidden="true"><i /><i /></div>
                <div className="portrait-record__identity">
                  <span>{figure.role}</span>
                  <h3>{figure.name}</h3>
                </div>
                <KnowledgeStatus status={figure.status} />
                <span className="portrait-record__command">consultar encontro</span>
              </summary>
              <div className="portrait-record__body">
                <div className="tag-row">
                  {figure.titles.map((title) => <span key={title}>{title}</span>)}
                </div>
                <p>{figure.summary}</p>
              </div>
            </details>
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
