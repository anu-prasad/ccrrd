import db from "@/lib/db"; // MySQL connection
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // ✅ Save to DB
    const [result] = await db.execute(
      `INSERT INTO contact (name, email, message) VALUES (?, ?, ?)`,
      [name, email, message]
    );

    // ✅ Setup Gmail SMTP
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    // ✅ Build email content
    const mailContent = `
New Contact Message

Name: ${name}
Email: ${email}

Message:
${message}
`;

    // ✅ Send email
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL, // send to yourself
      subject: `New Contact Message from ${name}`,
      text: mailContent,
    });

    return new Response(
      JSON.stringify({ success: true, id: result.insertId }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /contact:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM contact ORDER BY created_at DESC"
    );
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
