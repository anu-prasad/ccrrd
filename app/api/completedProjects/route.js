import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date");
    const location = formData.get("location");
    const beneficiaries = formData.get("beneficiaries");
    const status = formData.get("status");
    const highlights = formData.get("highlights");
    const file = formData.get("image");

    if (!file || !title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure folder exists
    const uploadDir = path.join(process.cwd(), "public/galleryProjects");
    await mkdir(uploadDir, { recursive: true });

    // Generate safe file path
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);

    // Save file
    await writeFile(filePath, buffer);

    // Save to DB (only filename, not full path)
    await db.query(
      `INSERT INTO completedProjects 
      (title, description, image, date, location, beneficiaries, status, highlights) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, filename, date, location, beneficiaries, status, highlights]
    );

    return NextResponse.json({ message: "Upload successful!" });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM completedProjects ORDER BY id DESC");

    // ✅ Prepend /galleryProjects/ to image field
    const formatted = rows.map((row) => ({
      ...row,
      image: `/galleryProjects/${row.image}`,
    }));

    return new Response(JSON.stringify(formatted), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch images" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}