import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(_request, { params }) {
  try {
    const { questionId } = await params;

    if (!questionId) {
      return NextResponse.json({ error: "Invalid questionId" }, { status: 400 });
    }
    const [ rows ] = await db.query(
      `
      SELECT *
      FROM choice
      WHERE question_id = ?
      `,
      [ questionId ]
    );

    const choice = rows ?? null;

    if (!choice) {
      return NextResponse.json({ error: "choice not found" }, { status: 404 });
    }

    return NextResponse.json(choice);
  } catch (error) {
    console.error("GET choice ERROR:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}