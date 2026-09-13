import type { Metadata } from "next";
import { KnowledgeStatus } from "@/components/KnowledgeStatus";
import { PublicPage } from "@/components/PublicPage";
import { bestiary } from "@/content/bestiary";
import { spoilerBoundary } from "@/content/playerKnowledge";

export const metadata: Metadata = {
  title: "Bestiário",
};

export default function BestiarioPage() {
  return (
    <PublicPage
      eyebrow="Criaturas encontradas"
      title="Bestiário"
      intro="Um registro do que os aventureiros já enfrentaram ou observaram. O arquivo descreve comportamento conhecido sem entregar estatísticas ou origens ainda secretas."
    >
      <section className="knowledge-boundary" aria-label="Limite de conhecimento">
        <span>{spoilerBoundary.label}</span>
        <p>
          Uma criatura só entra aqui depois de aparecer em mesa. Explicações de mestre, fichas,
          fraquezas não descobertas e variantes futuras ficam fora do site.
        </p>
      </section>

      <section className="lore-section" aria-labelledby="bestiary-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Registro de campo</p>
            <h2 id="bestiary-title">O que já olhou de volta</h2>
          </div>
          <KnowledgeStatus status="observed" />
        </header>

        <div className="bestiary-grid">
          {bestiary.map((creature) => (
            <article className="bestiary-card" key={creature.name}>
              <div className="bestiary-card__meta">
                <span>{creature.category}</span>
                <KnowledgeStatus status={creature.status} />
              </div>
              <h3>{creature.name}</h3>
              <div className="bestiary-card__first-seen">
                <span>Primeiro registro</span>
                <strong>{creature.firstSeen}</strong>
              </div>
              <p>{creature.summary}</p>
              <ul className="lore-list">
                {creature.knownTraits.map((trait) => (
                  <li key={trait}>{trait}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </PublicPage>
  );
}
