import { Prisma} from "@prisma/client";
import { cache } from "react";
import invariant from "tiny-invariant";
import { prisma } from "@/lib//prisma";
import { Country } from 'country-state-city';

export function findUserBy(filter: Prisma.UserWhereUniqueInput) {
  return prisma.user.findUniqueOrThrow({
    where: filter,
  });
}

export const findUserById = cache(async (id: string) => {
  const user = await findUserBy({ id });
  return user;
});

export function registerUser({ "company": companyName, "indic":callingCode, "country":country, "lastName":lastName, "firstName":firstName, ...payload }: any) {
  country = Country.getCountryByCode(country)
  delete payload["indic"]
  console.log(payload)
  return prisma.$transaction(async (prisma) => {
    let idClient = "PA"
    if (companyName){
      idClient = "PR"
    }
    idClient+=lastName.substring(0,2).toUpperCase()+firstName.substring(0,1).toUpperCase()
    const nbClient = (await prisma.user.count({where:{role: "INDIVIDUAL"}})+1).toString()
    for (let i = 0; i < 4 - nbClient.length; i++){
      idClient+="0"
    }
    idClient+=nbClient
    const user = await prisma.user.create({
      data: {
        ...payload,
        firstName:firstName,
        lastName:lastName,
        passwordToken: { create: {} },
        company: {
          create: companyName  ? { name: companyName } : undefined,
        },
        role: companyName  ? "ENTERPRISE":"INDIVIDUAL",
        groups:["PACKAGE","QUOTE","ORDER" ],
        callingCode: callingCode.substring(callingCode.indexOf("+")),
        status:"INACTIF",
        country:country.name,
        id:idClient
      },
    });
    
    console.log("in register : " , user)
    return [user];
  });
}

export function updateUser(id: string, data: Prisma.UserUpdateInput) {
  return prisma.user.update({ where: { id }, data });
}

export function listBackofficeUsers(page: number = 1) {
  return prisma.$transaction(async (prisma) => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      where: { NOT: { role: {in: ["INDIVIDUAL", "ENTERPRISE"]} } },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.user.count({
      where: { NOT: { role: {in: ["INDIVIDUAL", "ENTERPRISE"]} } },
    });
    const totalPages = Math.ceil(totalCount / 10);

    return {
      users,
      totalPages,
    };
  });
}

export function listClient(page: number = 1) {
  return prisma.$transaction(async (prisma) => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      where: { role: {in: ["INDIVIDUAL", "ENTERPRISE"] } },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.user.count({
      where: { role: {in: ["INDIVIDUAL", "ENTERPRISE"] } },
    });
    const totalPages = Math.ceil(totalCount / 10);

    return {
      users,
      totalPages,
    };
  });
}

export function listIndividualClient(page: number = 1) {
  return prisma.$transaction(async (prisma) => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      where: { role: "INDIVIDUAL" },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.user.count({
      where: { role: "INDIVIDUAL" },
    });
    const totalPages = Math.ceil(totalCount / 10);

    return {
      users,
      totalPages,
    };
  });
}

export function deleteUser(id:string){
  return prisma.$transaction(async (prisma) => {
    await prisma.user.delete({where: { id: id }})
  })
}
