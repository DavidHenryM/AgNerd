"use server"

import { BrevoClient } from "@getbrevo/brevo";
import { EmailOptions } from './email';

export async function sendEmail(options: EmailOptions) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured.");
  }

  const senderEmail = process.env.EMAIL_FROM;
  if (!senderEmail) {
    throw new Error("EMAIL_FROM is not configured.");
  }

  const client = new BrevoClient({
    apiKey,
  });

  await client.transactionalEmails.sendTransacEmail({
    subject: options.subject,
    textContent: options.text,
    sender: {
      email: senderEmail,
      name: process.env.EMAIL_FROM_NAME || undefined,
    },
    to: [
      {
        email: options.to,
        name: options.name || undefined,
      },
    ],
  });
}
