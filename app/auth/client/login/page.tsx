import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import AuthDivider from "@/components/auth-divider";
import Loader from "@/app/(user)/loading";
import Form from "./form";
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

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre compte",
};

export default function Login() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="w-full max-w-md">
        {/* LOGIN CARD */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-10 relative overflow-hidden">
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-amber-400 to-blue-900"></div>

          {/* BRANDING LOGO */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-amber-500/25 mb-4 transform hover:scale-105 transition-transform cursor-pointer">
              M
            </div>
            <h1 className="text-2xl font-black text-blue-950 tracking-tight">
              MALAIKA
            </h1>
            <span className="text-[11px] font-bold tracking-widest text-amber-600 uppercase mt-0.5">
              Care
            </span>
            <p className="text-xs text-slate-500 mt-2">
              Connectez-vous à votre espace membre
            </p>
          </div>
          <AuthDivider />

          <Form />
          {/* CARD FOOTER */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Vous n'avez pas encore de compte client ?{" "}
              <a
                href="/auth/register"
                className="font-extrabold text-blue-950 hover:text-amber-600 transition-colors underline underline-offset-2"
              >
                Créer un compte
              </a>
            </p>
          </div>
        </div>
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Besoin d'aide pour accéder à votre compte ?</span>
          </p>
          <p className="text-xs font-bold text-slate-700">
            Assistance Malaika Care :{" "}
            <span className="text-amber-600">+221 78 256 70 70</span>
          </p>
        </div>
      </div>
    </Suspense>
  );
}
