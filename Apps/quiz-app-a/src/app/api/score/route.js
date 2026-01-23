import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // connexion à la base de données

export async function POST(req) {
    const { quizId, score, total } = await req.json();

    const [existing] = await db.query(
        `
      SELECT id
      FROM score
      WHERE quiz_id = ?
      LIMIT 1
      `,
        [quizId]
    );

    if (existing.length > 0) {
        return NextResponse.json(
            { error: "Score already exists" },
            { status: 409 }
        );
    }

    await db.query(
        `
      INSERT INTO score (quiz_id, user_id, score, total)
      VALUES (?, NULL, ?, ?)
      `,
        [quizId, score, total]
    );

    await db.query(
        `
        UPDATE quiz
        SET status = 'closed'
        WHERE id = ?
        `,
        [quizId]
    );

    return NextResponse.json({ success: true });
}

