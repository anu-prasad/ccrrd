import db from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ Get single project
export async function GET(req, context) {
  try {
    const { id } = context.params; // ✅ Fix here
    const [rows] = await db.query("SELECT * FROM projects WHERE id = ?", [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Update project
export async function PUT(req, context) {
  try {
    const { id } = context.params; // ✅ Fix here
    const body = await req.json();
    const { title, applyDate, description, details, status, participants, location, duration, category } = body;

    await db.query(
      "UPDATE projects SET title=?, applyDate=?, description=?, details=?, status=?, participants=?, location=?, duration=?, category=? WHERE id=?",
      [title, applyDate, description, details, status, participants, location, duration, category, id]
    );

    return NextResponse.json({ success: true, message: "Project updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Delete project
export async function DELETE(req, context) {
  try {
    const { id } = context.params; // ✅ Fix here
    await db.query("DELETE FROM projects WHERE id = ?", [id]);
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
