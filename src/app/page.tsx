import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

const portals = [
  {
    id: "mundo",
    index: "I",
    eyebrow: "Atlas",
    title: "O Mundo",
    text: "Reinos, cidades, fronteiras e lugares que já fazem parte do conhecimento dos jogadores.",
    action: "Explorar o mundo",
  },
  {
    id: "personagens",
    index: "II",
    eyebrow: "Nomes",
    title: "Personagens",
    text: "Figuras conhecidas, títulos, alianças e rastros deixados por quem move a história de Injorn.",
    action: "Conhecer personagens",
  },
  {
    id: "cronicas",
    index: "III",
    eyebrow: "Memória",
    title: "Crônicas",
    text: "A campanha registrada como capítulos de uma história, preservando apenas o que já foi revelado em jogo.",
    action: "Ler as crônicas",
  },
  {
    id: "arquivo",
    index: "IV",
    eyebrow: "Documentos",
    title: "Arquivo",
    text: "Cartas, decretos, artefatos, símbolos e registros encontrados durante a jornada.",
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
          <Link className="primary-link" href="#mundo">
            <span>Entrar em Injorn</span>
            <span aria-hidden="true">↓</span>
          </Link>
          <Link className="text-link" href="#cronicas">
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
            A estrutura abaixo já é definitiva o bastante para crescer sem depender da arte final de
            nenhum personagem.
          </p>
        </header>

        <div className="portal-grid">
          {portals.map((portal) => (
            <article className="portal-card" id={portal.id} key={portal.id}>
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
            </article>
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
          <p className="kicker">Crônicas</p>
          <h2 id="chronicle-title">A história cresce depois de cada sessão.</h2>
          <p>
            O site registra apenas o que já pode ser visto pelos jogadores. Bastidores, segredos e
            planejamento continuam fora daqui.
          </p>
          <Link className="text-link text-link--large" href="#cronicas">
            Ver estrutura das crônicas
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
          <span className="echoes__duration">—:—</span>
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
