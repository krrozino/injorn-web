import Link from "next/link";
import { PropagandaPoster } from "@/components/PropagandaPoster";
import { RoyalDecree } from "@/components/RoyalDecree";
import { SiteHeader } from "@/components/SiteHeader";

const portals = [
  {
    id: "mundo",
    href: "/mundo",
    index: "I",
    eyebrow: "Atlas",
    title: "O Mundo",
    text: "Capital Injorn, Ponta da Luz, São Kael, Vael Karun, distâncias conhecidas e a cronologia oficial do reino.",
    action: "Explorar o mundo",
  },
  {
    id: "personagens",
    href: "/personagens",
    index: "II",
    eyebrow: "Nomes",
    title: "Personagens",
    text: "O grupo atual, a imagem pública dos Von Helder e as pessoas que já cruzaram o caminho dos aventureiros.",
    action: "Conhecer personagens",
  },
  {
    id: "faccoes",
    href: "/faccoes",
    index: "III",
    eyebrow: "Poder",
    title: "Facções",
    text: "Coroa, Igreja, forças do Estado e redes de resistência já conhecidas pelo grupo.",
    action: "Ver forças em movimento",
  },
  {
    id: "bestiario",
    href: "/bestiario",
    index: "IV",
    eyebrow: "Registro de campo",
    title: "Bestiário",
    text: "Criaturas e manifestações já observadas, sem revelar fichas, origens secretas ou ameaças futuras.",
    action: "Abrir o bestiário",
  },
  {
    id: "cronicas",
    href: "/cronicas",
    index: "V",
    eyebrow: "Memória",
    title: "Crônicas",
    text: "Da Praga e do Monastério ao despertar de Vael Karun, sem avançar além da última sessão confirmada.",
    action: "Ler as crônicas",
  },
  {
    id: "arquivo",
    href: "/arquivo",
    index: "VI",
    eyebrow: "Documentos",
    title: "Arquivo",
    text: "Registros oficiais, descobertas sobre Migarazur, o dossiê da Praga e outros conhecimentos já liberados.",
    action: "Abrir o arquivo",
  },
];

const knowledgeMarks = [
  {
    mark: "O",
    title: "Registro oficial",
    text: "Aquilo que Coroa, Igreja ou instituições de Injorn apresentam publicamente.",
    tone: "official",
  },
  {
    mark: "V",
    title: "Visto em sessão",
    text: "Algo que os personagens presenciaram diretamente durante a campanha.",
    tone: "observed",
  },
  {
    mark: "D",
    title: "Descoberto",
    text: "Informação conquistada por investigação, exploração ou revelação em jogo.",
    tone: "discovered",
  },
  {
    mark: "R",
    title: "Rumor",
    text: "Conhecimento que circula pelo mundo, mas ainda não possui confirmação.",
    tone: "rumor",
  },
];

const knownRoute = ["Capital Injorn", "Ponta da Luz", "São Kael", "Vael Karun"];

