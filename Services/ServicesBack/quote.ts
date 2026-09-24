// "use server"
// import { Prisma, StatusQuote } from "@prisma/client";
// import { cache } from "react";
// import { prisma } from "@/lib//prisma";
// import { findUsers } from "./users";

// export async function findQuoteBy(filter: Prisma.QuoteWhereUniqueInput) {
//   return prisma.quote.findUniqueOrThrow({
//     where: filter,
//     include: {
//       supportingDocuments: true,
//     },
//   }
//   );
// }

// export const findQuoteById = cache(async (id: number) => {
//   const quote = await findQuoteBy({ id });
//   return {
//     ...quote,
//   }
// });


// export async function createQuote({ ...payload }: any, formData:any) {
//   return prisma.$transaction(async (prisma) => {
//     const quote = await prisma.quote.create({
//       data: {
//         ...payload,
//       },
//     });
//     return {
//       ...quote,
//     }
//   });
// }


// export async function updateQuote(id: number, data: any) {
//   console.log("update", id, data)
//     if (data?.supportingDocuments)
//       return prisma.$transaction(async (prisma) => {
//         const quote = await prisma.quote.update({
//           where: { id },
//           data: {
//             ...data,
//             supportingDocuments: {
//               upsert: {
//                 where: { id: data?.supportingDocuments?.id || 0 },
//                 update: {
//                   nom: data?.supportingDocuments?.nom,
//                   type: data?.supportingDocuments?.type,
//                 },
//                 create: {
//                   nom: data?.supportingDocuments?.nom,
//                   type: data?.supportingDocuments?.type,
//                 },
//               },
//             },
//           },
//           include: {
//             supportingDocuments: true,
//           },
//         });
//         return quote;
//       });
//     else
//       return prisma.$transaction(async (prisma) => {
//         const quote = await prisma.quote.update({
//           where: { id },
//           data: {
//             ...data,
//           }
//         });
//         return quote;
//       });
  
// }

// export async function listQuotes(page: number = 1) {
//   return prisma.$transaction(async (prisma) => {
//     const quotes = await prisma.quote.findMany({
//       orderBy: {
//         id: 'desc',
//       },
//       skip: (page - 1) * 100,
//       take: 100,
//     });
//     const totalCount = await prisma.quote.count();
//     const totalPages = Math.ceil(totalCount / 100);
//     return { quotes, totalPages }
//   });
// }

// export async function listAllQuotes() {
//   return prisma.$transaction(async (prisma) => {
//     const quotes = await prisma.quote.findMany({
//       orderBy: {
//         id: 'desc',
//       },
//     });

//     return quotes
//   });
// }

// export async function listQuotesBy(page: number = 1, filter: Prisma.QuoteWhereInput) {
//   return prisma.$transaction(async (prisma) => {
//     const quotes = await prisma.quote.findMany({
//       where: filter,
//       orderBy: {
//         id: 'desc',
//       },
//       skip: (page - 1) * 100,
//       take: 100,
//     });
//     const totalCount = await prisma.quote.count({
//       where: filter,
//     });
//     const totalPages = Math.ceil(totalCount / 100);
//     return { quotes, totalPages }
//   });
// }

// export async function listQuotesByUser(page: number = 1, userID: string) {
//   return prisma.$transaction(async (prisma) => {
//     const quotes = await prisma.quote.findMany({
//       where: { userId: userID },
//       orderBy: {
//         id: 'desc',
//       },
//       skip: (page - 1) * 100,
//       take: 100,
//     });
//     const totalCount = await prisma.quote.count({
//       where: { userId: userID },
//     });
//     const totalPages = Math.ceil(totalCount / 100);
//     console.log("response : ", quotes)
//     return { quotes, totalPages }
//   });
// }

// export async function allQuotesByUser(userID: string) {
//   return prisma.$transaction(async (prisma) => {
//     const quotes = await prisma.quote.findMany({
//       where: { userId: userID },
//       orderBy: {
//         id: 'desc',
//       },
//     });
//     return quotes
//   });
// }

// export async function deleteQuote(id: number) {
//   return prisma.$transaction(async (prisma) => {
//     await prisma.quote.delete({ where: { id } })
//   })
// }

// export async function countQuote(statusPackge?: StatusQuote) {
//   if (statusPackge)
//     return await prisma.quote.count({
//       where: { status: statusPackge }
//     })
//   else return await prisma.quote.count({
//     where: { NOT: { status: StatusQuote.CREATED } }
//   })
// }

// export async function countQuoteByUser(userId: string, statusPackge?: StatusQuote) {
//   if (statusPackge)
//     return await prisma.quote.count({
//       where: {
//         status: statusPackge,
//         userId: userId
//       }
//     })
//   else return await prisma.quote.count({
//     where: {
//       NOT: { status: StatusQuote.CREATED },
//       userId: userId
//     }
//   })
// }


// // export async function returnCorrection(id: number, correction: string) {
// //   console.log("in back")
// //   const pack = await prisma.quote.update({
// //     where: {
// //       id: id
// //     }, data: {
// //       status: StatusQuote.AWAITING_CORRECTION,
// //       correction_text: correction
// //     }
// //   })
// //   return pack
// // }

// export async function findlistQuotesByQuery(page: number = 1, query?: string) {
//   const users = await findUsers(query)
//   let usersId: string[] = []
//   users.map((item) => {
//     usersId.push(item.id)
//   })
//   const quotes = await prisma.quote.findMany({
//     where: {
//       userId: {
//         in: usersId, // Filtre pour récupérer les factures de ces utilisateurs
//       },
//     },
//     skip: (page - 1) * 100,
//     take: 100,
//   })

//   const totalCount = await prisma.quote.count({
//     where: { userId: { in: usersId }, },
//   });
//   const totalPages = Math.ceil(totalCount / 100);
//   return { quotes, totalPages }
// }