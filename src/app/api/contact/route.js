import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Handle POST requests to /api/contact
export async function POST(request) {
  try {
    // Parse the JSON body from the request
    const { fullName, email, phone, message } = await request.json();

    // Validate the incoming data (optional but recommended)
    if (!fullName || !email) {
      return NextResponse.json({ message: 'Full name and email are required.' }, { status: 400 });
    }

    // Configure the Nodemailer transporter using environment variables.
    // Use an "App Password" for Gmail for security.
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like 'Outlook', 'SendGrid', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
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

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return a success response
    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email. Please try again.' }, { status: 500 });
  }
}
