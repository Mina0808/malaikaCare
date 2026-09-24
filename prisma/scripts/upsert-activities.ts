// import { PrismaClient } from '@prisma/client'
// import activities from '../activities.json'

// const prisma = new PrismaClient({
//   log: ["query", "info", "warn"],
// })

// async function main() {
//   console.log(process?.env?.DATABASE_URL)
//   // await prisma.$transaction(async (prisma) => {
//   for (const activity of activities) {
//     console.log(`Upserting activity with id_serial: ${activity.id_serial}`)
//     console.log(activity)
//     await prisma.activity.upsert({
//       where: { id_serial: activity.id_serial },
//       update: activity,
//       create: activity,
//     })
//   }
//   // })
// }

// main()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
