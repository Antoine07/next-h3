import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const { quizId } = await params;

    if (!quizId) {
      return NextResponse.json({ error: "Invalid quizId" }, { status: 400 });
    }

    const [quizRows] = await db.query(
      `
      SELECT status
      FROM quiz
      WHERE id = ?
      `,
      [quizId]
    );

    if (quizRows[0].status !== "open") {
      return NextResponse.json(
        { error: "Quiz is closed" },
        { status: 403 }
      );
    }

    const [rows] = await db.query(
      `
      SELECT id, user_id, title, description
      FROM quiz
      WHERE id = ?
      `,
      [quizId]
    );

    const quiz = rows ?? null;

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("GET QUIZ ERROR:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
