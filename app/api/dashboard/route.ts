import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const invoices = await prisma.invoice.findMany({
    where: { userId },
    include: { client: true, items: true },
    orderBy: { createdAt: "desc" },
  });

  const clientCount = await prisma.client.count({ where: { userId } });

  const getTotal = (inv: (typeof invoices)[number]) =>
    inv.items.reduce((sum, item) => sum + item.qty * item.rate, 0);

  const totalRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + getTotal(inv), 0);

  const outstanding = invoices
    .filter((inv) => inv.status === "Pending" || inv.status === "Overdue")
    .reduce((sum, inv) => sum + getTotal(inv), 0);

  const outstandingCount = invoices.filter(
    (inv) => inv.status === "Pending" || inv.status === "Overdue"
  ).length;

  const recentInvoices = invoices.slice(0, 4).map((inv) => ({
    id: inv.id,
    number: inv.number,
    client: inv.client.name,
    amount: getTotal(inv),
    status: inv.status,
    date: inv.createdAt,
  }));

  return NextResponse.json({
    totalRevenue,
    outstanding,
    outstandingCount,
    clientCount,
    invoicesSent: invoices.length,
    recentInvoices,
  });
}