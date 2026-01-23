import QuizCard from "@/components/QuizCard";
import Section from "@/components/Section";

export default async function QuizListPage() {

  const res = await fetch(`${process.env.APP_URL}/api/quiz`, {
    cache: "no-store", // pas de cache
  });
  
  const quizzes = await res.json();

  return (
    <Section title="Liste des quiz">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quizId={quiz.id}
          title={quiz.title}
          description={quiz.description}
          status={quiz.status}
          score={quiz.score}
        />
      ))}
    </Section>
  );
}
