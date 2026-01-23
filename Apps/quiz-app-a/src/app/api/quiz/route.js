import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // connexion à la base de données

/**
 * GET /api/quiz
 */
export async function GET() {
  try {
    const rows = await db.query(
      `
      SELECT 
        q.*,
        s.score
      FROM quiz q
      LEFT JOIN score s ON s.quiz_id = q.id
      `
    );

    return NextResponse.json(rows[0]);
  } catch (e) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

}
