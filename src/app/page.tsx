import Link from "next/link";
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

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__ambient" aria-hidden="true">
          <div className="hero__ring hero__ring--outer" />
          <div className="hero__ring hero__ring--inner" />
          <div className="hero__axis hero__axis--vertical" />
          <div className="hero__axis hero__axis--horizontal" />
          <div className="hero__diamond" />
        </div>

        <p className="kicker">Arquivo público do universo</p>
        <h1 id="hero-title">INJORN</h1>
        <p className="hero__statement">
          Um mundo que não é apenas lido. É observado, descoberto e explorado.
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

      <section className="manifesto section-shell" aria-labelledby="manifesto-title">
        <div className="section-number">01</div>
        <div className="manifesto__content">
          <p className="kicker">Princípio de navegação</p>
          <h2 id="manifesto-title">Em Injorn, a interface faz parte da descoberta.</h2>
          <p>
            Elementos importantes reagem porque carregam significado. Uma arma pode revelar sua
            história. Um brasão pode abrir uma casa. Um lugar pode conduzir a outra parte do mundo.
            Nada precisa piscar apenas para chamar atenção.
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
            O conteúdo é separado por origem: registro oficial, fato observado, descoberta do grupo
            ou rumor. Assim, propaganda e verdade nunca precisam fingir ser a mesma coisa.
          </p>
        </header>

        <div className="portal-grid">
          {portals.map((portal) => (
            <Link className="portal-card" id={portal.id} key={portal.id} href={portal.href}>
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

      <section className="chronicle-feature section-shell" aria-labelledby="chronicle-title">
        <div className="chronicle-feature__ornament" aria-hidden="true">
          <span />
          <span />
          <span />
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
