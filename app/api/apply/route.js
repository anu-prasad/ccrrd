import db from "@/lib/db"; // MySQL connection
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      projectName,
      fullName,
      email,
      phone,
      qualification,
      university,
      experience,
      motivation,
      availability,
    } = body;

    // ✅ Insert into DB
    const [result] = await db.execute(
      `INSERT INTO application 
      (projectName, fullName, email, phone, qualification, university, experience, motivation, availability) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        projectName,
        fullName,
        email,
        phone,
        qualification,
        university,
        experience,
        motivation,
        availability,
      ]
    );

    // ✅ Send Email using Gmail SMTP
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    // Build email content
    const mailContent = `
New Project Application Received

Project: ${projectName}

Name: ${fullName}
Email: ${email}
Phone: ${phone}

Qualification: ${qualification}
University: ${university}
Experience: ${experience}

Motivation: ${motivation}
Availability: ${availability}
`;

    await transporter.sendMail({
      from: `"Application Portal" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL, 
      subject: `New Application for ${projectName}`,
      text: mailContent,
    });

    return new Response(
      JSON.stringify({ success: true, id: result.insertId }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /application:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM application ORDER BY created_at DESC"
    );
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
