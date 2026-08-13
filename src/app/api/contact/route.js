import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { fullName, email, phone, message } = await request.json();

    if (!fullName || !email) {
      return NextResponse.json({ message: 'Full name and email are required.' }, { status: 400 });
    }

    const isProduction = process.env.NODE_ENV === 'production';
    const hasEmailConfig = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_RECEIVER);

    if (!isProduction && !hasEmailConfig) {
      console.warn('Local email preview mode: SMTP credentials missing. Form submission simulated successfully.');
      return NextResponse.json({
        message: 'Email sent successfully in local preview mode!',
        preview: true,
      }, { status: 200 });
    }

    if (!hasEmailConfig) {
      return NextResponse.json({ message: 'Email configuration is missing. Please configure SMTP credentials.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Contact Form Submission from ${fullName}`,
      html: `
        <p>You have received a new message from your contact form.</p>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email. Please try again.' }, { status: 500 });
  }
}
