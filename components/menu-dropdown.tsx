// // components/Dropdown.tsx
// "use client"; // Important to declare this file as a client component

// import { NewspaperIcon } from '@heroicons/react/24/outline';
// import React, { useState, useRef, useEffect } from 'react';
// import NavLink from '@/app/backoffice/nav-link';

// interface DropdownProps {
//   label: string;
//   items: { label: string; href: string }[];
// }

// const MenuDropdown: React.FC<DropdownProps> = ({ label, items }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const closeDropdown = (event: MouseEvent) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', closeDropdown);
//     return () => document.removeEventListener('mousedown', closeDropdown);
//   }, []);

//   return (
//     <div className="relative inline-block text-left" ref={dropdownRef}>
//       <button
//         onClick={toggleDropdown}
//         className="inline-flex justify-center w-full px-4 py-2 text-xl font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
//       >
//               <NewspaperIcon className="w-5 h-5" />
//         <span className="mx-4 font-medium text-base">{label}</span>
//         <svg
//           className="w-5 h-5 ml-2 -mr-1"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           aria-hidden="true"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>
//       {isOpen && (
//         <div className="origin-top-right absolute z-10 left-5 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="py-1">
//             {items.map((item, index) => (
//               <NavLink href={item.href} key={index}>
//                 <span className="mx-4 font-medium">{item.label}</span>
//               </NavLink>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuDropdown;
