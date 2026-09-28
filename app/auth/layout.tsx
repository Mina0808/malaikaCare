"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import logo from "@/images/logo malaika.jpg";
import bg from "@/images/img_malaika.png";
import Loader from "./loading";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Heart,
  Building2,
  HelpCircle,
  KeyRound,
} from "lucide-react";

export default function Auth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-blue-950/5 text-slate-800 font-sans antialiased flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900 relative overflow-hidden">
        {/* Decorative Background Circles */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-blue-900/10 blur-3xl pointer-events-none"></div>

        {/* TOP HEADER / NAVIGATION */}
        <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between relative z-10">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-950 font-bold text-xs sm:text-sm transition-colors bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-amber-600" />
            <span>Retour au site principal</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-200/60">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">
              Espace client sécurisé (SSL)
            </span>
            <span className="sm:hidden">Espace sécurisé</span>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 relative z-10">
          {children}
        </main>
        {/* FOOTER */}
        <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-slate-400 relative z-10">
          <p>
            © 2026 Malaika Conseils & Services Sénégal. Tous droits réservés.
          </p>
        </footer>
      </div>
    </>
  );
}
