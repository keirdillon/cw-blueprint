import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { status, notes, contactedAt, confirmedAt } = body;

    const data: Record<string, unknown> = {};
    if (status !== undefined) data.status = status;
    if (notes !== undefined) data.notes = notes;
    if (contactedAt !== undefined) data.contactedAt = contactedAt;
    if (confirmedAt !== undefined) data.confirmedAt = confirmedAt;

    const registration = await prisma.registration.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(registration);
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json(
      { error: "Failed to update registration." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.registration.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { error: "Failed to delete registration." },
      { status: 500 }
    );
  }
}
