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
import { ChevronDown, LogOut, Menu, User } from "lucide-react";

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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const toggleDropdown = (menuName:any) => {
    setActiveDropdown((prev) => (prev === menuName ? null : menuName));
  };
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
    <div className="relative z-50">
      <nav className="fixed top-0 left-0 w-full bg-blue-950 text-white border-b border-blue-900/80 shadow-lg h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* LOGO & BRAND */}
          <Link href="/care" className="flex items-center gap-3">
            <Image
              src={logo}
              alt="Malaika Logo"
              className="w-auto h-12 object-contain"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-black text-white text-base tracking-wider">
                MALAIKA
              </span>
              <span className="text-[9px] text-amber-300 font-bold uppercase tracking-widest">
                Care & Conseil
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU ITEMS */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* DROPDOWN 1: MALAIKA CARE & CONSEIL */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("care")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeDropdown === "care"
                    ? "bg-blue-900 text-amber-400"
                    : "text-slate-200 hover:bg-blue-900/60"
                }`}
              >
                <span>Malaika Care & Conseil</span>
                <ChevronDown className="w-3 h-3 text-amber-400" />
              </button>

              {activeDropdown === "care" && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 text-slate-800 z-50">
                  <Link
                    href="/qui-sommes-nous"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-amber-50 hover:text-amber-900"
                  >
                    Qui sommes nous?
                  </Link>
                  <Link
                    href="/nos-agences"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-amber-50 hover:text-amber-900"
                  >
                    Nos agences
                  </Link>
                  <Link
                    href="/blogs"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-amber-50 hover:text-amber-900"
                  >
                    Blogs et articles
                  </Link>
                </div>
              )}
            </div>

            {/* DROPDOWN 2: NOS SERVICES */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("services")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeDropdown === "services"
                    ? "bg-blue-900 text-amber-400"
                    : "text-slate-200 hover:bg-blue-900/60"
                }`}
              >
                <span>Nos services</span>
                <ChevronDown className="w-3 h-3 text-amber-400" />
              </button>

              {activeDropdown === "services" && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 text-slate-800 z-50">
                  <Link
                    href="/services/soins-medicaux"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-amber-50 hover:text-amber-900"
                  >
                    Soins médicaux
                  </Link>
                  <Link
                    href="/services/aide-a-domicile"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-amber-50 hover:text-amber-900"
                  >
                    Services à la personne
                  </Link>
                  <Link
                    href="/services/coordination"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-amber-50 hover:text-amber-900"
                  >
                    Coordination des soins
                  </Link>
                </div>
              )}
            </div>

            {/* DROPDOWN 3: INFORMATIONS UTILES */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("info")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeDropdown === "info"
                    ? "bg-blue-900 text-amber-400"
                    : "text-slate-200 hover:bg-blue-900/60"
                }`}
              >
                <span>Informations utiles</span>
                <ChevronDown className="w-3 h-3 text-amber-400" />
              </button>

              {activeDropdown === "info" && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 text-slate-800 z-50">
                  <Link
                    href="/comment-ca-marche"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-amber-50 hover:text-amber-900"
                  >
                    Comment ça marche?
                  </Link>
                  <Link
                    href="/tarifs"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-amber-50 hover:text-amber-900"
                  >
                    Tarifs
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-2 text-xs font-semibold hover:bg-amber-50 hover:text-amber-900"
                  >
                    Nous contacter
                  </Link>
                </div>
              )}
            </div>

            {/* DIRECT LINKS: CLIENTS & REQUESTS */}
            <Link
              href="/backoffice/care/customers?page=1"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 hover:bg-blue-900/60 hover:text-white transition-all"
            >
              Liste des clients
            </Link>

            <Link
              href="/backoffice/care/requests"
              className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-amber-500 text-blue-950 hover:bg-amber-400 transition-all shadow-md"
            >
              Liste des demandes
            </Link>
          </div>

          {/* USER AUTH & ACTIONS */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 bg-blue-900/60 p-1.5 rounded-2xl border border-blue-800">
                <Link
                  href={
                    user?.role !== "INDIVIDUAL"
                      ? "/backoffice/care/profil"
                      : "/care/profil"
                  }
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-blue-950 font-black text-xs flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white pr-2">
                    {user?.firstName} {user?.lastName}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href={`/auth/login?redirect=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname : "")}`}
                className="bg-amber-500 hover:bg-amber-400 text-blue-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <User className="w-3 h-3" />
                Connexion
              </Link>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden">
            <button
              onClick={() => setState(!state)}
              className="p-2.5 rounded-xl bg-blue-900 text-white border border-blue-800"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
