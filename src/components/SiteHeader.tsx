"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Mundo", href: "/#mundo" },
  { label: "Personagens", href: "/#personagens" },
  { label: "Crônicas", href: "/#cronicas" },
  { label: "Arquivo", href: "/#arquivo" },
  { label: "Ecos", href: "/#ecos" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.menuOpen = open ? "true" : "false";
    return () => {
      delete document.body.dataset.menuOpen;
    };
  }, [open]);

  return (
    <header className="site-header">
      <Link className="site-brand" href="/" aria-label="Injorn — início">
        <span className="site-brand__mark" aria-hidden="true">
          <span>I</span>
        </span>
        <span>INJORN</span>
      </Link>

      <nav className="desktop-nav" aria-label="Navegação principal">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="menu-trigger"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <div
        className={`mobile-menu ${open ? "mobile-menu--open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!open}
      >
        <div className="mobile-menu__ornament" aria-hidden="true" />
        <nav aria-label="Navegação móvel">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <p>Um mundo que se revela conforme é explorado.</p>
      </div>
    </header>
  );
}
