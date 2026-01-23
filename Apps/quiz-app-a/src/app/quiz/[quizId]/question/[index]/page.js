import QuestionClient from "@/components/QuestionClient";
import Score from "@/components/Score";

export default async function QuestionPage({ params, searchParams }) {
    const { index, quizId } = await params
    const { score } = await searchParams;

    const questionsRes = await fetch(
        `${process.env.APP_URL}/api/quiz/${quizId}/questions`,
        { cache: "no-store" }
    );

    if (!questionsRes.ok) {
        return <p>Questions introuvables</p>;
    }

    const questions = await questionsRes.json();
    const question = questions[index - 1];

    if (!question) {
        // enregistre le score et ferme le quiz 
        await fetch( `${process.env.APP_URL}/api/score`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quizId,
                score
            }),
        });

        return (
            <Score score={score} />
        )
    }

    const choicesRes = await fetch(
        `${process.env.APP_URL}/api/question/${question.id}/choices`,
        { cache: "no-store" }
    );

    const choices = choicesRes.ok ? await choicesRes.json() : [];

    return (
        <QuestionClient
            quizId={quizId}
            index={index}
            question={question}
            choices={choices}
            score={score ?? 0}
        />
    );
}