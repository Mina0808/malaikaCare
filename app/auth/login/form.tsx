"use client";

import Link from "next/link";
import { redirect, useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { PasswordInput } from "@/components/password-input";
import { login } from "./actions";
import ConfirmedMessage from "./confirmation";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";

function SubmitButton({
  isValid,
  isDirty,
}: {
  isValid: boolean;
  isDirty: boolean;
}) {
  const { pending } = useFormStatus();
  const disabled = pending || !isValid || !isDirty;
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-base py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 flex items-center justify-center gap-2 group mt-2"
      aria-disabled={disabled}
      disabled={disabled}
    >
      <span>Se connecter</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

function ErrorMessage() {
  return (
    <div
      className="bg-rose-50 text-rose-700 border border-rose-200 text-xs px-4 py-3 rounded-xl flex items-center gap-2"
      role="alert"
    >
      <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0"></span>
      <span>Email ou mot de passe incorrect.</span>
    </div>
  );
}

export default function Form() {
  const [state, formAction] = useFormState(login, null);
  const { pending } = useFormStatus();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const backNoRedirect = ["/care/quote", "/care/contact"];
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    formState: { isDirty, isValid },
  } = useForm<any>();

  if (state?.redirectTo) {
    if (!redirect) {
      router.push("/care");
    } else {
      if (state.redirectTo === "/") {
        router.push(redirect);
      } else {
        if (backNoRedirect.includes(redirect)) router.push("/backoffice/care");
        else router.push("/backoffice" + redirect);
      }
    }
  }

  return (
    <>
      <Suspense fallback={null}>
        <ConfirmedMessage />
      </Suspense>
      <form className="space-y-5" action={formAction}>
        {state?._errors && <ErrorMessage />}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Adresse email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-slate-50/50 focus:bg-white transition-all font-medium text-slate-800 placeholder-slate-400"
              {...register("email", { required: true })}
              placeholder="Email"
              tabIndex={1}
              autoFocus
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
            >
              Mot de passe
            </label>
            <a
              href="/auth/forgot-password"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline transition-colors"
            >
              Oublié ?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <PasswordInput
              id="password"
              required
              tabIndex={2}
              {...register("password", { required: true })}
            />
          </div>
          {/* SE SOUVENIR DE MOI */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
              />
              <span className="text-xs text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                Se souvenir de moi
              </span>
            </label>
          </div>
        </div>

        {state && <ClipLoader color="#1190ba" />}

        <div>
          <SubmitButton isValid={isValid} isDirty={isDirty} />
        </div>
      </form>
    </>
  );
}
