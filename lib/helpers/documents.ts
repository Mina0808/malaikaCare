// import { Prisma } from "@prisma/client";
// import { prisma } from "@/lib//prisma";

// export function createDocument(name:string, typeDoc:string, url:string, orderID:string, quoteID:number){
//   return prisma.$transaction(async (prisma) => {
//     const user = await prisma.documents.create({
//       data: {
//         nom:name,
//         type:typeDoc,
//         url:url,
//         orderId:orderID,
//         quoteQuoteId:quoteID
//       },
//     });
//   });
// }

// export function getDocumentsBy(filter: Prisma.DocumentsWhereInput){
//   return prisma.$transaction(async (prisma) => {
//     const docs = await prisma.documents.findMany({
//       where: filter,
//     });
//     return docs
//   });
// }

// export function updateDocuments(id: number, data: Prisma.DocumentsUpdateInput) {
//   return prisma.documents.update({ where: { id }, data });
// }

// export function deleteDocument(id: number) {
//   return prisma.documents.delete({ where: { id }});
// }