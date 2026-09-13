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

        <div className="specimen-grid">
          {bestiary.map((creature, index) => (
            <details className="specimen-record" key={creature.name}>
              <summary>
                <span className="specimen-record__number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <span>{creature.category}</span>
                  <h3>{creature.name}</h3>
                </div>
                <span className="specimen-record__command">examinar registro</span>
              </summary>
              <div className="specimen-record__body">
                <div className="specimen-record__scan" aria-hidden="true"><i /><i /><i /></div>
                <div className="specimen-record__meta">
                  <KnowledgeStatus status={creature.status} />
                  <span>Primeiro registro · {creature.firstSeen}</span>
                </div>
                <p>{creature.summary}</p>
                <div className="specimen-record__traits">
                  <span>Traços observados</span>
                  <ul className="lore-list">
                    {creature.knownTraits.map((trait) => (
                      <li key={trait}>{trait}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </PublicPage>
  );
}
