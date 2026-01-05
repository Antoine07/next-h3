import QuizCard from "@/ui/QuizCard";
import Section from "@/components/Section";

export default async function QuizListPage() {

  const quizzes = await fetch("http://localhost:3000/api/quizzes", {
    cache: "no-store",
  }).then(r => r.json());


  return (
    <Section title="Liste des quiz">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quizId={quiz.id}
          title={quiz.title}
          description={quiz.description}
        />
      ))}
    </Section>
  );
}
