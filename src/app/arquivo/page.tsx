import type { Metadata } from "next";
import { ArchiveRituals } from "@/components/ArchiveRituals";
import { KnowledgeStatus } from "@/components/KnowledgeStatus";
import { PublicPage } from "@/components/PublicPage";
import { archiveEntries, spoilerBoundary } from "@/content/playerKnowledge";

export const metadata: Metadata = {
  title: "Arquivo",
};

export default function ArquivoPage() {
  return (
    <PublicPage
      eyebrow="Documentos de Injorn"
      title="Arquivo"
      intro="Registros oficiais, dossiês construídos em jogo e descobertas que já pertencem à memória dos jogadores."
    >
      <section className="knowledge-boundary" aria-label="Limite de conhecimento">
        <span>{spoilerBoundary.label}</span>
        <p>
          O site não consulta o Notion do mestre em tempo de execução. Só existe aqui a cópia
          deliberadamente liberada para jogadores.
        </p>
      </section>

      <section className="lore-section" aria-labelledby="records-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Acervo consultável</p>
            <h2 id="records-title">Registros lacrados</h2>
          </div>
          <p className="lore-section__aside">
            Cada registro reage como um objeto do mundo. Clique para romper o lacre e abrir o dossiê.
          </p>
        </header>

        <ArchiveRituals entries={archiveEntries} />
      </section>

      <section className="lore-section" aria-labelledby="plague-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Dossiê da campanha</p>
            <h2 id="plague-title">A Praga</h2>
          </div>
          <KnowledgeStatus status="discovered" />
        </header>
        <div className="lore-prose">
          <p>
            O grupo reuniu sinais recorrentes da epidemia em Ponta da Luz, São Kael e na capital,
            além de registros que mostram que a temperatura influencia sua progressão.
          </p>
          <p>
            Cartas, laboratórios e testemunhos encontrados durante a campanha conectam Gaspar e
            Lorde Valerius ao desenvolvimento e à disseminação deliberada da crise.
          </p>
        </div>
      </section>
    </PublicPage>
  );
}
