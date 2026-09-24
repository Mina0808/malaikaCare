// import {
//   BookOpenIcon,
//   ChartBarIcon,
//   EnvelopeIcon,
//   GlobeAltIcon,
//   HomeIcon,
//   MegaphoneIcon,
//   QueueListIcon,
//   // QueueListIcon,
//   // NewspaperIcon,
// } from "@heroicons/react/24/outline";
// import Image from "next/image";
// import Link from "next/link";
// import logo from "@/images/logo.png";
// import MenuDropdown from "./menu-dropdown";
// import NavLink from "@/app/backoffice/nav-link";

// export default function Sidebar({
//   profileId,
// }: {
//   profileId: number | undefined | null;
// }) {
//   const isOrdering = [1, 2, 3].includes(profileId ?? 0);
//   const publicationItems = [
//     { label: "Marchés", href: "/publications" },
//     { label: "PPMs", href: "/procurements" },
//   ];
//   return (
//     <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r sticky top-0">
//       <Link href="/backoffice" className="px-8">
//         <Image src={logo} alt="logo" className="w-full" priority />
//       </Link>

//       <div className="flex flex-col justify-between flex-1 mt-6">
//         <nav>
//           <NavLink href="/">
//             <HomeIcon className="w-5 h-5" />
//             <span className="mx-4 font-medium">Accueil</span>
//           </NavLink>

//           <NavLink href="/presentation">
//             <BookOpenIcon className="w-5 h-5" />

//             <span className="mx-4 font-medium">Présentation</span>
//           </NavLink>
//           <NavLink href="/companies">
//             <GlobeAltIcon className="w-5 h-5" />

//             <span className="mx-4 font-medium">Annuaire</span>
//           </NavLink>

//           {isOrdering && (
//             <>
//               <NavLink href="/procurement-plans">
//                 <ChartBarIcon className="w-5 h-5" />
//                 <span
//                   className="mx-4 font-medium"
//                   title="Plans de passation de marché"
//                 >
//                   PPM
//                 </span>
//               </NavLink>

//               <NavLink href="/calls-for-expression-of-interest">
//                 <MegaphoneIcon className="w-5 h-5" />
//                 <span className="mx-4 font-medium">AMI</span>
//               </NavLink>

//               <NavLink href="/calls-for-bids">
//                 <EnvelopeIcon className="w-5 h-5" />
//                 <span className="mx-4 font-medium">Appels d'offres</span>
//               </NavLink>
//               <NavLink href="/local-contents">
//                 <QueueListIcon className="w-5 h-5" />
//                 <span className="mx-4 font-medium">Plan et Rapport</span>
//               </NavLink>
//             </>
//           )}

//           {/* <NavLink href="/publications">
//             <NewspaperIcon className="w-5 h-5" />
//             <span className="mx-4 font-medium">Publications</span>
//           </NavLink> */}
//           <div className="mt-3">
//             <MenuDropdown label="Publications" items={publicationItems} />
//           </div>
//         </nav>
//       </div>
//     </aside>
//   );
// }
