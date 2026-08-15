import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { invoiceId } = await req.json();

    const invoice = await prisma.invoice.findFirst({
      where: { id: invoiceId, userId: session.user.id },
      include: { client: true, items: true, user: true },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const subtotal = invoice.items.reduce((sum, item) => sum + item.qty * item.rate, 0);
    const taxAmount = (subtotal * invoice.taxRate) / 100;
    const total = subtotal + taxAmount;

    const itemsHtml = invoice.items
      .map(
        (item) =>
          `<tr>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0;">${item.description}</td>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:right;">${item.qty}</td>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:right;">$${item.rate.toFixed(2)}</td>
            <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:right;">$${(item.qty * item.rate).toFixed(2)}</td>
          </tr>`
      )
      .join("");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#2563eb;">Invoice ${invoice.number}</h2>
        <p>Hi ${invoice.client.name},</p>
        <p>Here is your invoice from ${invoice.user.businessName || invoice.user.name}.</p>
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
          <thead>
            <tr style="background:#f1f5f9;">
              <th style="padding:8px;text-align:left;">Description</th>
              <th style="padding:8px;text-align:right;">Qty</th>
              <th style="padding:8px;text-align:right;">Rate</th>
              <th style="padding:8px;text-align:right;">Amount</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <p style="text-align:right;margin-top:16px;font-size:18px;font-weight:bold;">
          Total: $${total.toFixed(2)}
        </p>
        <p style="color:#64748b;font-size:13px;">
          Due date: ${new Date(invoice.dueDate).toLocaleDateString()}
        </p>
        <p style="margin-top:24px;color:#64748b;font-size:13px;">
          Sent via InvoicePro
        </p>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${invoice.user.businessName || invoice.user.name}" <${process.env.GMAIL_USER}>`,
      to: invoice.client.email,
      subject: `Invoice ${invoice.number} from ${invoice.user.businessName || invoice.user.name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}