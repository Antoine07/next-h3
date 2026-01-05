export default function Section({ title, children }) {
    return (
      <section className="stack">
        <h2>{title}</h2>
        <div className="stack">{children}</div>
      </section>
    );
  }
  
