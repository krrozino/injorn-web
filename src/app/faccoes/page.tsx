import type { Metadata } from "next";
import { KnowledgeStatus } from "@/components/KnowledgeStatus";
import { PublicPage } from "@/components/PublicPage";
import { factions } from "@/content/factions";
import { spoilerBoundary } from "@/content/playerKnowledge";

export const metadata: Metadata = {
  title: "Facções",
};

export default function FaccoesPage() {
  return (
    <PublicPage
      eyebrow="Poder, fé e resistência"
      title="Facções"
      intro="Instituições e movimentos que os jogadores já conhecem, apresentados de acordo com a origem de cada informação."
    >
      <section className="knowledge-boundary" aria-label="Limite de conhecimento">
        <span>{spoilerBoundary.label}</span>
        <p>
          Estruturas secretas, lideranças ainda não reveladas e subdivisões conhecidas apenas pelo
          mestre permanecem fora deste arquivo.
        </p>
      </section>

      <section className="lore-section" aria-labelledby="factions-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Forças em movimento</p>
            <h2 id="factions-title">Mesa dos estandartes</h2>
          </div>
          <p className="lore-section__aside">
            Cada força ocupa seu próprio espaço visual. Abra um estandarte para ver somente o que já chegou aos jogadores.
          </p>
        </header>

        <div className="banner-grid">
          {factions.map((faction, index) => (
            <details className="banner-record" key={faction.name}>
              <summary>
                <span className="banner-record__pole" aria-hidden="true"><i /></span>
                <span className="banner-record__index">{String(index + 1).padStart(2, "0")}</span>
                <div className="banner-record__identity">
                  <span>{faction.kind}</span>
                  <h3>{faction.name}</h3>
                </div>
                <KnowledgeStatus status={faction.status} />
                <span className="banner-record__command">erguer estandarte</span>
              </summary>
              <div className="banner-record__body">
                {faction.aliases?.length ? (
                  <div className="tag-row" aria-label={`Nomes conhecidos de ${faction.name}`}>
                    {faction.aliases.map((alias) => <span key={alias}>{alias}</span>)}
                  </div>
                ) : null}
                <p>{faction.summary}</p>
                <div className="banner-record__intel">
                  <span>O que o grupo sabe</span>
                  <p>{faction.playerNote}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </PublicPage>
  );
}
