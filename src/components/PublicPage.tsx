import Link from "next/link";
import type { ReactNode } from "react";
import { PageFoldRitual } from "@/components/PageFoldRitual";
import { SiteHeader } from "@/components/SiteHeader";

interface PublicPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}

function pageVariant(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function PublicPage({ eyebrow, title, intro, children }: PublicPageProps) {
  const variant = pageVariant(title);

  return (
    <main className={`public-page public-page--${variant}`}>
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
        <PageFoldRitual key={variant} />
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
