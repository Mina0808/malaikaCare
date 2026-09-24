
// import { PrismaClient, SubscriptionStatus } from '@prisma/client';
// import bcrypt from 'bcryptjs';

// const prisma = new PrismaClient();


// const companies = [
//   {
//     "nom": "SolarTech Solutions",
//     "contact": {
//       "nom": "Aminata Diop",
//       "poste": "Responsable Technique"
//     }
//   },
//   {
//     "nom": "AgriSmart Innovations",
//     "contact": {
//       "nom": "Mamadou Ndiaye",
//       "poste": "Responsable Marketing"
//     }
//   },
//   {
//     "nom": "AquaFresh Fisheries",
//     "contact": {
//       "nom": "Mariama Sow",
//       "poste": "Spécialiste de l'Aquaculture"
//     }
//   },
//   {
//     "nom": "EcoTech Energies",
//     "contact": {
//       "nom": "Ousmane Fall",
//       "poste": "Ingénieur en Énergies Renouvelables"
//     }
//   },
//   {
//     "nom": "BioFoods Senegal",
//     "contact": {
//       "nom": "Khadija Gueye",
//       "poste": "Responsable Assurance Qualité"
//     }
//   },
//   {
//     "nom": "TechHub Senegal",
//     "contact": {
//       "nom": "Cheikh Ndiaye",
//       "poste": "Développeur Logiciel"
//     }
//   },
//   {
//     "nom": "Maritime Logistics Senegal",
//     "contact": {
//       "nom": "Fatoumata Ba",
//       "poste": "Coordinateur Logistique"
//     }
//   },
//   {
//     "nom": "EduConnect Senegal",
//     "contact": {
//       "nom": "Ibrahima Diallo",
//       "poste": "Conseiller en Éducation"
//     }
//   },
//   {
//     "nom": "FashionBlend Senegal",
//     "contact": {
//       "nom": "Ndeye Thiam",
//       "poste": "Styliste de Mode"
//     }
//   },
//   {
//     "nom": "FinServe Solutions",
//     "contact": {
//       "nom": "Modou Sarr",
//       "poste": "Analyste Financier"
//     }
//   }
// ]

// async function main() {
//   const password = await bcrypt.hash('password', 10);
//   companies.forEach(async (company) => {
//     const firstName = company.contact.nom.split(' ')[0];
//     const lastName = company.contact.nom.split(' ')[1];
//     await prisma.user.create({
//       data: {
//         firstName,
//         lastName,
//         email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
//         password,
//         verifiedAt: new Date(),
//         position: company.contact.poste,
//         company: {
//           create: {
//             name: company.nom,
//             address: "Dakar, Sénégal",
//             profileId: 3,
//             revenues: 1000000,
//             activities: {
//               connect: (await prisma.activity.findMany({ take: 10 })).map(activity => ({ id: activity.id }))
//             },
//             subscription: {
//               create: {
//                 status: SubscriptionStatus.ACTIVE
//               },
//             },
//           }
//         },
//       },
//     });
//   });
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
