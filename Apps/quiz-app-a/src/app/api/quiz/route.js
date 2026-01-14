import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // connexion à la base de données

/**
 * GET /api/quiz
 */
export async function GET() {
    const rows = await db.query(
      `
      SELECT *
      FROM quiz
      `
    );

    return NextResponse.json(rows[0]);
 
}


/**
 * POST /api/quiz
 */
export async function POST(request) {
    const body = await request.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json( { error: "Invalid payload"}, { status: 400 } );
    }

    const result = await db.query(
      `INSERT INTO quiz (title, description) VALUES (?, ?)`,
      [title, description]
    );

    return NextResponse.json({ id: result[0].insertId }, { status: 201 });
 
}