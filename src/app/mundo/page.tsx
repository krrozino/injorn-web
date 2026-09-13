import type { Metadata } from "next";
import { KnowledgeStatus } from "@/components/KnowledgeStatus";
import { PublicPage } from "@/components/PublicPage";
import { knownPlaces, officialTimeline, spoilerBoundary } from "@/content/playerKnowledge";
import { knownTravelDistances } from "@/content/travel";

export const metadata: Metadata = {
  title: "Mundo",
};

export default function MundoPage() {
  return (
    <PublicPage
      eyebrow="Atlas de Injorn"
      title="O Mundo"
      intro="O que pode ser consultado sem atravessar a fronteira entre conhecimento dos jogadores e bastidores do mestre."
    >
      <section className="knowledge-boundary" aria-label="Limite de conhecimento">
        <span>{spoilerBoundary.label}</span>
        <p>{spoilerBoundary.note}</p>
      </section>

      <section className="lore-section" aria-labelledby="reino-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">O reino</p>
            <h2 id="reino-title">Injorn, ordem sob a Coroa</h2>
          </div>
          <KnowledgeStatus status="official" />
        </header>
        <div className="lore-prose lore-prose--lead">
          <p>
            Injorn se apresenta como uma monarquia teocrática conduzida por Charles von Helder II.
            O reino cultiva a imagem de uma potência neutra, disciplinada e protetora, onde a ordem,
            a lei e a fé sustentam a prosperidade.
          </p>
          <p>
            A experiência dos aventureiros, porém, já demonstrou que documentos oficiais, rumores e
            fatos observados nem sempre contam a mesma história. Por isso, o arquivo identifica a
            origem de cada informação em vez de misturá-las como se fossem uma única verdade.
          </p>
        </div>
      </section>

      <section className="lore-section" aria-labelledby="places-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Cartografia conhecida</p>
            <h2 id="places-title">Lugares já revelados</h2>
          </div>
          <p className="lore-section__aside">Clique em um registro para abrir sua camada cartográfica.</p>
        </header>

        <div className="ritual-grid ritual-grid--atlas">
          {knownPlaces.map((place, index) => (
            <details className="ritual-record ritual-record--atlas" key={place.name}>
              <summary>
                <span className="ritual-record__index">{String(index + 1).padStart(2, "0")}</span>
                <div className="ritual-record__summary-copy">
                  <span>{place.kind}</span>
                  <h3>{place.name}</h3>
                </div>
                <KnowledgeStatus status={place.status} />
                <span className="ritual-record__command">abrir registro</span>
              </summary>
              <div className="ritual-record__body">
                <div className="atlas-iris" aria-hidden="true"><i /><i /><i /><i /></div>
                <p>{place.summary}</p>
                <ul className="lore-list">
                  {place.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="lore-section" aria-labelledby="travel-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Estradas conhecidas</p>
            <h2 id="travel-title">Distâncias a partir da capital</h2>
          </div>
          <p className="lore-section__aside">
            Tempos aproximados usados pelos viajantes do reino. Terreno, clima, patrulhas e incidentes
            podem alterar qualquer percurso.
          </p>
        </header>

        <div className="travel-table travel-table--ritual" role="table" aria-label="Distâncias conhecidas de Injorn">
          <div className="travel-table__row travel-table__row--head" role="row">
            <span role="columnheader">Destino</span>
            <span role="columnheader">Direção</span>
            <span role="columnheader">A cavalo</span>
            <span role="columnheader">A pé</span>
            <span role="columnheader">Distância</span>
          </div>
          {knownTravelDistances.map((route) => (
            <div className="travel-table__row" role="row" key={route.destination}>
              <strong role="cell">{route.destination}</strong>
              <span role="cell">{route.direction}</span>
              <span role="cell">{route.horseback}</span>
              <span role="cell">{route.onFoot}</span>
              <span role="cell">{route.distance}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="lore-section" aria-labelledby="timeline-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Arquivo Real · ARQ-INJ-001</p>
            <h2 id="timeline-title">Cronologia oficial</h2>
          </div>
          <KnowledgeStatus status="official" />
        </header>
        <p className="lore-section__note">
          Esta linha do tempo preserva a versão publicada pelo Estado de Injorn. Ela é apresentada
          como documento histórico oficial, não como confirmação de que cada afirmação seja verdadeira.
        </p>

        <div className="timeline timeline--sealed">
          {officialTimeline.map((event) => (
            <article className="timeline__entry" key={`${event.year}-${event.title}`}>
              <div className="timeline__year">{event.year}</div>
              <div>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicPage>
  );
}
