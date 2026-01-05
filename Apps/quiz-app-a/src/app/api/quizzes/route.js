import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, title, description FROM quizzes"
    )

    return NextResponse.json(rows);
  } catch (error) {
    console.error(error)
    return NextResponse.json([], { status: 500 })
  }
}
