// import { LocalContentPlanStatus } from "@prisma/client";
// import { match } from "ts-pattern";
// import { BadgeProps } from "@/components/badge";

// export enum TranslatedQuestionHeadingEnum {
//   JOBS = 'Emploi',
//   SALARIES = 'Plan de succession - Salaires',
//   TRAININGS = 'Formation',
//   SUPPLY = 'Approvisionnement en biens - travaux et services',
// }

// export enum TranslateLocalContentPlanStatus {
//   DRAFT = 'Créé',
//   SUBMITTED = 'Soumis',
//   VERIFIED = 'Validé',
//   REJECTED = 'Rejeté',
//   LOCKED = 'Vérouillé',
//   RETURNED = 'Retourné'
// }
// export function translateStatusQuestion(status: string): string {
//   switch (status) {
//     case LocalContentPlanStatus.DRAFT:
//       return TranslateLocalContentPlanStatus.DRAFT;
//     case LocalContentPlanStatus.SUBMITTED:
//       return TranslateLocalContentPlanStatus.SUBMITTED;
//     case LocalContentPlanStatus.VERIFIED:
//       return TranslateLocalContentPlanStatus.VERIFIED;
//     case LocalContentPlanStatus.REJECTED:
//       return TranslateLocalContentPlanStatus.REJECTED;
//     case LocalContentPlanStatus.LOCKED:
//       return TranslateLocalContentPlanStatus.LOCKED;
//     case LocalContentPlanStatus.RETURNED:
//         return TranslateLocalContentPlanStatus.RETURNED;
//     default:
//       return 'Statut inconnu';
//   }
// }

// export function bgQuestion(status: string) {
//   switch (status) {
//     case LocalContentPlanStatus.DRAFT:
//       return 'bg-yellow-500';
//     case LocalContentPlanStatus.SUBMITTED:
//       return 'bg-blue-500';
//     case LocalContentPlanStatus.VERIFIED:
//       return 'bg-green-500';
//     case LocalContentPlanStatus.REJECTED:
//       return 'bg-red-500';
//     case LocalContentPlanStatus.LOCKED:
//       return 'bg-gray-500';
//     case LocalContentPlanStatus.RETURNED:
//         return 'bg-red-500';
//     default:
//       return 'bg-yellow-500';
//   }
// }

// export function statusToBadgePropspCL(status: LocalContentPlanStatus): BadgeProps {
//   return match(status)
//     .with(LocalContentPlanStatus.DRAFT, () => ({
//       text: LocalContentPlanStatus.DRAFT,
//       color: "yellow",
//     }))
//     .with(LocalContentPlanStatus.SUBMITTED, () => ({
//       text: LocalContentPlanStatus.SUBMITTED,
//       color: "blue",
//     }))
//     .with(LocalContentPlanStatus.VERIFIED, () => ({
//       text: LocalContentPlanStatus.VERIFIED,
//       color: "green",
//     }))
//     .with(LocalContentPlanStatus.REJECTED, () => ({
//       text: LocalContentPlanStatus.REJECTED,
//       color: "red",
//     }))
//     .with(LocalContentPlanStatus.LOCKED, () => ({
//       text: LocalContentPlanStatus.LOCKED,
//       color: "gray",
//     }))
//     .with(LocalContentPlanStatus.RETURNED, () => ({
//       text: LocalContentPlanStatus.RETURNED,
//       color: "red",
//     }))
//     .exhaustive() as BadgeProps;
// }