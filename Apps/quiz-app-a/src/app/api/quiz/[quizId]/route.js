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
      SELECT id, user_id, title, description
      FROM quiz
      WHERE id = ?
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

export async function PUT(request, { params }) {
  const { quizId } = await params;


  if (!quizId) {
    return NextResponse.json({ error: `error ${quizId}` }, { status: 400 });
  }

  const { title, description } = await request.json();

  if (typeof title !== "string" || typeof description !== "string") {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  const [result] = await db.query(
    `
    UPDATE quiz
    SET title = ?, description = ?
    WHERE id = ?
    `,
    [title, description, quizId]
  );

  if (result.affectedRows === 0) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(_request, { params }) {
  try{
    const { quizId } = await params;

    if (!quizId) {
      return NextResponse.json({ error: `error ${quizId}` }, { status: 400 });
    }

    const [result] = await db.query(
      `
      DELETE FROM quiz
      WHERE id = ?
      `,
      [quizId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });

  }catch(e){
    return NextResponse.json({ error: "error server / MySQL" });
  }
}
