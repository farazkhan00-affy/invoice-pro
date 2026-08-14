import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      avatarUrl: true,
      businessName: true,
      businessAddress: true,
      currency: true,
      taxRate: true,
    },
  });

  return NextResponse.json(user);
}

export async function PATCH(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, businessName, businessAddress, currency, taxRate } = await req.json();

    const data: {
      name?: string;
      businessName?: string;
      businessAddress?: string;
      currency?: string;
      taxRate?: number;
    } = {};
    if (name !== undefined) data.name = name;
    if (businessName !== undefined) data.businessName = businessName;
    if (businessAddress !== undefined) data.businessAddress = businessAddress;
    if (currency !== undefined) data.currency = currency;
    if (taxRate !== undefined) data.taxRate = taxRate;

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}