"use server"
import { Prisma } from "@prisma/client";
import { cache } from "react";
import invariant from "tiny-invariant";
import { prisma } from "@/lib//prisma";
//import { createPasswordResetToken } from "./password-reset-tokens";
import * as bcrypt from "bcrypt"

export async function findUserBy(filter: Prisma.UserWhereUniqueInput) {
  return prisma.user.findUniqueOrThrow({
    where: filter,
  });
}

export const  findUserById = cache(async (id: string) => {
  const user = await findUserBy({ id });
  return user;
});

export async function registerUser({ "lastName":lastName, "firstName":firstName, "password":password, "password_confirmation":password_confirmation, ...payload }: any) {
  payload["callingCode"]=payload?.indic
  delete payload["indic"]
  console.log(payload)
  return prisma.$transaction(async (prisma) => {
    let idClient = "PA-"
    idClient+=firstName.substring(0,2).toUpperCase()+lastName.substring(0,1).toUpperCase()
    const nbClient = (await prisma.user.count({where:{role: {in: ["INDIVIDUAL"]}}})+1).toString()
    for (let i = 0; i < 4 - nbClient.length; i++){
      idClient+="0"
    }
    idClient+=nbClient
    console.log(idClient)
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        ...payload,
        firstName:firstName,
        lastName:lastName,
        password:encryptedPassword,
        passwordToken: { create: {} },
        role: "INDIVIDUAL",
        status:"ACTIF",
        id:idClient,
      },
    });
    console.log("in register : " , user)
    return [user];
  });
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  return prisma.user.update({ where: { id }, data });
}

export async function listBackofficeUsers(page: number = 1) {
  return prisma.$transaction(async (prisma) => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      where: { NOT: { role: {in: ["INDIVIDUAL"]} } },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.user.count({
      where: { NOT: { role: {in: ["INDIVIDUAL"]} } },
    });
    const totalPages = Math.ceil(totalCount / 10);

    return {
      users,
      totalPages,
    };
  });
}

export async function listClient(page: number = 1) {
  return prisma.$transaction(async (prisma) => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      where: { role: {in: ["INDIVIDUAL"] } },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.user.count({
      where: { role: {in: ["INDIVIDUAL"] } },
    });
    const totalPages = Math.ceil(totalCount / 10);

    return {
      users,
      totalPages,
    };
  });
}

export async function listIndividualClient(page: number = 1) {
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

export async function deleteUser(id:string){
  return prisma.$transaction(async (prisma) => {
    await prisma.user.delete({where: { id: id }})
  })
}
