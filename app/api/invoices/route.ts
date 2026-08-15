import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";
import { createNotification } from "@/app/lib/notifications";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    include: { client: true, items: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(invoices);
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { clientId, dueDate, taxRate, items } = await req.json();

    if (!clientId || !dueDate || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Client, due date, and at least one item are required" },
        { status: 400 }
      );
    }

    const count = await prisma.invoice.count({
      where: { userId: session.user.id },
    });
    const number = `INV-${String(count + 1).padStart(4, "0")}`;

    const invoice = await prisma.invoice.create({
      data: {
        number,
        dueDate: new Date(dueDate),
        taxRate: taxRate || 0,
        userId: session.user.id,
        clientId,
        items: {
          create: items.map((item: { description: string; qty: number; rate: number }) => ({
            description: item.description,
            qty: item.qty,
            rate: item.rate,
          })),
        },
      },
      include: { items: true, client: true },
    });

    await createNotification(session.user.id, `Invoice ${invoice.number} created for ${invoice.client.name}`);

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Create invoice error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}