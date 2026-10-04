"use client";

import Image from "next/image";
import { useState } from "react";
import logo from "@/images/logo malaika.jpg";
import Link from 'next/link'
import { faUser, faUserXmark, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clearSession } from "@/lib/session";
import { useRouter } from 'next/navigation';
//import { faUsers, faClipboardQuestion, faPeopleGroup, faBoxesPacking, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import TooltipComponent from "@/components/tooltip";
import Dropdown from "@/components/dropdown";

const navigation: {
  path: string;
  title: string;
}[] = [];

export default function NavBar({
  user,
  setUser,
  url,
  setUrl,
}: {
  user?: any;
  setUser: Function;
  url?: string;
  setUrl: Function;
}) {
  const [state, setState] = useState(false);
  const [dropdownState, setDropdownState] = useState<{ open: boolean, type: string }>({ open: false, type: "" });
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await clearSession();
    router.push('/care');
    setUser(null)
  };
  function handleChange(change: string) {
    setUrl(change)
  }

  return (
    <div className="relative z-20">
      <nav className={`fixed w-full bg-white border-b border-gray-300 h-24`}>
        <div className="items-center mx-8 px-4 sm:px-0 lg:flex">
          <div className="flex flex-shrink items-center justify-between py-0 lg:pb-4 lg:pt-0 mt-3 lg:block">
            <Link href={"/care"} className="flex gap-4 items-center">
              <Image src={logo} alt="Logo" className="w-auto h-20" />
            </Link>
            <div className="lg:hidden">
              <button
                className="text-gray-700 rounded-md focus:border-gray-400 focus:border"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={`flex-1 h-full flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${state ? "h-auto pb-20 overflow-auto bg-white opacity-100" : "hidden"
              }`}
          >
            <div className="flex justify-center">

              {/* <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

              </ul> */}

              <ul className="flex flex-col space-x-0 lg:space-x-16 lg:flex-row">
                <div className="flex justify-center px-10">

                  <li>
                    <Dropdown tooltipMsg={"Les différents services proposés"} state={dropdownState} setState={setDropdownState} menuName={"Nos services"} itemList={[{ name: "Soins médicaux", href: "" }, { name: "Services à la personne", href: "" }, { name: "Coordination des soins", href: "" }]}></Dropdown>
                  </li>
                  {user && (
                    <li className="">
                      <TooltipComponent msg="Mes demandes">
                        <Link href={"/care/requests"} onClick={() => { handleChange("") }} className={`flex hover:border-b hover:border-5 hover:border-yellow-600 items-center p-5 text-gray-700`}>
                          <span className={``}>Voir mes demandes</span>
                        </Link>
                      </TooltipComponent>
                    </li>
                  )}
                  <li className="">
                    <TooltipComponent msg="Nous contacter">
                      <Link href={"/care/contact"} onClick={() => { handleChange("") }} className={`flex hover:border-b hover:border-5 hover:border-yellow-600 items-center p-5 text-gray-700`}>
                        <span className={``}>Nous contacter</span>
                      </Link>
                    </TooltipComponent>
                  </li>
                  <li className="">
                    <TooltipComponent msg="Faire une demande de devis">
                      <Link href={"/care/quote"} onClick={() => { handleChange("") }} className={`flex hover:border-b hover:border-5 hover:border-yellow-600 items-center p-5 text-gray-700`}>
                        <span className={``}>Demander un devis</span>
                      </Link>
                    </TooltipComponent>
                  </li>

                </div>

                <li className="">
                  {user ?
                    <div className="flex flex-row py-1">
                      <Link href={user?.role !== "INDIVIDUAL" ? "/backoffice/care/profil" : "/care/profil"} onClick={() => { handleChange(`${user?.role !== "INDIVIDUAL" ? "/backoffice/profil" : "/profil"}`) }} className={`flex items-center p-5 text-gray-700 hover:bg-sky-300 rounded ${(url === '/backoffice/profil' || url === '/profil') ? 'bg-sky-300' : ''}`}>
                        <span className={`flex gap-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:rounded-lg hover:border-gray-200 hover:shadow-xl hover:border hover:p-1`}>
                          <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
                          {user?.firstName} {user?.lastName}
                        </span>
                      </Link>
                      {!user?.isEmergencyContact && (
                        <TooltipComponent msg="Ajouter un contact d'urgence">
                          <FontAwesomeIcon icon={faWarning} color="red" className=" px-1 mt-4 w-6 h-6" />
                        </TooltipComponent>
                      )}
                    </div>
                    :
                    <Link href={`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`} className={`flex items-center p-5 text-gray-700 hover:bg-sky-300 rounded ${(url === '/backoffice/profil' || url === '/profil') ? 'bg-sky-300' : ''}`}>
                      <span className={`flex gap-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:rounded-lg hover:border-gray-200 hover:shadow-xl hover:border hover:p-1 py-1`}>
                        <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
                        Connexion
                      </span>
                    </Link>
                  }

                </li>


                <li className="p-2">
                  {user &&
                    <button
                      type="button"
                      className="flex gap-3 text-gray-600 hover:text-gray-800 border border-red-600 rounded-full p-5 hover:bg-red-50"
                      aria-current="page"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon icon={faUserXmark} className="w-6 h-6" />
                      Déconnexion
                    </button>
                  }
                </li>


              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
