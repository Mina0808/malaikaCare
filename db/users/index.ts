import { Prisma} from "@prisma/client";
import { cache } from "react";
import { prisma } from "@/lib//prisma";
import { Country } from 'country-state-city';

export async function findClientBy(filter: Prisma.ClientWhereUniqueInput) {
  return prisma.client.findUniqueOrThrow({
    where: filter,
  });
}

export async function findProfessionalBy(filter: Prisma.ProfessionalWhereUniqueInput) {
  return prisma.professional.findUniqueOrThrow({
    where: filter,
  });
}

export const  findProfessionalById = cache(async (id: string) => {
  const user = await findProfessionalBy({ id });
  return user;
});

export const  findClientById = cache(async (id: string) => {
  const user = await findClientBy({ id });
  return user;
});

// export function registerUser({ "company": companyName, "indic":callingCode, "country":country, "lastName":lastName, "firstName":firstName, ...payload }: any) {
//   country = Country.getCountryByCode(country)
//   delete payload["indic"]
//   console.log(payload)
//   return prisma.$transaction(async (prisma) => {
//     let idClient = "PA"
//     if (companyName){
//       idClient = "PR"
//     }
//     idClient+=lastName.substring(0,2).toUpperCase()+firstName.substring(0,1).toUpperCase()
//     const nbClient = (await prisma.user.count({where:{role: "INDIVIDUAL"}})+1).toString()
//     for (let i = 0; i < 4 - nbClient.length; i++){
//       idClient+="0"
//     }
//     idClient+=nbClient
//     const user = await prisma.user.create({
//       data: {
//         ...payload,
//         firstName:firstName,
//         lastName:lastName,
//         passwordToken: { create: {} },
//         company: {
//           create: companyName  ? { name: companyName } : undefined,
//         },
//         role: companyName  ? "ENTERPRISE":"INDIVIDUAL",
//         groups:["PACKAGE","QUOTE","ORDER" ],
//         callingCode: callingCode.substring(callingCode.indexOf("+")),
//         status:"INACTIF",
//         country:country.name,
//         id:idClient
//       },
//     });
    
//     console.log("in register : " , user)
//     return [user];
//   });
// }

export async function updateClient(id: string, data: Prisma.ClientUpdateInput) {
  return prisma.client.update({ where: { id }, data });
}

export async function updateProfessional(id: string, data: Prisma.ProfessionalUpdateInput) {
  return prisma.professional.update({ where: { id }, data });
}

export async function listBackofficeUsers(page: number = 1) {
  return prisma.$transaction(async (prisma) => {
    const users = await prisma.professional.findMany({
      orderBy: { createdAt: "asc" },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.professional.count();
    const totalPages = Math.ceil(totalCount / 10);

    return {
      users,
      totalPages,
    };
  });
}

export async function listClient(page: number = 1) {
  return prisma.$transaction(async (prisma) => {
    const users = await prisma.client.findMany({
      orderBy: { createdAt: "asc" },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.client.count();
    const totalPages = Math.ceil(totalCount / 10);

    return {
      users,
      totalPages,
    };
  });
}
