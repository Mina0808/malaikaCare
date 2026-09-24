// import { CompanyDocumentType } from "@prisma/client";
// import { prisma } from "../prisma";
// import { saveFile } from "../upload";

// type Attachments = {
//   [key in CompanyDocumentType]: File;
// };

// export const DOCUMENTS = [
//   {
//     type: CompanyDocumentType.TAX_FILE,
//     label: "Document d'identification fiscale",
//   },
//   {
//     type: CompanyDocumentType.REGISTRATION_CERTIFICATE,
//     label: "Extrait de registre de commerce et de crédit mobilier",
//   },
//   {
//     type: CompanyDocumentType.BYLAWS,
//     label: "Statuts de l'entreprise",
//   },
//   {
//     type: CompanyDocumentType.SEARCH_PERMIT,
//     label: "Permis de recherche",
//   },
//   {
//     type: CompanyDocumentType.FINANCIAL_STATEMENTS,
//     label: "États financiers",
//     optional: true,
//   },
//   {
//     type: CompanyDocumentType.CERTIFICATE_OF_NON_BANKRUPTCY,
//     label: "Certificat de non faillite",
//     optional: true,
//   },
//   {
//     type: CompanyDocumentType.LOGO,
//     label: "Logo de l'entreprise",
//     optional: true,
//   },
// ];

// export async function upsertCompany(
//   userId: string,
//   { activityIds, ...payload }: any,
//   files: Attachments,
// ) {
//   const fileTypes = Object.keys(files) as CompanyDocumentType[];
//   const companyDocuments = await Promise.all(
//     fileTypes
//       .filter((type) => files[type].size > 0)
//       .map(async (type) => {
//         const fileName = await saveFile(files[type as CompanyDocumentType]);
//         return [type, fileName];
//       }),
//   );
//   return prisma.$transaction(async (prisma) => {
//     const company = await prisma.company.upsert({
//       where: { userId: userId },
//       update: {
//         ...payload,
//         userId: userId,
//         activities: { connect: activityIds.map((id: string) => ({ id })) },
//       },
//       create: {
//         ...payload,
//         userId: userId,
//         activities: { connect: activityIds.map((id: string) => ({ id })) },
//       },
//     });
//     const oldCompanyDocuments = await prisma.companyDocument.findMany({
//       where: {
//         companyId: company.id,
//         type: {
//           in: companyDocuments.map(([type]) => type) as CompanyDocumentType[],
//         },
//       },
//     });
//     await prisma.companyDocument.deleteMany({
//       where: {
//         id: {
//           in: oldCompanyDocuments.map((companyDocument) => companyDocument.id),
//         },
//       },
//     });

//     await prisma.companyDocument.createMany({
//       data: companyDocuments.map(([type, fileName]) => ({
//         type: type as CompanyDocumentType,
//         fileName: fileName,
//         companyId: company.id,
//       })),
//     });
//     return company;
//   });
// }

// export async function listCompanies(filter: any) {
//   const companies = await prisma.company.findMany({
//     include: {
//       user: true,
//       subscription: {
//         select: {
//           status: true,
//         },
//       },
//     },
//     where: {
//       ...filter,
//     },
//   });
//   return companies;
// }
