// import { Prisma, ProcurementPlanStatus } from "@prisma/client";
// import { prisma } from "../prisma";

// interface GetProcurementPlanParams {
//   year: string;
//   companyId: string;
//   filter?: Prisma.ProjectWhereInput;
//   page?: number;
// }
// export async function listProcurementPlansByCompany(companyId: string) {
//   const procurementPlans = await prisma.procurementPlan.findMany({
//     where: {
//       companyId: companyId,
//     },
//     include: {
//       _count: {
//         select: { projects: true },
//       },
//       projects: true,
//     },
//   });
//   return procurementPlans;
// }

//  export async function getProcurementPlan(
//    year: string,
//    companyId: string,
  
//  ) {
//    const procurementPlan = await prisma.procurementPlan.findFirstOrThrow({
//      where: { year: parseInt(year), companyId: companyId },
//      include: {
//        projects: {
//          orderBy: { name: "asc" },
         
//          },
//        },
//      });
//     return procurementPlan;
//  }

// interface GetProcurementPlanParams {
//   year: string;
//   companyId: string;
//   filter?: Prisma.ProjectWhereInput;
//   page?: number;
// }

// interface GetProcurementPlanParams {
//   year: string;
//   companyId: string;
//   filter?: Prisma.ProjectWhereInput;
//   page?: number;
// }

// export async function getProcurementPlanProjects({
//   year,
//   companyId,
//   filter,
//   page = 1,
// }: GetProcurementPlanParams) {
//   try {
//     const procurementPlan = await prisma.procurementPlan.findFirstOrThrow({
//       where: { year: parseInt(year), companyId },
//       include: {
//         projects: {
//           orderBy: { name: "asc" },
//           where: filter,
//           skip: (page - 1) * 10,
//           take: 10,
//           include:{
//             callForBids: true,
//             callForExpressionOfInterest:true
//           }
//         },
//       },
//     });

//     const totalCount = await prisma.project.count({
//       where: {
//         procurementPlanId: procurementPlan.id,
//         ...filter,
//       },
//     });
  
//     const totalPages = Math.ceil(totalCount / 10);

//     return { procurementPlan, totalPages };
//   } catch (error) {
//     // Handle error
//     console.error('Error fetching procurement plan:', error);
//     throw error;
//   }
// }
// export async function addProjectToProcurementPlan(
//   companyId: string,
//   year: string,
//   { activityId, ...payload }: any
// ) {
//   const procurementPlan = await prisma.procurementPlan.findFirstOrThrow({
//     where: { companyId, year: parseInt(year) },
//   });

//   const project = await prisma.project.create({
//     data: {
//       ...payload,
//       procurementPlan: {
//         connect: {
//           id: procurementPlan.id,
//         },
//       },
//       activity: {
//         connect: {
//           id: activityId,
//         },
//       },
//       company: {
//         connect: {
//           id: companyId,
//         },
//       },
//     },
//   });

//   return project;
// }

// export async function updateProject({ id, ...rest }: any) {
//   const project = await prisma.project.update({
//     where: { id },
//     data: {
//       ...rest,
//     },
//     include: { procurementPlan: true },
//   });

//   return project;
// }

// export async function getProjectById(projectId: string) {
//   const project = await prisma.project.findUniqueOrThrow({
//     where: { id: projectId },
//     include: {
//       procurementPlan: true,
//       activity: true,
//       callForExpressionOfInterest: { include: { publication: true } },
//       callForBids: { include: { publication: true } },
//     },
//   });
//   return project;
// }

// export async function listProcurementPlans(filter: any, page: number = 1) {
//   return prisma.$transaction(async (prisma) => {
//     const procurementPlans = await prisma.procurementPlan.findMany({
//       include: {
//         company: true,
//       },
//       skip: (page - 1) * 10,
//       take: 10,
//       where: filter,
//     });

//     const totalCount = await prisma.procurementPlan.count({ where: filter });
//     const totalPages = Math.ceil(totalCount / 10);
//     return { procurementPlans, totalPages };
//   });
// }

// export async function getProcurementPlanById(id: string) {
//   const procurementPlan = await prisma.procurementPlan.findUniqueOrThrow({
//     where: { id },
//     include: {
//       projects: { include: { activity: true } },
//       company: { include:{user:true}},
//     },
//   });
//   return procurementPlan;
// }

// export async function getProcurementById(id: string, page: number = 1, filter?: any) {
//   const procurementPlan = await prisma.procurementPlan.findUniqueOrThrow({
//     where: { id, },
//     include: {
//       company: { include: { user: true } },
//     },
//   });

//   const projects = await prisma.project.findMany({
//     where: {
//       procurementPlanId: id,
//       reference: filter.reference,
//       activity:{kind: filter.activityKind, name: filter.activity}
//     },
//     include: { activity: true , callForBids:true, callForExpressionOfInterest:true},
//     skip: (page - 1) * 15,
//     take: 15,
//   });

//   const totalCount = await prisma.project.count({
//     where: {
//       procurementPlanId: id,
//       reference: filter.reference,
//       activity:{kind: filter.activityKind}
//     },
//   });

//   const totalPages = Math.ceil(totalCount / 15);

//   return { procurementPlan: { ...procurementPlan, projects }, totalPages };
// }


// export async function updateProcurementPlan(id: string, payload: any) {
//   const procurementPlan = await prisma.procurementPlan.update({
//     where: { id },
//     data: payload,
//   });
//   return procurementPlan;
// }

// export async function deleteProject(id: string) {
//   const project = await prisma.project.delete({
//     where: { id },
//     include: {
//       procurementPlan: true,
//     },
//   });
//   return project;
// }

// export async function updatePlanProjects(
//   procurementPlanId: string,
//   where: Record<any, any>,
//   payload: any
// ) {
//   const projects = await prisma.project.updateMany({
//     where: {
//       procurementPlanId,
//       ...where,
//     },
//     data: payload,
//   });
//   return projects;
// }

// export async function isVerified(procurementPlanId: string) {
//   const projects = await prisma.project.findMany({
//     where: {
//       procurementPlanId,
//       status: {
//         not: ProcurementPlanStatus.VERIFIED,
//       },
//     },
//   });
//   return projects.length === 0;
// }
