import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const rating = formData.get('rating');
    const feedback = formData.get('feedback');
    const file = formData.get('file') as File | null;

    const attachments = [];

    if (file && file.name) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Feedback Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `💬 New Feedback (Rating: ${rating}/5)`,
      html: `
        <h3>🌟 New Feedback Received</h3>
        <p><strong>Rating:</strong> ${rating} / 5</p>
        <p><strong>Message:</strong></p>
        <p>${feedback}</p>
      `,
      attachments, // ✅ includes uploaded file
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return NextResponse.json(
      { success: false, message: 'Email failed to send' },
      { status: 500 }
    );
  }
}
