"use client";

import ButtonLink from "@/components/ButtonLink";

export default function QuizCard({ title, description, quizId, status, score }) {
  return (
    <article className="stack">
      <h3>{title}</h3>
      <p>{description}</p>

      <div className="actions">
        {status == "open" ? (
          <ButtonLink href={`/quiz/${quizId}`} label="Faire le quiz" />
        ) : (
          <button
            type="button"
            className="button disabled"
            disabled
            aria-disabled="true"
          >
            Quiz terminé score : {score}
          </button>
        )}
      </div>
    </article>
  );
}
