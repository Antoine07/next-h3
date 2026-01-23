import  ButtonLink  from "@/components/ButtonLink"

export default async function QuizDetailPage({ params }) {
  const { quizId } = await params;

  const res = await fetch(`${process.env.APP_URL}/api/quiz/${quizId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p>Quiz introuvable</p>;
  }

  const [quiz] = await res.json();

  return (
    <section className="stack">
      <h2 className="title">{quiz.title}</h2>
      <div className="actions">
      <ButtonLink
          href={`/quiz/${quizId}/question/1`}
          label="Commencer"
        />
      </div>
    </section>
  );
}
