import db from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ Get all projects
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM projects ORDER BY created_at DESC");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Add a new project
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, applyDate, description, details, status, participants, location, duration, category } = body;

    await db.query(
      "INSERT INTO projects (title, applyDate, description, details, status, participants, location, duration, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, applyDate, description, details, status, participants, location, duration, category]
    );

    return NextResponse.json({ success: true, message: "Project added successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
