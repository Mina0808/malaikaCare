// "use client";

// import { PublicationStatus } from "@prisma/client";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useRef } from "react";
// import { TranslatedStatus } from "@/lib/helpers/subscription";

// export default function PublicationFilters() {
//   const searchParams = useSearchParams();
//   const status = searchParams.get("status") || TranslatedStatus.SUBMITTED;
//   const ref = useRef<HTMLFormElement>(null);

//   const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
//     ref.current?.submit();
//   };

//   useEffect(() => {
//     ref.current?.addEventListener("formdata", (event) => {
//       let formData = event.formData;
//       for (let [name, value] of Array.from(formData.entries())) {
//         if (value === "") formData.delete(name);
//       }
//     });
//   });

//   return (
//     <form ref={ref} onChange={handleChange}>
//       <select
//         name="status"
//         defaultValue={status}
//         title="Filtrer par statut"
//         className="rounded-md border-0 py-1.5 min-w-max text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-umber sm:text-xl sm:leading-6"
//       >
//         <option value="">Tous</option>
//         <option value={PublicationStatus.SUBMITTED}>Soumis</option>
//         <option value={PublicationStatus.VERIFIED}>Validé</option>
//         <option value={PublicationStatus.REJECTED}>Rejeté</option>
//         <option value={PublicationStatus.EDITING}>Modifié</option>
//         <option value={PublicationStatus.REVIEWING_CANDIDATES}>Attribution provisoire</option>
//         <option value={PublicationStatus.REVIEW_REJECTED}>Attribution rejetée</option>
//         <option value={PublicationStatus.AWARDED}>Attribué</option>
//       </select>
//     </form>
//   );
// }
