// import {
//   PaymentMethod,
//   PaymentStatus,
//   Subscription,
//   SubscriptionStatus,
// } from "@prisma/client";
// import invariant from "tiny-invariant";
// import { prisma } from "../prisma";
// import { saveFile } from "../upload";

// export async function listSubscriptions(filter: any, page: number = 1) {
//   return prisma.$transaction(async (prisma) => {
//     const result = await prisma.subscription.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         company: {
//           include: {
//             user: true,
//           },
//         },
//       },
//       where: {
//         ...filter,
//       },
//       skip: (page - 1) * 10,
//       take: 10,
//     });

//     const totalCount = await prisma.subscription.count({
//       where: { ...filter },
//     });
//     const totalPages = Math.ceil(totalCount / 10);

//     return {
//       subscriptions: result,
//       totalPages: totalPages,
//     };
//   });
// }

// // export async function allSubscriptions(filter: any) {
// //   return prisma.$transaction(async (prisma) => {
// //     const result = await prisma.subscription.findMany({
// //       orderBy: {
// //         createdAt: "desc",
// //       },
// //       include: {
// //         company: {
// //           include: {
// //             user: true,
// //           },
// //         },
// //       },
// //       where: {
// //         ...filter,
// //       },
// //     });
// //     return  result;
// //   });
// // }
// export async function allSubscriptions(filter: any) {
//   const result = await prisma.subscription.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//     include: {
//       company: {
//         include: {
//           user: true,
//         },
//       },
//     },
//     where: {
//       ...filter,
//     },
//   });
//   return result;
// }

// export async function getSubscription(id: string) {
//   const subscription = await prisma.subscription.findUniqueOrThrow({
//     where: { id: id },
//     include: {
//       company: {
//         include: {
//           activities: true,
//           user: true,
//         },
//       },
//     },
//   });
//   return subscription;
// }

// export async function updateSubscription(id: string, payload: any) {
//   const subscription = await prisma.subscription.update({
//     where: { id: id },
//     data: payload,
//     include: {
//       company: {
//         include: {
//           user: true,
//         },
//       },
//     },
//   });
//   return subscription;
// }

// export async function latestSubscriptionPayment(subscriptionId: string) {
//   const payment = await prisma.payment.findFirstOrThrow({
//     where: {
//       subscriptionId: subscriptionId,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   return payment;
// }

// export async function upsertPayment(
//   subscription: Subscription,
//   proof: File,
//   method: PaymentMethod,
// ) {
//   const fileName = await saveFile(proof);
//   const payment = await prisma.$transaction(async (prisma) => {
//     await prisma.subscription.update({
//       where: { id: subscription.id },
//       data: { status: SubscriptionStatus.PENDING_PAYMENT_VERIFICATION },
//     });
//     const payment = await prisma.payment.upsert({
//       where: { subscriptionId: subscription.id },
//       create: {
//         subscription: { connect: { id: subscription.id } },
//       },
//       update: {
//         status: PaymentStatus.PENDING,
//         rejectionNote: null,
//       },
//       include: {
//         subscription: true,
//       },
//     });
//     await prisma.proofOfPayment.create({
//       data: {
//         method,
//         fileName: fileName,
//         payment: { connect: { id: payment.id } },
//       },
//     });
//     return payment;
//   });
//   return payment;
// }

// export async function activateSubscription(paymentId: string) {
//   const payment = await prisma.payment.findUniqueOrThrow({
//     where: { id: paymentId },
//     include: {
//       subscription: {
//         include: {
//           company: {
//             include: {
//               activities: true,
//             },
//           },
//         },
//       },
//       proofsOfPayment: true,
//     },
//   });
//   const company = payment.subscription.company;
//   invariant(company, "Company not found");
//   return await prisma.$transaction(async (prisma) => {
//     await updateSubscription(payment.subscription.id, {
//       status: SubscriptionStatus.ACTIVE,
//     });
//     await prisma.procurementPlan.upsert({
//       create: {
//         year: 2024,
//         company: {
//           connect: { id: company.id },
//         },
//       },
//       update: {},
//       where: { year_companyId: { year: 2024, companyId: company.id } },
//     });
//     return await prisma.payment.update({
//       where: { id: paymentId },
//       data: {
//         status: PaymentStatus.VERIFIED,
//       },
//       include: {
//         subscription: {
//           include: {
//             company: {
//               include: {
//                 user: true,
//               },
//             },
//           },
//         },
//         proofsOfPayment: true,
//       },
//     });
//   });
// }

// export async function listPayments(filter: any, page: number = 1) {
//   return prisma.$transaction(async (prisma) => {
//     const payments = await prisma.payment.findMany({
//       include: {
//         subscription: {
//           include: {
//             company: {
//               include: {
//                 user: true,
//               },
//             },
//           },
//         },
//         proofsOfPayment: true,
//       },
//       where: {
//         ...filter,
//       },
//       skip: (page - 1) * 10,
//       take: 10,
//     });

//     const totalCount = await prisma.payment.count({ where: { ...filter } });
//     const totalPages = Math.ceil(totalCount / 10);
//     return { payments, totalPages };
//   });
// }

// export async function allPayments(filter: any) {
//     const payments = await prisma.payment.findMany({
//       include: {
//         subscription: {
//           include: {
//             company: {
//               include: {
//                 user: true,
//                 subscription:true
//               },
//             },
//           },
//         },
//         proofsOfPayment: true,
//       },
//       where: {
//         ...filter,
//       },
//     });

//     return payments ;

// }

// export async function getPayment(id: string) {
//   const subscription = await prisma.payment.findUniqueOrThrow({
//     where: { id: id },
//     include: {
//       subscription: {
//         include: {
//           company: {
//             include: {
//               activities: true,
//               user: true,
//             },
//           },
//         },
//       },
//       proofsOfPayment: { orderBy: { createdAt: "desc" } },
//     },
//   });
//   return subscription;
// }

// export async function updatePayment(id: string, payload: any) {
//   const payment = await prisma.payment.update({
//     where: { id: id },
//     data: payload,
//     include: {
//       subscription: {
//         include: {
//           company: {
//             include: {
//               user: true,
//             },
//           },
//         },
//       },
//       proofsOfPayment: true,
//     },
//   });
//   return payment;
// }

// export async function exportSubscription(filter: any) {
//   return prisma.$transaction(async (prisma) => {
//     const result = await prisma.subscription.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         company: {
//           include: {
//             user: true,
//           },
//         },
//       },
//       where: {
//         ...filter,
//       },
//     });



//     return {subscriptions: result};
//   });
// }
