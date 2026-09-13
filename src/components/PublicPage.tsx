import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";

interface PublicPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}

export function PublicPage({ eyebrow, title, intro, children }: PublicPageProps) {
  return (
    <main className="public-page">
      <SiteHeader />

      <header className="public-page__hero section-shell">
        <Link className="public-page__back" href="/">
          ← Voltar a Injorn
        </Link>
        <p className="kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        <div className="public-page__rule" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
      </header>

      <div className="public-page__content section-shell">{children}</div>

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
