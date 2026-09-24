// "use client";

// import { faHome, faUsers, faClipboardQuestion, faPeopleGroup, faBoxesPacking, faScrewdriverWrench, faCubes, faTruckFast, faCompass } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Link from "next/link";
// import { useRouter } from 'next/navigation';
// import { clearSession } from "@/lib/session";
// import TooltipComponent from './tooltip';
// import { useEffect } from 'react';

// const navigation: {
//   path: string;
//   title: string;
// }[] = [];

// export default function NavBar({
//   withLogo = false,
//   user,
//   url,
//   setUrl,
//   isOpen,
//   setIsOpen
// }: {
//   withLogo?: boolean;
//   user?: any;
//   url?: string;
//   setUrl: Function;
//   isOpen: boolean,
//   setIsOpen: Function
// }) {
//   const router = useRouter();
//   router.prefetch('/auth/login'); 
  
//   const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     await clearSession();
//     router.push('/auth/login');
//   };


//   function handleChange(change: string) {
//     setUrl(change)
//   }

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setUrl(window.location.pathname)
//     }
//   }, []);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={` hidden lg:block  relate z-20 shadow top-0 left-0 overflow-x-hidden overflow-y-auto w-64 flex flex-col bg-white transition-all duration-300 ease-in-out   
//       ${isOpen ? '2xl:w-64' : '2xl:w-20'} ${isOpen ? 'xl:w-64' : 'xl:w-20'} ${isOpen ? 'lg:w-64' : 'lg:w-20'}`}
//     >
//       <div className="bg-sky-100 h-20">
//         <button className=" p-8 focus:outline-none" onClick={toggleSidebar}>
//           <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16 M4 12h16 M4 18h16" />
//           </svg>
//         </button>
//       </div>

//       <nav className=" p-4 flex flex-col mt-4 space-y-4">
//         {(user?.role !== "STAFF" && user?.role !== "ADMIN" && user?.role !== "SUPERADMIN") && (
//           <TooltipComponent msg="Page d'accueil">
//             <Link href="/" onClick={() => { handleChange("/") }} className={`flex items-center p-2 text-gray-700 hover:bg-sky-300 rounded ${(url === '/') ? 'bg-sky-300' : ''}`}>
//               <FontAwesomeIcon icon={faHome} className="w-6 h-6" />
//               <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Accueil</span>
//             </Link>
//           </TooltipComponent>
//         )}

