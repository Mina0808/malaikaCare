// import { ProcurementPlanStatus } from "@prisma/client";
// import { match } from "ts-pattern";
// import { BadgeProps } from "@/components/badge";

// export enum TranslatedStatus {
//   DRAFT = "Créé",
//   EDITING = "En révision",
//   SUBMITTED = "Soumis",
//   VERIFIED = "Validé",
//   REJECTED = "Retourné",
//   UPDATED = "Mis à jour",
// }

// export function statusToBadgeProps(status: ProcurementPlanStatus): BadgeProps {
//   return match(status)
//     .with(ProcurementPlanStatus.DRAFT, () => ({
//       text: TranslatedStatus.DRAFT,
//       color: "yellow",
//     }))
//     .with(ProcurementPlanStatus.EDITING, () => ({
//       text: TranslatedStatus.EDITING,
//       color: "yellow",
//     }))
//     .with(ProcurementPlanStatus.SUBMITTED, () => ({
//       text: TranslatedStatus.SUBMITTED,
//       color: "blue",
//     }))
//     .with(ProcurementPlanStatus.VERIFIED, () => ({
//       text: TranslatedStatus.VERIFIED,
//       color: "green",
//     }))
//     .with(ProcurementPlanStatus.REJECTED, () => ({
//       text: TranslatedStatus.REJECTED,
//       color: "red",
//     }))
//     .with(ProcurementPlanStatus.UPDATED, () => ({
//       text: TranslatedStatus.UPDATED,
//       color: "yellow",
//     }))
//     .exhaustive() as BadgeProps;
// }
