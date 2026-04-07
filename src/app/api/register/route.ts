import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail, sendAdminNotification } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, office, startDate } = body;

    if (!firstName || !lastName || !email || !office) {
      return NextResponse.json(
        { error: "First name, last name, email, and office are required." },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.create({
      data: { firstName, lastName, email, phone, office, startDate },
    });

    // Send emails — must await on serverless so the runtime doesn't kill the process
    try {
      console.log("[register] Sending confirmation email to:", email);
      await sendConfirmationEmail(firstName, email);
      console.log("[register] Confirmation email sent");
    } catch (err) {
      console.error("[register] Confirmation email error:", err);
    }

    try {
      const adminEmailEnv = process.env.ADMIN_EMAIL || "";
      console.log("[register] ADMIN_EMAIL env:", adminEmailEnv);
      const adminList = adminEmailEnv.split(",").map((e) => e.trim()).filter(Boolean);
      console.log("[register] Sending admin notification to:", adminList);
      await sendAdminNotification({ firstName, lastName, email, phone, office, startDate, createdAt: registration.createdAt.toISOString() });
      console.log("[register] Admin notification sent");
    } catch (err) {
      console.error("[register] Admin notification error:", err);
    }

    return NextResponse.json(registration, { status: 201 });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Failed to create registration." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(registrations);
  } catch (err) {
    console.error("Fetch registrations error:", err);
    return NextResponse.json(
      { error: "Failed to fetch registrations." },
      { status: 500 }
    );
  }
}
