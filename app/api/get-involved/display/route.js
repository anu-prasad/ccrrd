import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(
      `SELECT 
        id, 
        type, 
        fullName, 
        email, 
        phone, 
        location, 
        extraFields, 
        created_at 
      FROM involvement 
      ORDER BY id DESC`
    );

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching form data:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
