import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain =
  process.env.NEXT_PUBLIC_JAWARA_BASE_URL ?? "http://localhost:3000";

export const sendVerificationEmail = async (email, token) => {
  const confirmationLink = `${domain}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "Jawara <noreply@jawara-app.com>",
    to: email,
    subject: "🔐 Jawara - Confirm Your Email Address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #ff6f00; text-align: center;">Welcome to Jawara! 🎉</h2>
        <p>Hi there,</p>
        <p>Thank you for signing up for <strong>Jawara</strong>! To complete your registration and start learning Javanese in a fun way, please verify your email address by clicking the button below:</p>
        <p style="text-align: center;">
          <a href="${confirmationLink}" 
             style="background-color: #1e1e1e; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; display: inline-block; font-weight: bold;">
            Verify My Email
          </a>
        </p>
        <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
        <p style="word-wrap: break-word; font-size: 14px; color: #555;">${confirmationLink}</p>
        <hr style="border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #888; text-align: center;">If you didn't sign up for Jawara, you can safely ignore this email.</p>
      </div>
    `,
  });
};

export const sendResetPasswordEmail = async (email, token) => {
  const resetLink = `${domain}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "Jawara <noreply@jawara-app.com>",
    to: email,
    subject: "🔒 Jawara - Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #ff6f00; text-align: center;">Reset Your Password</h2>
        <p>Hi there,</p>
        <p>We received a request to reset your password for your <strong>Jawara</strong> account. Click the button below to reset your password:</p>
        <p style="text-align: center;">
          <a href="${resetLink}" 
             style="background-color: #1e1e1e; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; display: inline-block; font-weight: bold;">
            Reset My Password
          </a>
        </p>
        <p>If you did not request this, please ignore this email. Your password will not change unless you take action.</p>
        <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
        <p style="word-wrap: break-word; font-size: 14px; color: #555;">${resetLink}</p>
        <hr style="border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #888; text-align: center;">If you need further assistance, contact our support team.</p>
      </div>
    `,
  });
};
