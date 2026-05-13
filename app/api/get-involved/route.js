import db from "@/lib/db"; 
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, fullName, email, phone, location, extraFields } = body;

    await db.query(
      `INSERT INTO involvement (type, fullName, email, phone, location, extraFields) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [type, fullName, email, phone, location, JSON.stringify(extraFields)]
    );

    // ✅ Setup transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    // ✅ Build email based on type
    let extraContent = "";
    if (type === "volunteer") {
      extraContent = `
Education: ${extraFields.education || "N/A"}
`;
    } else if (type === "contribute") {
      extraContent = `
Organization: ${extraFields.organization || "N/A"}
Partnership Type: ${extraFields.partnershipType || "N/A"}
Project Details: ${extraFields.projectDetails || "N/A"}
`;
    } else if (type === "voice") {
      extraContent = `
Idea: ${extraFields.idea || "N/A"}
Category: ${extraFields.category || "N/A"}
Impact: ${extraFields.impact || "N/A"}
`;
    }

    const mailContent = `
New Involvement Submission

Type: ${type}

Name: ${fullName}
Email: ${email}
Phone: ${phone}
Location: ${location}

${extraContent}
`;

    await transporter.sendMail({
      from: `"Involvement Portal" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Involvement: ${type}`,
      text: mailContent,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("DB/Error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
