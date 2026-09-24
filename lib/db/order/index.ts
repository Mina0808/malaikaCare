// import { Prisma } from "@prisma/client";
// import { cache } from "react";
// import { prisma } from "@/lib//prisma";

// export function findOrderBy(filter: Prisma.OrderWhereUniqueInput) {
//   return prisma.orders.findUniqueOrThrow({
//     where: filter,
//   });
// }

// export const findOrderById = cache(async (id: string) => {
//   const order = await findOrderBy({ id });
//   return order;
// });

// export function newOrder({...payload }: any) {
//   return prisma.$transaction(async (prisma) => {
//     const order = await prisma.orders.create({
//       data: {
//         ...payload,
//         status: "En attente de réception",
//       },
//     });
//     return order
//   });
// }

// export function updateOrder(id: string, data: Prisma.OrdersUpdateInput) {
//   return prisma.orders.update({ where: { id }, data });
// }

// export function listOrdersBy(filter: Prisma.OrdersWhereInput) {
//   return prisma.$transaction(async (prisma) => {
//     const deliveries = await prisma.orders.findMany({
//         where: filter ,
//       });
//     return deliveries;
//   });
// }

// export function listOrders() {
//   return prisma.$transaction(async (prisma) => {
//     const deliveries = await prisma.orders.findMany();
//     return deliveries;
//   });
// }

// export function listOrdersByUser(userID:string) {
//   return prisma.$transaction(async (prisma) => {
//     const deliveries = await prisma.orders.findMany({
//       where: {customerId:userID} ,
//     });
//   return deliveries;
//   });
// }

// export function deleteOrder(id:string){
//   return prisma.$transaction(async (prisma) => {
//     await prisma.orders.delete({where: { id: id }})
//   })
// }
