import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req) {
  try {

    // 1. Supprimer les scores du quiz
    await db.query(
      `
      DELETE FROM score
      `
    );

    // 2. Réouvrir le quiz
    await db.query(
      `
      UPDATE quiz
      SET status = 'open'
      `
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
