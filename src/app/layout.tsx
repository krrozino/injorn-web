import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { InjornAmbientEffects } from "@/components/InjornAmbientEffects";
import { InjornLivingLayer } from "@/components/InjornLivingLayer";
import { InjornRouteTransition } from "@/components/InjornRouteTransition";
import { SevenGatesMenu } from "@/components/SevenGatesMenu";
import "./globals.css";
import "./interaction.css";
import "./pages.css";
import "./lore.css";
import "./expanded-content.css";
import "./audit-fixes.css";
import "./injorn-identity.css";
import "./home-v2.css";
import "./route-transitions.css";
import "./ritual-interactions.css";
import "./origin-burst.css";
import "./migarazur-seal-fix.css";
import "./living-layer.css";
import "./seven-gates.css";
import "./route-compass.css";
import "./identity-expansion.css";
import "./deep-rituals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Injorn",
    template: "%s — Injorn",
  },
  description: "Arquivo público e interativo do universo de Injorn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>
        <InjornAmbientEffects />
        <InjornLivingLayer />
        <SevenGatesMenu />
        <InjornRouteTransition />
        {children}
      </body>
    </html>
  );
}
