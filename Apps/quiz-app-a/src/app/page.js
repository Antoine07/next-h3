import ButtonLink from "@/components/ButtonLink";

export default function Home() {
  return (
    <div className="hero">
      <section className="hero-card">
        <div className="pill">Quiz App !!!!!!!</div>
        <h1 className="title">Entraîne-toi avec des quiz simples</h1>
        <p className="subtitle">
          Réponds aux questions, valide à chaque étape et obtiens ton score final
          avec un petit feedback. Idéal pour réviser rapidement.
        </p>
        <div className="actions">
          <ButtonLink href="/quiz" label="Commencer un quiz" />
        </div>
      </section>
    </div>
  );
}
