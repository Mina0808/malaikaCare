// import { PublicationType } from "@prisma/client";
// import { prisma } from "../prisma";

// export async function listCallsForExpressionOfInterest(userId: string) {
//   return await prisma.publication.findMany({
//     where: {
//       type: PublicationType.CALL_FOR_EXPRESSION_OF_INTEREST,
//       company: {
//         userId: userId,
//       },
//     },
//   });
// }

// export async function AllCallsForExpressionOfInterest(
//   userId: string,
//   filter?: any,
//   page:number = 1,
// ) {
//   const take = 10;
//   const skip = (page - 1) * take;
//   const callForExpressionOfInterest = await prisma.publication.findMany({
//     where: {
//       type: PublicationType.CALL_FOR_EXPRESSION_OF_INTEREST,
//       company: {
//         userId: userId,
//       },
//       ...filter,
//     },
//     skip: skip,
//     take: take,

//   });

//   const totalCount = await prisma.publication.count({
//     where: {
//       type: PublicationType.CALL_FOR_EXPRESSION_OF_INTEREST,
//       company: {
//         userId: userId,
//       },
//       ...filter,
//     },
//   });

//   const totalPages = Math.ceil(totalCount / take);


//   return {callForExpressionOfInterest, totalPages};
// }