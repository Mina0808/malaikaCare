"use client";

import { useFormState } from "react-dom";
import { sendResetEmail } from "./actions";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Form() {
  const [state, formAction] = useFormState(sendResetEmail, { _errors: [] });
  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Entrez votre adresse email et nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-slate-50/50 focus:bg-white transition-all font-medium text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-base py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 flex items-center justify-center gap-2 group mt-2"
        >
          Envoyer le lien de réinitialisation
        </button>
      </div>
    </form>
  );
}
