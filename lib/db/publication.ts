// // import {
// //   CompanyDocumentType,
// //   PublicationStatus,
// //   PublicationType,
// //   SubscriptionStatus,
// // } from '@prisma/client'
// // import { prisma } from '../prisma'

// // export function getAllPublished(searchParams: Record<string, any>) {
// //   const activityKind = searchParams.activityKind;
// //   const activityName = searchParams.activityName;
// //   let profileIds = searchParams.profileIds;
// //   if (profileIds && !Array.isArray(profileIds)) {
// //     profileIds = [profileIds];
// //   }
// //   if (profileIds) {
// //     profileIds = profileIds.map((id: string) => parseInt(id));
// //   }
// //   const type = searchParams.type;
// //   return prisma.publication.findMany({
// //     orderBy: {
// //       publicationDate: "desc",
// //     },
// //     include: {
// //       activity: true,
// //       company: {
// //         include: { documents: { where: { type: CompanyDocumentType.LOGO } } },
// //       },
// //       callForBids: true,
// //       callForExpressionOfInterest: true,
// //     },
// //     where: {
// //       status: {
// //         in: [
// //           PublicationStatus.VERIFIED,
// //           PublicationStatus.REVIEWING_CANDIDATES,
// //           PublicationStatus.AWARDED,
// //           PublicationStatus.REVIEW_REJECTED,
// //                   ],
// //       },
// //       publicationDate: {
// //         lte: new Date(),
// //       },
// //       company: {
// //         subscription: {
// //           status: SubscriptionStatus.ACTIVE,
// //         },
// //         ...(searchParams.company
// //           ? {
// //               name: {
// //                 contains: searchParams.company,
// //                 mode: "insensitive",
// //               },
// //             }
// //           : {}),
// //       },
// //       ...(activityKind
// //         ? {
// //             activity: {
// //               kind: activityKind,
// //             },
// //           }
// //         : {}),
// //       ...(activityName
// //         ? {
// //             activity: {
// //               name: activityName,
// //             },
// //           }
// //         : {}),
// //       ...(profileIds
// //         ? {
// //             company: {
// //               profileId: {
// //                 in: profileIds,
// //               },
// //             },
// //           }
// //         : {}),
// //       ...(type
// //         ? {
// //             type: type,
// //           }
// //         : {}),
// //     },
// //   });
// // }

// export async function getAllPublished(
//   searchParams: Record<string, any>,
//   page: number = 1,
// ) {
//   const activityKind = searchParams.activityKind
//   const activityName = searchParams.activityName
//   let profileIds = searchParams.profileIds
//   const type = searchParams.type

//   // Parse profileIds if necessary
//   if (profileIds && !Array.isArray(profileIds)) {
//     profileIds = [profileIds]
//   }
//   if (profileIds) {
//     profileIds = profileIds.map((id: string) => parseInt(id))
//   }

//   const take = 10 // Number of items per page
//   const skip = (page - 1) * take

//   const whereClause = {
//     status: {
//       in: [
//         PublicationStatus.VERIFIED,
//         PublicationStatus.REVIEWING_CANDIDATES,
//         PublicationStatus.AWARDED,
//         PublicationStatus.REVIEW_REJECTED,
//       ],
//     },
//     publicationDate: {
//       lte: new Date(),
//     },
//     company: {
//       subscription: {
//         status: SubscriptionStatus.ACTIVE,
//       },
//       ...(searchParams.company
//         ? {
//             name: {
//               contains: searchParams.company,
//               mode: 'insensitive',
//             },
//           }
//         : {}),
//     },
//     ...(activityKind
//       ? {
//           activity: {
//             kind: activityKind,
//           },
//         }
//       : {}),
//     ...(activityName
//       ? {
//           activity: {
//             name: activityName,
//           },
//         }
//       : {}),
//     ...(profileIds
//       ? {
//           company: {
//             profileId: {
//               in: profileIds,
//             },
//           },
//         }
//       : {}),
//     ...(type
//       ? {
//           type: type,
//         }
//       : {}),
//   }

