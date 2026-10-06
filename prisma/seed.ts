import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.documents.deleteMany({});
  await prisma.request.deleteMany({});
  await prisma.professional.deleteMany({});
  await prisma.intervention.deleteMany({});
  await prisma.client.deleteMany({});
  const password = await bcrypt.hash("password", 10);
  const staffUser = await prisma.professional.create({
    data: {
      firstName: "MALAIKA",
      lastName: "ADMIN",
      email: "admin@malaika-cs.com",
      phone: "+221782567070",
      password,
      role: "ADMIN",
      status: "ACTIF",
    },
  });
  console.log(`Created admin user with email: ${staffUser.email}`);

  const pwd = await bcrypt.hash("123456789", 10);
  const testUser = await prisma.client.create({
    data: {
      firstName: "Lena",
      lastName: "DIOP",
      email: "lena.diop@yopmail.com",
      phone: "+221783566070",
      password: pwd,
      role: "INDIVIDUAL",
      status: "ACTIF",
      gender: true, //sexe féminin
      birthday: new Date("30/09/1998"),
      autonomy: true,
    },
  });
  console.log(`Created test user with email: ${testUser.email}`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
