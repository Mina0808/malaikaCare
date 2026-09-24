import { prisma } from "@/lib/prisma";

// export function createPasswordResetToken(userId: string) {
//   const result = prisma.passwordToken.create({
//     data: {
//       user: { connect: { id: userId } },
//     },
//   });
//   console.log("result : ",result);
//   return result
// }

// export function findByTokenAndEmail(token: string, email: string) {
//   return prisma.passwordToken.findUnique({
//     include: { user: true },
//     where: {
//       user: { email, verifiedAt: { not: null } },
//       token,
//     },
//   });
// }

// export function findByEmail(token: string, email: string) {
//   return prisma.passwordToken.findFirst({
//     include: { user: true },
//     where: {
//       user: { email, verifiedAt: { not: null } },
//     },
//   });
// }

// export function deleteExpired() {
//   return prisma.passwordToken.deleteMany({
//     where: {
//       createdAt: {
//         lte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
//       },
//     },
//   });
// }

// export function setUserPassword(
//   token: string,
//   userId: string,
//   password: string,
// ) {
//   return prisma.$transaction([
//     prisma.user.update({
//       where: { id: userId },
//       data: { password },
//     }),
//     prisma.passwordToken.delete({
//       where: { token },
//     }),
//   ]);
// }

// export function setUserPasswordNoToken(
//   userId: string,
//   password: string,
// ) {
//   return prisma.$transaction([
//     prisma.user.update({
//       where: { id: userId },
//       data: { password },
//     }),
//   ]);
// }
