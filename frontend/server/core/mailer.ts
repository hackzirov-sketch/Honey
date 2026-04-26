import nodemailer from "nodemailer";
import { config } from "./config";

export async function sendVerificationEmail(email: string, code: string) {
  if (!config.smtp.host || !config.smtp.user || !config.smtp.pass) {
    console.log(`[email:dev] ${email} verification code: ${code}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });

  await transporter.sendMail({
    from: config.smtp.from,
    to: email,
    subject: "Honey email verification",
    text: `Tasdiqlash kodi: ${code}`,
  });
}
