import ButtonLink from "@/components/ButtonLink";


export default function QuizCard({ title, description, quizId }) {
  return (
    <article className="stack">
      <h3>{title}</h3>
      <p>{description}</p>

      <div className="actions">
        <ButtonLink href={`/quiz/${quizId}`} label="Voir le détail" />
      </div>
    </article>
  );
}
