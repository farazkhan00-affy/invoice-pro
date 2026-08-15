import { prisma } from "./prisma";

export async function createNotification(userId: string, message: string) {
  await prisma.notification.create({
    data: { userId, message },
  });
}