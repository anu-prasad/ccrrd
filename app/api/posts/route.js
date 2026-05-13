import { NextResponse } from 'next/server';
import db from '@/lib/db';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  // Always return latest 4 posts
  const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC LIMIT 3');
  return NextResponse.json(rows);
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get('title');
    const date = formData.get('date');
    const description = formData.get('description');
    const type = formData.get('type');
    const file = formData.get('image');

    let filename = null;
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      filename = Date.now() + '-' + file.name;
      const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
      await fs.writeFile(filepath, buffer);
    }

    // Insert new post
    await db.query(
      'INSERT INTO posts (title, image, date, description, type) VALUES (?, ?, ?, ?, ?)',
      [title, filename, date, description, type]
    );

    // Keep only latest 4 posts, delete older ones
    await db.query(`
      DELETE FROM posts 
      WHERE id NOT IN (
        SELECT id FROM (
          SELECT id FROM posts ORDER BY created_at DESC LIMIT 3
        ) as t
      )
    `);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await db.query('DELETE FROM posts WHERE id=?', [id]);
  return NextResponse.json({ success: true });
}