//   const publications = await prisma.publication.findMany({
//     orderBy: {
//       publicationDate: 'desc',
//     },
//     include: {
//       activity: true,
//       company: {
//         include: { documents: { where: { type: CompanyDocumentType.LOGO } } },
//       },
//       callForBids: true,
//       callForExpressionOfInterest: true,
//     },
//     where: {
//       status: {
//         in: [
//           PublicationStatus.VERIFIED,
//           PublicationStatus.REVIEWING_CANDIDATES,
//           PublicationStatus.AWARDED,
//           PublicationStatus.REVIEW_REJECTED,
//         ],
//       },
//       publicationDate: {
//         lte: new Date(),
//       },
//       company: {
//         subscription: {
//           status: SubscriptionStatus.ACTIVE,
//         },
//         ...(searchParams.company
//           ? {
//               name: {
//                 contains: searchParams.company,
//                 mode: 'insensitive',
//               },
//             }
//           : {}),
//       },
//       ...(activityKind
//         ? {
//             activity: {
//               kind: activityKind,
//             },
//           }
//         : {}),
//       ...(activityName
//         ? {
//             activity: {
//               name: activityName,
//             },
//           }
//         : {}),
//       ...(profileIds
//         ? {
//             company: {
//               profileId: {
//                 in: profileIds,
//               },
//             },
//           }
//         : {}),
//       ...(type
//         ? {
//             type: type,
//           }
//         : {}),
//     },
//     skip: skip,
//     take: take,
//   })

//   const totalCount = await prisma.publication.count({
//     where: {
//       status: {
//         in: [
//           PublicationStatus.VERIFIED,
//           PublicationStatus.REVIEWING_CANDIDATES,
//           PublicationStatus.AWARDED,
//           PublicationStatus.REVIEW_REJECTED,
//         ],
//       },
//       publicationDate: {
//         lte: new Date(),
//       },
//       company: {
//         subscription: {
//           status: SubscriptionStatus.ACTIVE,
//         },
//         ...(searchParams.company
//           ? {
//               name: {
//                 contains: searchParams.company,
//                 mode: 'insensitive',
//               },
//             }
//           : {}),
//       },
//       ...(activityKind
//         ? {
//             activity: {
//               kind: activityKind,
//             },
//           }
//         : {}),
//       ...(activityName
//         ? {
//             activity: {
//               name: activityName,
//             },
//           }
//         : {}),
//       ...(profileIds
//         ? {
//             company: {
//               profileId: {
//                 in: profileIds,
//               },
//             },
//           }
//         : {}),
//       ...(type
//         ? {
//             type: type,
//           }
//         : {}),
//     },
//   })

//   const totalPages = Math.ceil(totalCount / take)

//   return { publications, totalPages }
// }

// export async function listPublications(
//   type: PublicationType,
//   page: number = 1,
//   filter?: any,
// ) {
//   return prisma.$transaction(async (prisma) => {
//     const publications = await prisma.publication.findMany({
//       include: { company: true },
//       where: { type, status: { not: PublicationStatus.DRAFT }, ...filter },
//       skip: (page - 1) * 10,
//       take: 10,
//     })

//     const totalCount = await prisma.publication.count({
//       where: { type, status: { not: PublicationStatus.DRAFT }, ...filter },
//     })
//     const totalPages = Math.ceil(totalCount / 10)
//     return { publications, totalPages }
//   })
// }

// export async function allPublications(
//   type: PublicationType,
//   filter?: any,
// ) {
//   return prisma.$transaction(async (prisma) => {
//     const publications = await prisma.publication.findMany({
//       include: { activity:true, company: {include:{user:true}} },
//       where: { type, status: { not: PublicationStatus.DRAFT }, ...filter },
//     })

//     return publications
//   })
// }
