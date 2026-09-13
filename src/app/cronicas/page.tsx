import type { Metadata } from "next";
import { KnowledgeStatus } from "@/components/KnowledgeStatus";
import { MemorySpindle } from "@/components/MemorySpindle";
import { PublicPage } from "@/components/PublicPage";
import { campaignChronicles, spoilerBoundary } from "@/content/playerKnowledge";

export const metadata: Metadata = {
  title: "Crônicas",
};

export default function CronicasPage() {
  return (
    <PublicPage
      eyebrow="Memória da campanha"
      title="Crônicas"
      intro="Uma memória consultável do que já aconteceu na mesa. O registro termina exatamente onde termina o conhecimento atual dos jogadores."
    >
      <section className="knowledge-boundary" aria-label="Limite de conhecimento">
        <span>{spoilerBoundary.label}</span>
        <p>
          Planos de sessões futuras não aparecem aqui. Quando uma sessão é jogada, o que realmente
          aconteceu substitui o planejamento do mestre.
        </p>
      </section>

      <section className="lore-section" aria-labelledby="spindle-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Instrumento de memória</p>
            <h2 id="spindle-title">Fuso das lembranças</h2>
          </div>
          <p className="lore-section__aside">
            Escolha uma chama. O instrumento recompõe aquela memória sem ultrapassar a última sessão pública.
          </p>
        </header>
        <MemorySpindle chapters={campaignChronicles} />
      </section>

      <section className="lore-section" aria-labelledby="chronicles-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Ato I → Ato II</p>
            <h2 id="chronicles-title">Corredor de memórias</h2>
          </div>
          <KnowledgeStatus status="observed" />
        </header>

        <div className="memory-corridor">
          {campaignChronicles.map((chapter, index) => (
            <details className="memory-fold" key={`${chapter.act}-${chapter.title}`}>
              <summary>
                <span className="memory-fold__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="memory-fold__ember" aria-hidden="true" />
                <div className="memory-fold__identity">
                  <span>{chapter.act}</span>
                  <h3>{chapter.title}</h3>
                </div>
                <span className="memory-fold__command">reabrir memória</span>
              </summary>
              <div className="memory-fold__body">
                <div className="memory-fold__thread" aria-hidden="true"><i /><i /><i /></div>
                <KnowledgeStatus status={chapter.status} />
                <p>{chapter.text}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="lore-section lore-section--quiet" aria-labelledby="now-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Agora</p>
            <h2 id="now-title">O castelo ainda não terminou de falar.</h2>
          </div>
        </header>
        <div className="lore-prose lore-prose--lead current-memory">
          <p>
            O grupo permanece em Vael Karun. O Nível -1 está aberto, o Guardião de Pedra foi
            desativado após o confronto, manifestações de memória começaram a surgir e uma presença
            ancestral já interferiu em Niccolò sem revelar sua identidade.
          </p>
          <p>
            Tudo além desse ponto continua fora do arquivo até acontecer em mesa.
          </p>
        </div>
      </section>
    </PublicPage>
  );
}
