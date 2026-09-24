// "use client";
// import {
//   EyeIcon,
//   EyeSlashIcon,
//   GlobeAltIcon,
//   NoSymbolIcon,
// } from "@heroicons/react/24/outline";
// // import { CompanyDocumentType } from '@prisma/client';
// import { CompanyDocumentType } from "@prisma/client";
// import Image from "next/image";
// import { toast } from "react-toastify";
// import countries from "@/lib/db/static/countries.json";
// import { CDN_ENDPOINT } from "@/lib/upload";
// import ConfirmDialog from "./confirm-dialog";


// interface BannerProps {
//   company: any;
//   isSession?: boolean;
// }

// const Banner: React.FC<BannerProps> = ({ company, isSession }) => {
//   const logo = company.documents.find(
//     (document: any) => document.type === CompanyDocumentType.LOGO,
//   );
//   const handleToggleAnnuairePublish = async (form: FormData) => {
//     const { id } = Object.fromEntries(form);

//     try {
//       const state = await toggleAnnuairePublish(id as string);

//       if (state.published) {
//         toast.success(
//           "La présentation de l’entreprise a été publiée avec succès!",
//         );
//       } else {
//         toast.success(
//           "La présentation de l’entreprise a été dépubliée avec succès!",
//         );
//       }
//     } catch (error) {
//       console.error("Error toggling annuaire publish:", error);
//     }
//   };
//   const countryImg = countries.find(
//     (element) => element.name_fr == company.country,
//   );
//   return (
//     <div>
//       <div className="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable">
//         <div className="flex flex-wrap -mx-3">
//           <div className="flex-none  max-w-full px-3">
//             <div className="text-base ease-soft-in-out w-18.5  inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
//               {logo ? (
//                 <div className="inline-flex gap-4 items-center">
//                   <Image
//                     src={`${CDN_ENDPOINT}/${logo.fileName}`}
//                     alt={company?.name}
//                     objectFit="cover"
//                     width={192}
//                     height={192}
//                   />
//                 </div>
//               ) : (
//                 <NoSymbolIcon className="h-48 w-48 text-gray-300" />
//               )}
//             </div>
//           </div>
//           <div className="flex-none w-auto max-w-full px-3 my-auto flex-grow">
//             <div>
//               <h1 className="mb-1 font-bold text-3xl uppercase">
//                 {company.name}
//               </h1>
//               <div className="flex">
//                 <Image
//                   src={countryImg?.flag!}
//                   alt={company?.name}
//                   width={0}
//                   height={0}
//                   className="bg-white  object-contain bg-no-repeat w-6 bg-center h-full me-5"
//                 />{" "}
//                 <p className="mb-0 font-semibold flex leading-normal text-xl">
//                   {company?.country}
//                 </p>
//               </div>
//               <h5 className="mb-1 flex">
//                 <GlobeAltIcon className="w-5 h-5 me-6" />
//                 <a
//                   href={`https://${company?.website}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {company?.website}
//                 </a>
//               </h5>
//             </div>
//           </div>
//           {isSession && (
//             <div className="flex-none w-auto max-w-full px-3 flex items-center">
//               <ConfirmDialog
//                 id={company.id}
//                 message={
//                   !company.published
//                     ? "En cliquant sur 'Publier', vous permettez à toutes entreprises inscrites sur la plate-forme d'avoir accès à la présentation de votre entreprise à travers la rubrique 'Annuaire'"
//                     : "En cliquant sur Dépublier, vous ne permettez plus aux entreprises inscrites sur la plate-forme d'avoir accès à la présentation de votre entreprise à travers la rubrique Annuaire"
//                 }
//                 onFormSubmit={handleToggleAnnuairePublish}
//                 title={company.published ? "Dépublier" : "Publier"}
//                 color={company.published ? "bg-red-600" : "bg-blue"}
//                 icon={
//                   company.published ? (
//                     <EyeSlashIcon className="w-5 h-5 me-3" />
//                   ) : (
//                     <EyeIcon className="w-5 h-5 me-3" />
//                   )
//                 }
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Banner;
