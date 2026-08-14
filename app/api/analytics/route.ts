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
  });

  const getTotal = (inv: (typeof invoices)[number]) =>
    inv.items.reduce((sum, item) => sum + item.qty * item.rate, 0);

  // Revenue trend - last 7 months (only Paid invoices)
  const now = new Date();
  const months: { month: string; revenue: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLabel = d.toLocaleDateString("en-US", { month: "short" });
    const monthRevenue = invoices
      .filter((inv) => {
        const invDate = new Date(inv.createdAt);
        return (
          inv.status === "Paid" &&
          invDate.getMonth() === d.getMonth() &&
          invDate.getFullYear() === d.getFullYear()
        );
      })
      .reduce((sum, inv) => sum + getTotal(inv), 0);

    months.push({ month: monthLabel, revenue: monthRevenue });
  }

  // Top clients by total billed (all invoices, any status)
  const clientTotals = new Map<string, number>();
  invoices.forEach((inv) => {
    const current = clientTotals.get(inv.client.name) || 0;
    clientTotals.set(inv.client.name, current + getTotal(inv));
  });

  const topClients = Array.from(clientTotals.entries())
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  // This month stats
  const thisMonthRevenue = months[months.length - 1]?.revenue || 0;
  const lastMonthRevenue = months[months.length - 2]?.revenue || 0;
  const growthRate =
    lastMonthRevenue > 0
      ? (((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1)
      : "0";

  const activeClients = await prisma.client.count({ where: { userId } });

  const overdueAmount = invoices
    .filter((inv) => inv.status === "Overdue")
    .reduce((sum, inv) => sum + getTotal(inv), 0);
  const overdueCount = invoices.filter((inv) => inv.status === "Overdue").length;

  return NextResponse.json({
    revenueData: months,
    topClients,
    thisMonthRevenue,
    growthRate,
    activeClients,
    overdueAmount,
    overdueCount,
  });
}