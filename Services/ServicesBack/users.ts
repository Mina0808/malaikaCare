"use server"

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findProfessionalBy(filter: Prisma.ProfessionalWhereUniqueInput) {
  return prisma.professional.findUniqueOrThrow({
    where: filter,
  });
}

export async function findClientBy(filter: Prisma.ClientWhereUniqueInput) {
  return prisma.client.findUniqueOrThrow({
    where: filter,
  });
}

export async function findPassword(id:string, role:string){
  if (role=="INDIVIDUAL")
  return prisma.client.findUniqueOrThrow({
    where:{id}
  })
  return prisma.professional.findUniqueOrThrow({
    where:{id}
  })
}

export async function updatePwd(id:string, password:string, role:string){
  if (role=="INDIVIDUAL")
  return prisma.client.update({
    where:{id},
    data:{password}
  })
  return prisma.professional.update({
    where:{id},
    data:{password}
  })
}

export async function emailValid(email:string, role:string){
  if (role=="INDIVIDUAL"){
    const mail = await prisma.client.findUnique({
    where: {email}
  })
  if (mail)
    return false
  else
    return true
  }
  const mail = await prisma.professional.findUnique({
    where: {email}
  })
  if (mail)
    return false
  else
    return true
}

export async function findUserById(id: string, role:string) {
  if (role=="INDIVIDUAL"){
    const user = await findClientBy({ id });
  return user;
  }
  const user = await findProfessionalBy({ id });
  return user;
};

export async function findUserByMail(email: string, role:string) {
  if (role=="INDIVIDUAL"){
    const user = await findClientBy({ email });
  return user;
  }
  const user = await findProfessionalBy({ email });
  return user;
};


export async function findRequestById(id:number){
  const request = await prisma.request.findUnique({
    where:{id}
  })
  return request
}

export async function findUsersByRequests(requests: any) {
  const userRequest = new Map<string, any>()
  requests.forEach(async (request: any) => {
    const user = await prisma.client.findUnique({
      where: { id: request.userId }
    })
    userRequest.set(request.id, user)
  });
  return userRequest
}

export async function findRequestsByUser(client: any, page: number = 1, filter?:string) {
  return prisma.$transaction(async (prisma) => {
    const requests = await prisma.request.findMany({
      where: { clientId: client.id, status:filter },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.request.count({
      where: { clientId: client.id, status:filter },
    });
    const totalPages = Math.ceil(totalCount / 10);

    return {
      requests,
      totalPages,
    };
  })
}

export async function findClientByRequest(clientId:string){
  const user = await prisma.client.findUnique({
    where:{id:clientId}
  })
  return user
}

export async function findDocumentsByRequest(id:number){
  const documents = await prisma.documents.findMany({
    where:{requestId:id}
  })
  return documents
}

export async function listClients(page: number = 1, filter?:string) {
  return prisma.$transaction(async (prisma) => {
  const clients = await prisma.client.findMany({
      orderBy: { createdAt: "asc" },
      where: { status:filter },
      skip: (page - 1) * 10,
      take: 10,
    });
  
    const totalCount = await prisma.client.count({
      where: { status:filter },
    });
    const totalPages = Math.ceil(totalCount / 10);

    return {
      clients,
      totalPages,
    };
  })
}

export async function listClientsByProfessionals(id:string, page: number = 1, filter?:string) {
  return prisma.$transaction(async (prisma) => {
  const clients = await prisma.client.findMany({
      orderBy: { createdAt: "asc" },
      where: { status:filter, professionalId: id},
      skip: (page - 1) * 10,
      take: 10,
    });
  
    const totalCount = await prisma.client.count({
      where: { status:filter },
    });
    const totalPages = Math.ceil(totalCount / 10);

    return {
      clients,
      totalPages,
    };
  })
}

export async function updateClient(id: string, data: Prisma.ClientUpdateInput) {
  return await prisma.client.update({ where: { id }, data });
}

export async function updateProfessional(id: string, data: Prisma.ProfessionalUpdateInput) {
  return await prisma.professional.update({ where: { id }, data });
}

export async function updateRequest(id: number, data: Prisma.RequestUpdateInput) {
  return await prisma.request.update({ where: { id }, data });
}

export async function createClient(data: Prisma.ClientCreateInput) {
  return await prisma.client.create({ data });
}

export async function createProfessional(data: Prisma.ProfessionalCreateInput) {
  return await prisma.professional.create({ data });
}

export async function createRequest(data: Prisma.RequestCreateInput) {
  return await prisma.request.create({ data });
}

export async function nbClient() {
  return prisma.$transaction(async (prisma) => {

    const totalCount = await prisma.client.count();
    return totalCount
  });
}
export async function nbQuotes() {
  return prisma.$transaction(async (prisma) => {

    const totalCount = await prisma.request.count({
      where: { type: "QUOTE",},
    });

    return totalCount
  });
}
export async function nbFinishedQuotes() {
  return prisma.$transaction(async (prisma) => {

    const totalCount = await prisma.request.count({
      where: { type: "QUOTE", status: "FINISHED" },
    });

    return totalCount
  });
}

export async function nbSubmittedQuotes() {
  return prisma.$transaction(async (prisma) => {

    const totalCount = await prisma.request.count({
      where: { type: "QUOTE", status: "SUBMITTED" },
    });

    return totalCount
  });
}

export async function nbInfos() {
  return prisma.$transaction(async (prisma) => {

    const totalCount = await prisma.request.count({
      where: { type: "INFORMATION" },
    });

    return totalCount
  });
}
export async function nbFinishedInfos() {
  return prisma.$transaction(async (prisma) => {

    const totalCount = await prisma.request.count({
      where: { type: "INFORMATION", status: "FINISHED" },
    });

    return totalCount
  });
}

export async function nbReceivedInfos() {
  return prisma.$transaction(async (prisma) => {

    const totalCount = await prisma.request.count({
      where: { type: "INFORMATION", status: "RECEIVED" },
    });

    return totalCount
  });
}

export async function nbSubmittedInfos() {
  return prisma.$transaction(async (prisma) => {

    const totalCount = await prisma.request.count({
      where: { type: "INFORMATION", status: "SUBMITTED" },
    });

    return totalCount
  });
}

export async function findBackofficeUsers(page: number = 1) {
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

export async function findProfessionals(page: number = 1, filter?:string) {
  if (filter){
    return prisma.$transaction(async (prisma) => {
    const professionals = await prisma.professional.findMany({
      where:{NOT :{role:filter}},
      orderBy: { createdAt: "asc" },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.professional.count();
    const totalPages = Math.ceil(totalCount / 10);

    return {
      professionals,
      totalPages,
    };
  });
  }
  else{
    return prisma.$transaction(async (prisma) => {
    const professionals = await prisma.professional.findMany({
      where:{NOT :{role:"ADMIN"}},
      orderBy: { createdAt: "asc" },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.professional.count();
    const totalPages = Math.ceil(totalCount / 10);

    return {
      professionals,
      totalPages,
    };
  });
  }
}

export async function findRequests(page: number = 1, filter?:string) {
  return prisma.$transaction(async (prisma) => {
    const request = await prisma.request.findMany({
      where:{status:filter},
      orderBy: { date: "asc" },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.request.count({
      where:{status:filter},
    });
    const totalPages = Math.ceil(totalCount / 10);

    return {
      request,
      totalPages,
    };
  });
}
