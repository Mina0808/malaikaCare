"use server"

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findUserBy(filter: Prisma.UserWhereUniqueInput) {
  return prisma.user.findUniqueOrThrow({
    where: filter,
  });
}

export async function findPassword(id:string){
  return prisma.user.findUniqueOrThrow({
    where:{id}
  })
}

export async function updatePwd(id:string, password:string){
  return prisma.user.update({
    where:{id},
    data:{password}
  })
}

export async function emailValid(email:string){
  const mail = await prisma.user.findUnique({
    where: {email}
  })
  if (mail)
    return false
  else
    return true
}

export async function findUserById(id: string) {
  const user = await findUserBy({ id });
  return user;
};

export async function findUserByMail(email: string) {
  return prisma.user.findUnique({
    where: {email},
  });
};

export async function findBeneficiariesByUser(id:string){
  const beneficiaries = await prisma.otherContact.findMany({
    where: {beneficiaryOfId:id}
  })
  return beneficiaries
}

export async function findEmergencyContact(id: string) {
  const emergency = await prisma.otherContact.findFirst({
    where: { emergencyOfId: id }
  })
  return emergency;
};

export async function findEmergencyContactById(id: string) {
  const emergency = await prisma.otherContact.findFirst({
    where: { id }
  })
  return emergency;
};

export async function findBeneficiaryById(id: string) {
  const emergency = await prisma.otherContact.findFirst({
    where: { id }
  })
  return emergency;
};

export async function findBenefactor(userId: string, firstName:string, lastName:string) {
  const benefactor = await prisma.otherContact.findFirst({
    where: { beneficiaryOfId: userId, firstName, lastName }
  })
  return benefactor;
};
export async function findBenefactors(userId: string) {
  const benefactor = await prisma.otherContact.findMany({
    where: { beneficiaryOfId: userId }
  })
  return benefactor;
};

export async function findBenefactorById(id: string) {
  const benefactor = await prisma.otherContact.findFirst({
    where: { id }
  })
  return benefactor;
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
    const user = await prisma.user.findUnique({
      where: { id: request.userId }
    })
    userRequest.set(request.id, user)
  });
  return userRequest
}

export async function findRequestsByUser(user: any, page: number = 1, filter?:string) {
  return prisma.$transaction(async (prisma) => {
    const requests = await prisma.request.findMany({
      where: { userId: user.id, status:filter },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.user.count({
      where: { NOT: { role: { in: ["INDIVIDUAL"] } } },
    });
    const totalPages = Math.ceil(totalCount / 10);

    return {
      requests,
      totalPages,
    };
  })
}

export async function findBeneficiaryByRequest(beneficiaryId:string){
  const beneficiary = await prisma.otherContact.findUnique({
    where:{id:beneficiaryId}
  })
  return beneficiary
}

export async function findUserByRequest(userId:string){
  const user = await prisma.user.findUnique({
    where:{id:userId}
  })
  return user
}

export async function findDocumentsByRequest(id:number){
  const documents = await prisma.documents.findMany({
    where:{requestId:id}
  })
  return documents
}

export async function listClients() {
  const clients = await prisma.user.findMany({
    where: {
      role: { in: ["INDIVIDUAL"] },
      status: "ACTIF"
    },
  })
  return clients
}

// export async function findUsers (query?: string) {
//   if (query){
//     const [firstNamePart, lastNamePart] = query.split(' ');
//     if (firstNamePart && lastNamePart) {
//       const users = await prisma.user.findMany({
//         where: {
//           AND: [
//             {
//               firstName: {
//                 contains: firstNamePart,
//                 mode: 'insensitive', // Insensible à la casse
//               },
//             },
//             {
//               lastName: {
//                 contains: lastNamePart,
//                 mode: 'insensitive',
//               },
//             },
//           ],
//         },
//       });
//       return users;
//     }
//     else{
//       const users = await prisma.user.findMany({
//         where: {
//           OR: [
//             {
//               firstName: {
//                 contains: query,
//                 mode: 'insensitive', // Insensible à la casse
//               },
//             },
//             {
//               lastName: {
//                 contains: query,
//                 mode: 'insensitive',
//               },
//             },
//           ],
//         },
//       });
//       return users;
//     }
//   }
//   else{
//     const users = await prisma.user.findMany()

//       return users;
//   }
// };

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  return await prisma.user.update({ where: { id }, data });
}

export async function updateRequest(id: number, data: Prisma.RequestUpdateInput) {
  return await prisma.request.update({ where: { id }, data });
}

export async function updateOtherContact(id: string, data: Prisma.OtherContactUpdateInput){
  return await prisma.otherContact.update({ where: { id }, data });
}

export async function createUser(data: Prisma.UserCreateInput) {
  return await prisma.user.create({ data });
}

export async function createRequest(data: Prisma.RequestCreateInput) {
  return await prisma.request.create({ data });
}

export async function createOtherContact(data: Prisma.OtherContactCreateInput){
  return await prisma.otherContact.create({ data });
}

export async function addBenefactor(data: Prisma.OtherContactCreateInput){
  return await createOtherContact({
    ...data,
    type:"BENEFACTOR"
  })
}

export async function createEmergencyContact(data: Prisma.OtherContactCreateInput){
  return await createOtherContact({
    ...data,
    type:"EMERGENCY"
  })
}

// export async function createClient(data: Prisma.OtherContactCreateInput) {
//   return await prisma.otherContact.create({ data });
// }

export async function nbClient() {
  return prisma.$transaction(async (prisma) => {

    const totalCount = await prisma.user.count({
      where: { role: "INDIVIDUAL"},
    });

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

export async function nbReceivedQuotes() {
  return prisma.$transaction(async (prisma) => {

    const totalCount = await prisma.request.count({
      where: { type: "QUOTE", status: "RECEIVED" },
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
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      where: { NOT: { role: { in: ["INDIVIDUAL"] } } },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.user.count({
      where: { NOT: { role: { in: ["INDIVIDUAL"] } } },
    });
    const totalPages = Math.ceil(totalCount / 10);

    return {
      users,
      totalPages,
    };
  });
}

export async function findCustomers(page: number = 1, filter?:string) {
  return prisma.$transaction(async (prisma) => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      where: { role: { in: ["INDIVIDUAL"] }, status:filter },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.user.count({
      where: { role: { in: ["INDIVIDUAL"] } },
    });
    const totalPages = Math.ceil(totalCount / 10);

    return {
      users,
      totalPages,
    };
  });
}

export async function findRequests(page: number = 1, filter?:string) {
  return prisma.$transaction(async (prisma) => {
    const request = await prisma.request.findMany({
      where:{status:filter},
      orderBy: { date: "asc" },
      skip: (page - 1) * 10,
      take: 10,
    });

    const totalCount = await prisma.user.count({});
    const totalPages = Math.ceil(totalCount / 10);

    return {
      request,
      totalPages,
    };
  });
}
