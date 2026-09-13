import type { Metadata } from "next";
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
            <h2 id="records-title">Registros disponíveis</h2>
          </div>
          <p className="lore-section__aside">O selo ao lado de cada entrada indica de onde aquela informação veio.</p>
        </header>

        <div className="archive-list">
          {archiveEntries.map((entry) => (
            <article className="archive-entry" key={entry.code}>
              <div className="archive-entry__code">{entry.code}</div>
              <div className="archive-entry__body">
                <div className="archive-entry__meta">
                  <KnowledgeStatus status={entry.status} />
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="lore-section" aria-labelledby="migarazur-title">
        <header className="lore-section__heading">
          <div>
            <p className="kicker">Documento em conflito</p>
            <h2 id="migarazur-title">Migarazur: doutrina e descoberta</h2>
          </div>
        </header>

        <div className="split-record">
          <article>
            <KnowledgeStatus status="official" />
            <h3>A versão ensinada por Injorn</h3>
            <p>
              Os sete arcanjos teriam unido voluntariamente suas essências numa única manifestação
              divina para proteger o reino. A tradição chama essa convergência de Migarazur, o Prisma
              da Vontade Divina.
            </p>
          </article>
          <article>
            <KnowledgeStatus status="discovered" />
            <h3>O que a Dissonância revelou ao grupo</h3>
            <p>
              Migarazur é um receptáculo que mantém sete consciências angelicais aprisionadas. A
              magia religiosa usada por Injorn está ligada à extração desse poder. Essa informação já
              foi apresentada aos personagens durante o retorno clandestino à capital.
            </p>
          </article>
        </div>
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
            A epidemia encontrada em Ponta da Luz, São Kael e depois na capital apresenta sangue
            negro de odor doce, febre, tosse, necrose e reanimação após a morte. O grupo descobriu que
            calor acelera a progressão e que o contato com o líquido negro pode transmitir a condição.
          </p>
          <p>
            Evidências recolhidas em registros, cartas e laboratórios ligam Gaspar e Lorde Valerius à
            produção e disseminação deliberada do chamado Protótipo Catalisador. Algumas criaturas
            geradas pela Praga funcionam como bombas biológicas e podem corroer equipamentos comuns.
          </p>
        </div>
      </section>
    </PublicPage>
  );
}
