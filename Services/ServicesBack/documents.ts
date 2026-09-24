'use server'
import { prisma } from "@/lib/prisma"

export const addDocuments = async (files:any[], userId:string, requestId:number, target?:string)=>{
  console.log("add bd ", files)
    return await prisma.documents.createMany({
        data: files.map((item) => ({
          name: item.name,
          type: item.type,
          userId,
          requestId,
          targetPage: target,
        })),
        skipDuplicates: true,
      })
    
}

export const deleteDocuments = async (files:any[],target:string)=>{
  console.log("delete bd", files)
  files.map(async(item)=>{
    await prisma.documents.deleteMany({
      where:{name:item.name,type:item.type,targetPage:target}
    })
  })
    
}

export const getDocumentsByPage = async(targetPage?:string)=>{
    return await prisma.documents.findMany({
        where:{targetPage:targetPage}
    })
}