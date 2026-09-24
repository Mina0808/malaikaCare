// import { PublicationStatus, PublicationType } from "@prisma/client";
// import { notFound } from "next/navigation";
// import { P, match } from "ts-pattern";
// import { BadgeProps } from "@/components/badge";

// export enum TranslatedStatus {
//   DRAFT = "Créé",
//   SUBMITTED = "Soumis",
//   VERIFIED = "Validé",
//   PUBLISHED = "Publié",
//   REJECTED = "Retourné",
//   REVIEWING_CANDIDATES = "Attribution provisoire",
//   REVIEW_REJECTED = "Attribution rejetée",
//   AWARDED = "Attribué",
//   EDITING = "Mis à jour",
//   CLOSED = "Clôturé",
// }

// export function publicationStatusToBadgeProps(
//   status: PublicationStatus,
//   publicationDate?: Date,
// ): BadgeProps {
//   return match({ status, publicationDate })
//     .with({ status: PublicationStatus.DRAFT }, () => ({
//       text: TranslatedStatus.DRAFT,
//       color: "yellow",
//     }))
//     .with({ status: PublicationStatus.EDITING }, () => ({
//       text: TranslatedStatus.EDITING,
//       color: "yellow",
//     }))
//     .with({ status: PublicationStatus.SUBMITTED }, () => ({
//       text: TranslatedStatus.SUBMITTED,
//       color: "blue",
//     }))
//     .with(
//       { status: PublicationStatus.VERIFIED, publicationDate: undefined },
//       () => ({ text: TranslatedStatus.VERIFIED, color: "green" }),
//     )
//     .with(
//       {
//         status: PublicationStatus.VERIFIED,
//         publicationDate: P.instanceOf(Date),
//       },
//       ({ publicationDate }: { publicationDate: Date }) =>
//         publicationDate <= new Date(),
//       () => ({ text: TranslatedStatus.PUBLISHED, color: "green" }),
//     )
//     .with(
//       {
//         status: PublicationStatus.VERIFIED,
//         publicationDate: P.instanceOf(Date),
//       },
//       () => ({ text: TranslatedStatus.VERIFIED, color: "green" }),
//     )
//     .with({ status: PublicationStatus.REJECTED }, () => ({
//       text: TranslatedStatus.REJECTED,
//       color: "red",
//     }))
//     .with({ status: PublicationStatus.REVIEWING_CANDIDATES }, () => ({
//       text: TranslatedStatus.REVIEWING_CANDIDATES,
//       color: "yellow",
//     }))
//     .with({ status: PublicationStatus.CLOSED }, () => ({
//       text: TranslatedStatus.CLOSED,
//       color: "green",
//     }))
//     .with({ status: PublicationStatus.REVIEW_REJECTED }, () => ({
//       text: TranslatedStatus.REVIEW_REJECTED,
//       color: "red",
//     }))
//     .with({ status: PublicationStatus.AWARDED }, () => ({
//       text: TranslatedStatus.AWARDED,
//       color: "green",
//     }))
//     .exhaustive() as BadgeProps;
// }

// export function processType(type: string) {
//   return match(type)
//     .with("calls-for-expression-of-interest", () => {
//       return {
//         type: PublicationType.CALL_FOR_EXPRESSION_OF_INTEREST,
//         title: "Appels à manifestation d'intérêt",
//       };
//     })
//     .with("calls-for-bids", () => {
//       return {
//         type: PublicationType.CALL_FOR_BIDS,
//         title: "Appels d'offres",
//       };
//     })
//     .otherwise(() => {
//       notFound();
//     });
// }
