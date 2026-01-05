import { quizzes } from "@/data/quizzes";
import Link from "next/link";

export default async function QuizDetailPage({ params }) {
  const { id } = await params;

  const quiz = quizzes.find((q) => q.id === id);

  if (!quiz) {
    return <p>Quiz introuvable</p>;
  }

  return (
    <section className="stack">
      <h2 className="title">{quiz.title}</h2>
      <p className="subtitle">{quiz.description}</p>
      <div className="actions">
        <Link href="/quiz">← Retour à la liste</Link>
      </div>
    </section>
  );
}
