"use client";

// import { faHome, faUsers, faClipboardQuestion, faPeopleGroup, faBoxesPacking, faScrewdriverWrench, faCubes, faTruckFast, faCompass } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Link from "next/link";
// import { useRouter } from 'next/navigation';
// import { clearSession } from "@/lib/session";
// import TooltipComponent from './tooltip';
import logo from "@/images/malaika_logo_transparent.png";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Phone,
  Clock,
  Heart,
  Building2,
  X,
  Menu,
  User,
  TriangleAlert,
} from "lucide-react";

export default function Navbar({
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
  const router = useRouter();
  const [activePortalTab, setActivePortalTab] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteType, setQuoteType] = useState("care");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const pathname = usePathname();
  const isCare = pathname.startsWith("/care");
  const isConsulting = pathname.startsWith("/consulting");

  // Smooth scroll helper
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openQuoteModal = (type = "care") => {
    setQuoteType(type);
    setFormSubmitted(false);
    setQuoteModalOpen(true);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-blue-950 text-slate-200 text-xs sm:text-sm py-2 px-4 border-b border-blue-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Contact direct :{" "}
                <strong className="text-white">+221 78 256 70 70</strong>
              </span>
            </span>
            <span className="hidden md:flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Interventions 7j/7 - Support 24h/24</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full text-xs font-medium border border-amber-500/30">
              Votre bien être, notre priorité
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Malaika */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollToSection("hero")}
            >
              <div className="w-24 h-24 rounded-2xl items-center justify-center transform group-hover:scale-105 transition-transform">
                <Image
                  src={logo}
                  alt="Malaika Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-blue-950 block leading-none">
                  MALAIKA
                </span>
                <span className="text-[11px] font-bold tracking-widest text-amber-600 uppercase block mt-1">
                  Conseils & Services
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 font-semibold text-slate-600">
              {isCare ? (
                <>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-amber-600 transition-colors py-2 text-sm"
                  >
                    Nos services
                  </button>
                  <button
                    onClick={() => scrollToSection("zones")}
                    className="hover:text-amber-600 transition-colors py-2 text-sm"
                  >
                    Informations utiles
                  </button>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="hover:text-amber-600 transition-colors py-2 text-sm"
                  >
                    FAQ
                  </button>
                </>
              ) : isConsulting ? (
                <>
                  <button
                    onClick={() => scrollToSection("portals")}
                    className="hover:text-amber-600 transition-colors py-2 text-sm"
                  >
                    Nos Pôles
                  </button>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="hover:text-amber-600 transition-colors py-2 text-sm"
                  >
                    Comment ça marche
                  </button>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="hover:text-amber-600 transition-colors py-2 text-sm"
                  >
                    FAQ
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => scrollToSection("portals")}
                    className="hover:text-amber-600 transition-colors py-2 text-sm"
                  >
                    Nos Pôles
                  </button>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="hover:text-amber-600 transition-colors py-2 text-sm"
                  >
                    Comment ça marche
                  </button>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="hover:text-amber-600 transition-colors py-2 text-sm"
                  >
                    FAQ
                  </button>
                </>
              )}
            </nav>

            {/* Header Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {isCare ? (
                user ? (
                  <button
                    onClick={() =>
                      router.push(
                        `user?.role !== "INDIVIDUAL" ? "/backoffice/care/profil" : "/care/profil"`,
                      )
                    }
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-amber-500/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>
                      {user?.firstName} {user?.lastName}
                    </span>
                    {user?.isEmergencyContact ? null : (
                      <>
                        <TriangleAlert className="w-5 h-5 fill-red/20" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      router.push(
                        `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`,
                      )
                    }
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-amber-500/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Accéder à mon espace</span>
                  </button>
                )
              ) : isConsulting ? (
                <button
                  onClick={() => openQuoteModal("care")}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-amber-500/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Nous contacter
                </button>
              ) : (
                <button
                  onClick={() => router.push("/care/quote")}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-amber-500/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Obtenir un devis gratuit
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
            {isCare ? (
              <>
                <button
                  onClick={() => scrollToSection("services")}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  Nos Services
                </button>
                <button
                  onClick={() => scrollToSection("zones")}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  Informations utiles
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  Questions fréquentes
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal("care")}
                    className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl text-center shadow-md"
                  >
                    Accéder à mon espace
                  </button>
                </div>
              </>
            ) : isConsulting ? (
              <>
                <button
                  onClick={() => scrollToSection("portals")}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  Nos Pôles
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  Comment ça marche
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  Questions fréquentes
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal("care")}
                    className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl text-center shadow-md"
                  >
                    Demander un devis
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => scrollToSection("portals")}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  Nos Pôles
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  Comment ça marche
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  Questions fréquentes
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal("care")}
                    className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl text-center shadow-md"
                  >
                    Demander un devis
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}
