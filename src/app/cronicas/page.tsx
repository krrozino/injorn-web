import type { Metadata } from "next";
import { PublicPage } from "@/components/PublicPage";

export const metadata: Metadata = {
  title: "Crônicas",
};

export default function CronicasPage() {
  return (
    <PublicPage
      eyebrow="Memória da campanha"
      title="Crônicas"
      intro="Os acontecimentos das sessões transformados em capítulos consultáveis, sem expor nada que ainda não tenha sido revelado aos jogadores."
    >
      <div className="content-grid">
        <article className="content-card">
          <span className="content-card__index">01 · CAPÍTULOS</span>
          <h2>Registro por sessão</h2>
          <p>Cada sessão poderá se tornar uma crônica com título, resumo e consequências conhecidas.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">02 · CONTEXTO</span>
          <h2>Quem e onde</h2>
          <p>Personagens e locais envolvidos poderão ser conectados diretamente à crônica correspondente.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">03 · LINHA DO TEMPO</span>
          <h2>Ordem dos acontecimentos</h2>
          <p>A estrutura já prevê uma futura linha do tempo pública da campanha.</p>
        </article>
        <article className="content-card">
          <span className="content-card__index">04 · CONSEQUÊNCIAS</span>
          <h2>O que mudou</h2>
          <p>Decisões e acontecimentos podem atualizar o estado público de personagens, regiões e facções.</p>
        </article>
      </div>
    </PublicPage>
  );
}
