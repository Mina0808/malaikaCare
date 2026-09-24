// "use server"
// import { prisma } from "@/lib/prisma"

// export async function newSection(name:string){
//     return prisma.$transaction(async (prisma) => {
//         return await prisma.section.create({
//             data: {
//                 name:name
//             }
//         })
//       })
// }

// export async function updateSection(id: number, name:string){
//     return prisma.$transaction(async (prisma) => {
//         return await prisma.section.update({
//             where: {
//                 id:id
//             },
//             data: {
//                 name:name
//             }
//         })
//       })
// }

// export async function removeSection(id: number){
//     return prisma.$transaction(async (prisma) => {
//         return await prisma.section.delete({
//             where: {
//                 id:id
//             },
//         })
//       })
// }

// export async function newContent(sectionId:number, title:string, text:string){
//     return prisma.$transaction(async (prisma) => {
//         return await prisma.faq.create({
//             data: {
//                 sectionId:sectionId,
//                 title:title,
//                 text:text
//             }
//         })
//       })
// }

// export async function updateContent(id: number, sectionId:number, title:string, text:string){
//     return prisma.$transaction(async (prisma) => {
//         return await prisma.faq.update({
//             where: {
//                 id:id
//             },
//             data: {
//                 sectionId:sectionId,
//                 title:title,
//                 text:text
//             }
//         })
//       })
// }

// export async function removeContent(id: number){
//     return prisma.$transaction(async (prisma) => {
//         return await prisma.faq.delete({
//             where: {
//                 id:id
//             },
//         })
//       })
// }

// export async function allSections(){
//     return prisma.$transaction(async (prisma) => {
//         return await prisma.section.findMany()
//       })
// }

// export async function allContents(id:number){
//     return prisma.$transaction(async (prisma) => {
//         return await prisma.faq.findMany({
//             where:{sectionId:id}
//         })
//       })
// }