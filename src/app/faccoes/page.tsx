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
            <h2 id="factions-title">Quem disputa o futuro de Injorn</h2>
          </div>
          <p className="lore-section__aside">
            O mesmo nome pode aparecer de forma muito diferente na propaganda oficial e na
            experiência dos aventureiros.
          </p>
        </header>

        <div className="faction-grid">
          {factions.map((faction) => (
            <article className="faction-card" key={faction.name}>
              <div className="faction-card__meta">
                <span>{faction.kind}</span>
                <KnowledgeStatus status={faction.status} />
              </div>
              <h3>{faction.name}</h3>
              {faction.aliases?.length ? (
                <div className="tag-row" aria-label={`Nomes conhecidos de ${faction.name}`}>
                  {faction.aliases.map((alias) => (
                    <span key={alias}>{alias}</span>
                  ))}
                </div>
              ) : null}
              <p>{faction.summary}</p>
              <div className="faction-card__note">
                <span>O que o grupo sabe</span>
                <p>{faction.playerNote}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicPage>
  );
}
