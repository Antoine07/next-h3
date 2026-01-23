"use client";

import Link from "next/link";

export default function ({ score }) {

    return (
        <section className="quiz">
            <h2 className="quiz-title">Quiz terminé 🎉</h2>
            <p className="quiz-question">
                Votre score : {score}
            </p>

            <Link href="/quiz" className="quiz-next">
                Retour à la liste des quiz
            </Link>
        </section>
    )
}