//         {user && user?.role !== "INDIVIDUAL" && user?.role !== "ENTERPRISE" && user?.role !== "STAFF" && (
//           <TooltipComponent msg="Liste des utilisateurs du backoffice">
//             <Link href="/backoffice/users" onClick={() => { handleChange("/backoffice/users") }} className={`flex items-center p-2 text-gray-700 hover:bg-sky-300 rounded ${(url === '/backoffice/users') ? 'bg-sky-300' : ''}`} >
//               <FontAwesomeIcon icon={faUsers} className="w-6 h-6" />
//               <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Utilisateurs</span>
//             </Link>
//           </TooltipComponent>
//         )}
//         {user && user?.role !== "INDIVIDUAL" && user?.role !== "ENTERPRISE" && (
//           <TooltipComponent msg="Liste des clients">
//             <Link href="/backoffice/customers" onClick={() => { handleChange("/backoffice/customers") }} className={`flex items-center p-2 text-gray-700 hover:bg-sky-300 rounded ${(url === '/backoffice/customers') ? 'bg-sky-300' : ''}`}>
//               <FontAwesomeIcon icon={faPeopleGroup} className="w-6 h-6" />
//               <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Clients</span>
//             </Link>
//           </TooltipComponent>
//         )}
//         {(user?.role==="INDIVIDUAL"||user?.role==="ENTERPRISE") && (
//           <TooltipComponent msg="Suivi de colis">
//           <Link href={"/tracking"} onClick={() => { handleChange("/tracking") }} className={`flex items-center p-2 text-gray-700 hover:bg-sky-300 rounded ${(url === '/tracking') ? 'bg-sky-300' : ''}`}>
//             <FontAwesomeIcon icon={faCompass} className="w-6 h-6" />
//             <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Suivi de colis</span>
//           </Link>
//         </TooltipComponent>
//         )}
//         <TooltipComponent msg="Enregistrer un nouveau colis">
//           <Link href={user?.role !== "INDIVIDUAL" && user?.role !== "ENTERPRISE" ? "/backoffice/orders/order" : "/order"} onClick={() => { handleChange(`${user?.role !== "INDIVIDUAL" && user?.role !== "ENTERPRISE" ? "/backoffice/order" : "/order"}`) }} className={`flex items-center p-2 text-gray-700 hover:bg-sky-300 rounded ${(url === '/backoffice/order' || url === '/order') ? 'bg-sky-300' : ''}`}>
//             <FontAwesomeIcon icon={faTruckFast} className="w-6 h-6" />
//             <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Enregistrer un colis</span>
//           </Link>
//         </TooltipComponent>
//         <TooltipComponent msg="Liste des colis">
//           <Link href={user?.role !== "INDIVIDUAL" && user?.role !== "ENTERPRISE" ? "/backoffice/orders" : "/orders"} onClick={() => { handleChange(`${user?.role !== "INDIVIDUAL" && user?.role !== "ENTERPRISE" ? "/backoffice/orders" : "/orders"}`) }} className={`flex items-center p-2 text-gray-700 hover:bg-sky-300 rounded ${(url === '/backoffice/orders' || url === '/orders') ? 'bg-sky-300' : ''}`}>
//             <FontAwesomeIcon icon={faBoxesPacking} className="w-6 h-6" />
//             <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Colis</span>
//           </Link>
//         </TooltipComponent>
//         <TooltipComponent msg="Panier">
//           <Link href={user?.role !== "INDIVIDUAL" && user?.role !== "ENTERPRISE" ? "/backoffice/grouping" : "/grouping"} onClick={() => { handleChange(`${user?.role !== "INDIVIDUAL" && user?.role !== "ENTERPRISE" ? "/backoffice/grouping" : "/grouping"}`) }} className={`flex items-center p-2 text-gray-700 hover:bg-sky-300 rounded ${(url === '/backoffice/grouping' || url === '/grouping') ? 'bg-sky-300' : ''}`}>
//             <FontAwesomeIcon icon={faCubes} className="w-6 h-6" />
//             <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Panier</span>
//           </Link>
//         </TooltipComponent>
//         {user && user?.role !== "INDIVIDUAL" && user?.role !== "ENTERPRISE" && user?.role !== "STAFF" && (
//           <TooltipComponent msg="Paramétrage des référentiels">
//             <Link href="/backoffice/settings" onClick={() => { handleChange("/backoffice/settings") }} className={`flex items-center p-2 text-gray-700 hover:bg-sky-300 rounded ${(url === '/backoffice/settings') ? 'bg-sky-300' : ''}`}>
//               <FontAwesomeIcon icon={faScrewdriverWrench} className="w-6 h-6" />
//               <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>Paramétrage</span>
//             </Link>
//           </TooltipComponent>

//         )}
//         <TooltipComponent msg="FAQ">
//           <Link href={user?.role !== "INDIVIDUAL" && user?.role !== "ENTERPRISE" ? "/backoffice/faq" : "/faq"} onClick={() => { handleChange(`${user?.role !== "INDIVIDUAL" && user?.role !== "ENTERPRISE" ? "/backoffice/faq" : "/faq"}`) }} className={`flex items-center p-2 text-gray-700 hover:bg-sky-300 rounded ${(url === '/backoffice/faq' || url === '/faq') ? 'bg-sky-300' : ''}`}>
//             <FontAwesomeIcon icon={faClipboardQuestion} className="w-6 h-6" />
//             <span className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>FAQ</span>
//           </Link>
//         </TooltipComponent>
//       </nav>
//     </div>
//   );
// }
