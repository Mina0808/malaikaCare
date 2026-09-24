// import { Prisma } from "@prisma/client";
// import { prisma } from "@/lib//prisma";
// import type { BadgeProps } from "@/components/badge";

// export function translateStatus(status: string): {
//   status: string;
//   color: BadgeProps["color"];
// } {
//   switch (status) {
//     case "Soumis":
//       return { status, color: "yellow" };
//     case "Vérifié":
//       return { status, color: "green" };
//     case "Retourné":
//       return { status, color: "red" };
//     default:
//       return { status, color: "gray" };
//   }
// }

// export function updatePayment(deliveryId:number, data: Prisma.PaymentUpdateInput){
//   return prisma.$transaction(async (prisma) => {
//   const payment = await prisma.payment.update({ where: { deliveryId:deliveryId }, data })
//   })
// }