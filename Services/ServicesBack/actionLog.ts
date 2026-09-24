"use server"
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findActionsBy(filter: Prisma.ActionLogWhereInput) {
    return prisma.actionLog.findMany({
      where: filter,
    }
  );
  }

export async function findActionsByQuote(idQ: number){
    const action = await findActionsBy({ entityId:idQ })
    return action
}

export async function createActionLog(payload:any){
    return prisma.$transaction(async (prisma) => {
        const packge = await prisma.actionLog.create({
         data: {
            ...payload,
          },
       });
})
}