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

    // Send emails in background — don't block response
    Promise.all([
      sendConfirmationEmail(firstName, email),
      sendAdminNotification({ firstName, lastName, email, phone, office, startDate }),
    ]).catch((err) => console.error("Email send error:", err));

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
