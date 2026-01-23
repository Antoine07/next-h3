"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";

const answerSchema = z.object({
  selected: z.number(),
});

export default function QuestionClient({
  quizId,
  index,
  question,
  choices,
  score,
}) {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState(null);

  const nextScore = Number(score) + (isCorrect ? 1 : 0);

  function handleClick(e) {
    const result = answerSchema.safeParse({ selected });

    if (!result.success) {
      e.preventDefault();
      setError("Veuillez sélectionner une réponse avant de continuer.");
    }
  }

  return (
    <section className="quiz">
      <h2 className="quiz-title">Question {index}</h2>
      <p className="quiz-question">{question.label}</p>

      <ul className="quiz-choices">
        {choices.map((choice) => (
          <li key={choice.id}>
            <label className="choice">
              <input
                type="radio"
                name="choice"
                className="choice-input"
                checked={choice.id === selected}
                onChange={() => {
                  setSelected(choice.id);
                  setIsCorrect(choice.is_correct);
                  setError(null);
                }}
              />

              <span className="choice-radio">
                <span className="choice-radio-dot" />
              </span>

              <span className="choice-label">{choice.label}</span>
            </label>
          </li>
        ))}
      </ul>

      {error && <p className="quiz-error">{error}</p>}

      <div className="quiz-footer">
        <Link
          href={{
            pathname: `/quiz/${quizId}/question/${Number(index) + 1}`,
            query: { score: nextScore },
          }}
          className="quiz-next"
          onClick={handleClick}
        >
          Question suivante
        </Link>
      </div>
    </section>
  );
}
