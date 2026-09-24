"use server"
import { prisma } from "@/lib/prisma";
import { CustomError, z } from "@/lib/zod-fr";
import { parseWithZod } from "@conform-to/zod";
import { City } from 'country-state-city'

export async function listReferentials(type: string) {
  return await prisma.referentiel.findMany({
    where: { category: type },
    orderBy: { name: "asc" },
  });
}

// export async function mapReferentials(type:string){
//   const listRef = await listReferentials(type)
//   const refMap = new Map()
//     listRef?.map((item)=>{
//         refMap.set(item.value, item.label)
//     })
//     return refMap
// }

// export async function listReferentialsWithQuery(page: number, type: string, query?: string) {
//   if (query){
//     const ref = await prisma.referentiel.findMany({
//       where: {
//         category: type, label: {
//           contains: query,
//           mode: 'insensitive',
//         },
//       },
//       orderBy: { value: "asc" },
//       skip: (page - 1) * 100,
//       take: 100
//     });
  
//     const count = await prisma.referentiel.count({
//       where: {
//         type: type, label: {
//           contains: query,
//           mode: 'insensitive',
//         },
//       }
//     })
  
//     const pages = Math.ceil(count / 100)
  
//     return { ref, pages }
//   }
//   else{
//     const ref = await prisma.referentiel.findMany({
//       where: {
//         type: type
//       },
//       orderBy: { value: "asc" },
//       skip: (page - 1) * 100,
//       take: 100
//     });
  
//     const count = await prisma.referentiel.count({
//       where: {
//         type: type
//       }
//     })
  
//     const pages = Math.ceil(count / 100)
  
//     return { ref, pages }
//   }
// }

// export async function listReferentialsDeliveryWithQuery(page: number, type: string, query: string){
//   const ref = await prisma.referentiel.findMany({
//     where: {
//       OR: [{
//         type: type, label: {
//           contains: query,
//           mode: 'insensitive',
//         },
//       },
//       {
//         type: "DELIVERY_MODE", label: {
//           contains: query,
//           mode: 'insensitive',
//         },
//       }]
//     },
//     orderBy: { value: "asc" },
//     skip: (page - 1) * 100,
//     take: 100
//   });

//   const count = await prisma.referentiel.count({
//     where: {
//       type: type, label: {
//         contains: query,
//         mode: 'insensitive',
//       },
//     }
//   })

//   const pages = Math.ceil(count / 100)

//   return { ref, pages }
// }

// export async function listReferentialsDelivery(page: number, type: string){
//   const ref = await prisma.referentiel.findMany({
//     where: {
//       OR: [{
//         type: type
//       },
//       {
//         type: "DELIVERY_MODE"
//       }]
//     },
//     orderBy: { value: "asc" },
//     skip: (page - 1) * 100,
//     take: 100
//   });

//   const count = await prisma.referentiel.count({
//     where: {
//       OR: [{
//         type: type
//       },
//       {
//         type: "DELIVERY_MODE"
//       }]
//     }
//   })

//   const pages = Math.ceil(count / 100)

//   return { ref, pages }
// }

// export async function listCitiesReferentials(countryName: string) {
//   return await prisma.referentiel.findMany({
//     where: { type: 'CITY', value: countryName },
//     orderBy: { value: "asc" }
//   });
// }

// export async function deleteReferential(id: number, type: string) {
//   if (type === "COUNTRY") {
//     return prisma.$transaction(async (prisma) => {
//       const country = await prisma.referentiel.delete({ where: { id } })
//       await prisma.referentiel.deleteMany({ where: { value: country.label } })
//       return country
//     })
//   }
//   else {
//     if (type === "DELIVERY_MODE")
//       return prisma.$transaction(async (prisma) => {
//         const delMode = await prisma.referentiel.delete({ where: { id } })
//         await prisma.referentiel.deleteMany({ where: { type: "DELIVERY_COST", value: delMode.value } })
//         return delMode
//       })
//     else
//       return prisma.$transaction(async (prisma) => {
//         return await prisma.referentiel.delete({ where: { id } })
//       })
//   }
// }

// const updateSchema = z.object({
//   value: z.string(),
//   label: z.string(),
// });

// export async function editReferential(setting: any, formData: any, prev: any) {
//   try {
//     const submission = parseWithZod(formData, { schema: updateSchema });
//     if (submission.status !== "success") {
//       throw submission.error;
//     }
//     const user = await prisma.referentiel.update({
//       where: { id: setting.id },
//       data: {
//         ...submission.value,
//       },
//     });
//     if (prev.type === "COUNTRY") {
//       await prisma.referentiel.updateMany({
//         where: { value: prev.label },
//         data: { value: submission?.value.label }
//       });
//     }
//     return user
//   } catch (error) {
//     console.log({ error });
//     if (error instanceof z.ZodError) {
//       return error.format() as unknown as CustomError;
//     }
//     return {};
//   }
// }


// export async function addReferential(formData: any, type: string, cost: string) {
//   const datas: string[] = [formData.label as string, formData.value as string]
//   if (cost) {
//     type = "DELIVERY_MODE"
//     await prisma.referentiel.create({
//       data: {
//         label: cost,
//         value: datas[1],
//         type: "DELIVERY_COST"
//       },
//     })
//   }
//   const ref = await prisma.referentiel.create({
//     data: {
//       label: datas[0],
//       value: datas[1],
//       type: type
//     },
//   });

//   if (type === "COUNTRY") {
//     const cities = City.getCitiesOfCountry(datas[1])
//     if (cities)
//       await prisma.referentiel.createMany({
//         data: cities.map((item) => ({
//           value: datas[0],
//           label: item.name,
//           type: "CITY",
//         })),
//         skipDuplicates: true,
//       });
//   }

//   return ref
// }

