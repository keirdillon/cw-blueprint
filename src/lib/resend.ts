import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "");
}

const FROM = "Blueprint Program <blueprint@mycoastalwealth.com>";

export async function sendConfirmationEmail(firstName: string, email: string) {
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "You're Registered — Coastal Blueprint",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #252f4a;">
        <div style="border-bottom: 2px solid #c9dce8; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="font-size: 24px; font-weight: 400; margin: 0;">Coastal Blueprint</h1>
          <p style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #6b95ba; margin: 4px 0 0 0;">Sales Training Program</p>
        </div>

        <p style="font-size: 17px; line-height: 1.7; margin-bottom: 20px;">
          Hi ${firstName},
        </p>

        <p style="font-size: 17px; line-height: 1.7; margin-bottom: 20px;">
          Thank you for registering for the <strong>Coastal Blueprint</strong> — our full 10-session sales training series designed for new advisors at Coastal Wealth.
        </p>

        <p style="font-size: 17px; line-height: 1.7; margin-bottom: 20px;">
          You're now confirmed for the complete series running <strong>April–June 2026</strong>. All sessions are delivered virtually, so you can participate from anywhere.
        </p>

        <p style="font-size: 17px; line-height: 1.7; margin-bottom: 20px;">
          Here's what to expect next:
        </p>

        <ul style="font-size: 17px; line-height: 1.7; margin-bottom: 30px; padding-left: 20px;">
          <li>Calendar invites for all 10 sessions will be sent to your email shortly</li>
          <li>Virtual access details (Zoom links) will be included in each calendar invite</li>
          <li>Session materials will be shared before each session</li>
        </ul>

        <p style="font-size: 17px; line-height: 1.7; margin-bottom: 30px;">
          We're excited to have you join the program. This series is built to give you the skills and confidence to hit the ground running.
        </p>

        <div style="border-top: 1px solid #e8e8e8; padding-top: 20px; margin-top: 30px;">
          <p style="font-size: 15px; line-height: 1.6; color: #5d7fa0; margin: 0;">
            Warm regards,<br />
            <strong style="color: #252f4a;">Kristin Dorm</strong><br />
            VP Training &amp; Development<br />
            Coastal Wealth
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendAdminNotification(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  office: string;
  startDate?: string;
}) {
  const adminEmailRaw = process.env.ADMIN_EMAIL || "";
  console.log("[resend] ADMIN_EMAIL raw value:", JSON.stringify(adminEmailRaw));
  const adminEmails = adminEmailRaw
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  console.log("[resend] Parsed admin emails:", adminEmails);

  if (adminEmails.length === 0) {
    console.warn("[resend] No admin emails found, skipping notification");
    return;
  }

  const adminDashboardUrl =
    process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/admin`
      : "https://blueprint.mycoastalwealth.com/admin";

  await getResend().emails.send({
    from: FROM,
    to: adminEmails,
    subject: `New Blueprint Registration: ${data.firstName} ${data.lastName}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #252f4a;">
        <h2 style="font-size: 20px; margin-bottom: 24px;">New Blueprint Registration</h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e8e8e8; font-weight: 600; width: 140px;">Name</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e8e8e8;">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e8e8e8; font-weight: 600;">Email</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e8e8e8;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e8e8e8; font-weight: 600;">Phone</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e8e8e8;">${data.phone || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e8e8e8; font-weight: 600;">Office</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e8e8e8;">${data.office}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e8e8e8; font-weight: 600;">Start Date</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e8e8e8;">${data.startDate || "—"}</td>
          </tr>
        </table>

        <a href="${adminDashboardUrl}" style="display: inline-block; background: #252f4a; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 14px; letter-spacing: 0.5px;">View Admin Dashboard →</a>
      </div>
    `,
  });
}
