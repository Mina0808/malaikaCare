// import { Prisma } from "@prisma/client";
// import { prisma } from "../prisma";

// export async function listCompanies(filter: Prisma.CompanyWhereInput) {
//   const companies = await prisma.company.findMany({
//     orderBy: { createdAt: "asc" },
//     include: {
//       User: true,
//     },
//     where: {
//       ...filter,
//     },
//   });
//   return companies;
// }

// export async function updateCompany(id:string, name:string){
//   const companies = await prisma.company.update({where: {id}, data:{name:name}});
//   return companies;
// }
