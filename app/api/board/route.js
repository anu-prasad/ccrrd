import db from "@/lib/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

// --- POST (Insert) ---
export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const designation = formData.get("designation");
    const positionvalue = parseInt(formData.get("positionvalue"), 10);
    const file = formData.get("image");

    if (!name || !designation || !positionvalue || !file) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filename = Date.now() + "-" + file.name;
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    const imagePath = `/uploads/${filename}`;

    await db.query(
      "UPDATE boardMembers SET positionvalue = positionvalue + 1 WHERE positionvalue >= ?",
      [positionvalue]
    );

    await db.query(
      "INSERT INTO boardMembers (name, designation, image, positionvalue) VALUES (?, ?, ?, ?)",
      [name, designation, imagePath, positionvalue]
    );

    return NextResponse.json({ success: true, message: "Board member added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- GET (List) ---
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM boardMembers ORDER BY positionvalue ASC");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- DELETE (Remove) ---
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing member ID" }, { status: 400 });
    }

    // First get positionvalue of deleted member
    const [rows] = await db.query("SELECT positionvalue FROM boardMembers WHERE id = ?", [id]);
    if (rows.length === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }
    const deletedPosition = rows[0].positionvalue;

    // Delete member
    await db.query("DELETE FROM boardMembers WHERE id = ?", [id]);

    // Shift remaining members up
    await db.query(
      "UPDATE boardMembers SET positionvalue = positionvalue - 1 WHERE positionvalue > ?",
      [deletedPosition]
    );

    return NextResponse.json({ success: true, message: "Board member deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