export default function Home() {
  return (
    <main className="injorn-home">
      <SiteHeader />

      <section className="hero hero--injorn" aria-labelledby="hero-title">
        <div className="hero__ambient" aria-hidden="true">
          <div className="hero__ring hero__ring--outer" />
          <div className="hero__ring hero__ring--inner" />
          <div className="hero__axis hero__axis--vertical" />
          <div className="hero__axis hero__axis--horizontal" />
          <div className="hero__diamond" />
          <div className="hero__seven-lights">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="hero__edict" aria-hidden="true">
          <span>ARQUIVO DO REINO</span>
          <span>VII LUZES</span>
        </div>

        <p className="kicker">Arquivo público do universo</p>
        <h1 id="hero-title" className="injorn-wordmark" aria-label="INJORN">
          <span aria-hidden="true">I</span>
          <span aria-hidden="true">N</span>
          <span aria-hidden="true">J</span>
          <span aria-hidden="true">O</span>
          <span aria-hidden="true">R</span>
          <span aria-hidden="true">N</span>
        </h1>
        <p className="hero__statement">
          Um reino de ouro, pedra, propaganda e memórias que se recusam a permanecer enterradas.
        </p>

        <div className="hero__actions">
          <Link className="primary-link" href="/mundo">
            <span>Entrar em Injorn</span>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link className="text-link" href="/cronicas">
            Ler as crônicas
          </Link>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span />
          <small>Role para explorar</small>
        </div>
      </section>

      <section className="royal-doctrine section-shell" aria-labelledby="doctrine-title">
        <RoyalDecree />
        <div className="royal-doctrine__content">
          <p className="kicker">A face oficial do reino</p>
          <h2 id="doctrine-title">Injorn possui uma versão de si mesmo.</h2>
          <p>
            Monumentos, moedas, vitrais, cerimônias e registros públicos constroem uma narrativa de
            ordem e continuidade. Aqui, essa narrativa aparece como aquilo que ela é: uma fonte do
            mundo, não uma garantia de verdade.
          </p>
          <Link className="text-link text-link--large" href="/arquivo">
            Consultar registros e descobertas
          </Link>
        </div>
      </section>

      <section className="section-shell" aria-labelledby="propaganda-title">
        <header className="section-heading">
          <div>
            <p className="kicker">Propaganda de Estado</p>
            <h2 id="propaganda-title">Algumas verdades vêm impressas antes de serem questionadas.</h2>
          </div>
          <p>O cartaz existe como peça do mundo. Rasgue a superfície para trocar propaganda por procedência.</p>
        </header>
        <PropagandaPoster />
      </section>

      <section className="knowledge-codex section-shell" aria-labelledby="knowledge-title">
        <header className="knowledge-codex__heading">
          <div>
            <p className="kicker">Linguagem do arquivo</p>
            <h2 id="knowledge-title">Nem toda informação pesa do mesmo jeito.</h2>
          </div>
          <p>
            Cada selo indica de onde aquele conhecimento veio. Passe pelos registros como quem
            examina um documento: procedência importa.
          </p>
        </header>

        <div className="knowledge-codex__grid">
          {knowledgeMarks.map((item) => (
            <article className={`knowledge-mark knowledge-mark--${item.tone}`} key={item.title}>
              <div className="knowledge-mark__seal" aria-hidden="true">
                <span>{item.mark}</span>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="journey-thread" aria-labelledby="journey-title">
        <div className="journey-thread__inner section-shell">
          <header>
            <p className="kicker">Rastro conhecido</p>
            <h2 id="journey-title">O mundo cresce por onde a campanha passa.</h2>
          </header>

          <div className="journey-thread__route" role="list" aria-label="Locais conhecidos da jornada">
            {knownRoute.map((place, index) => (
              <Link href="/mundo" className="journey-thread__node" key={place} role="listitem">
                <span className="journey-thread__index">0{index + 1}</span>
                <i aria-hidden="true" />
                <strong>{place}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto section-shell" aria-labelledby="manifesto-title">
        <div className="section-number">01</div>
        <div className="manifesto__content">
          <p className="kicker">Princípio de navegação</p>
          <h2 id="manifesto-title">Se algo reage de maneira especial, existe algo para descobrir.</h2>
          <p>
            O site não trata tudo como botão. Armas brilham como metal. Documentos levantam como
            pergaminho. Heráldica recebe traços de ouro. Lugares aprofundam a cena. A interação deve
            contar a mesma história que o conteúdo.
          </p>
        </div>
      </section>

      <section className="portals section-shell" aria-label="Áreas de Injorn">
        <header className="section-heading">
          <div>
            <p className="kicker">Explore</p>
            <h2>Portas para o mundo</h2>
          </div>
          <p>
            Cada parte do arquivo possui uma gramática própria. Atlas não se comporta como bestiário;
            propaganda não se comporta como memória; uma facção não se apresenta como um documento.
          </p>
        </header>

        <div className="portal-grid portal-grid--injorn">
          {portals.map((portal) => (
            <Link className="portal-card portal-card--injorn" id={portal.id} key={portal.id} href={portal.href}>
              <div className="portal-card__sigil" aria-hidden="true">
                <span>{portal.index}</span>
              </div>
              <div className="portal-card__topline">
                <span>{portal.index}</span>
                <span>{portal.eyebrow}</span>
              </div>
              <div className="portal-card__body">
                <h3>{portal.title}</h3>
                <p>{portal.text}</p>
              </div>
              <span className="portal-card__action">
                {portal.action}
                <span aria-hidden="true">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="chronicle-feature chronicle-feature--vael section-shell" aria-labelledby="chronicle-title">
        <div className="chronicle-feature__ornament" aria-hidden="true">
          <span />
          <span />
          <span />
          <div className="vael-signal">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="chronicle-feature__content">
          <p className="kicker">Ato II · Sessão 11</p>
          <h2 id="chronicle-title">O Guardião que não esqueceu.</h2>
          <p>
            Vael Karun despertou. O grupo já alcançou o Nível -1, enfrentou o Guardião de Pedra e
            começou a perceber que as memórias do castelo não se comportam como simples gravações.
          </p>
          <Link className="text-link text-link--large" href="/cronicas">
            Continuar pelas crônicas
          </Link>
        </div>
      </section>

      <section className="echoes section-shell" id="ecos" aria-labelledby="echoes-title">
        <div>
          <p className="kicker">Ecos de Injorn</p>
          <h2 id="echoes-title">O mundo também pode ser ouvido.</h2>
        </div>
        <div className="echoes__player" aria-label="Espaço reservado para trilhas de Injorn">
          <button type="button" aria-label="Reprodução será adicionada futuramente" disabled>
            <span aria-hidden="true">▶</span>
          </button>
          <div>
            <strong>Trilhas e leitmotivs</strong>
            <span>Estrutura pronta para receber as músicas oficiais.</span>
          </div>
          <Link className="echoes__duration" href="/ecos" aria-label="Abrir Ecos de Injorn">
            ↗
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__mark" aria-hidden="true">
          <span>I</span>
        </div>
        <p>INJORN</p>
        <span>Arquivo público do mundo</span>
      </footer>
    </main>
  );
}
