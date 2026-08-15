import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";
import { createNotification } from "@/app/lib/notifications";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const invoice = await prisma.invoice.findFirst({
    where: { id, userId: session.user.id },
    include: { client: true, items: true },
  });

  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  return NextResponse.json(invoice);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await req.json();

  const existing = await prisma.invoice.findFirst({
    where: { id, userId: session.user.id },
  });

  const invoice = await prisma.invoice.updateMany({
    where: { id, userId: session.user.id },
    data: { status },
  });

  if (existing && status === "Paid" && existing.status !== "Paid") {
    await createNotification(session.user.id, `Invoice ${existing.number} marked as paid`);
  }

  return NextResponse.json(invoice);
}