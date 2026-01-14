import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const { quizId } = await params;

    if (!quizId) {
      return NextResponse.json({ error: "Invalid quizId" }, { status: 400 });
    }
    const [ rows ] = await db.query(
      `
      SELECT *
      FROM question
      WHERE quiz_id = ?
      `,
      [ quizId ]
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