"use client";

import Link from "next/link";
import { redirect, useSearchParams, useRouter } from "next/navigation";
import {  Suspense} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { PasswordInput } from "@/components/password-input";
import { login } from "./actions";
import ConfirmedMessage from "./confirmation";

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
      className="flex w-full justify-center flex items-center bg-blue-400 text-white  text-sm xl:text-xl border border-gray-300 py-2 px-4 rounded shadow-xl hover:bg-blue-500 transition-all"
      aria-disabled={disabled}
      disabled={disabled}
    >
      Se connecter
    </button>
  );
}

function ErrorMessage() {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">Email ou mot de passe incorrect.</span>
    </div>
  );
}

export default function Form() {

  const [state, formAction] = useFormState(login, null);
  const { pending } = useFormStatus();
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")
  const backNoRedirect = ["/care/quote","/care/contact"]
  const router = useRouter()

  const {
    register,
    formState: { isDirty, isValid },
  } = useForm<any>();
  
  if (state?.redirectTo) {
    if (!redirect){
      router.push("/care")
    }
    else{
      if (state.redirectTo==="/"){
      router.push(redirect)
    }
    else{
      if (backNoRedirect.includes(redirect))
        router.push("/backoffice/care")
      else
        router.push("/backoffice"+redirect)
    }
    }
    
  }
  
  return (
    <>
      <Suspense fallback={null}>
        <ConfirmedMessage />
      </Suspense>
      <form className="space-y-6 w-full" action={formAction}>
        {state?._errors && <ErrorMessage />}
        <div>
          <label
            htmlFor="email"
            className="block text-md xl:text-2xl font-medium leading-6 text-gray-900 filter-none"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="input border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm xl:text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14"
              {...register("email", { required: true })}
              placeholder="Email"
              tabIndex={1}
              autoFocus
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-md xl:text-2xl font-medium leading-6 text-gray-900"
            >
              Mot de passe
            </label>
          </div>
          <div className="mt-2">
            <PasswordInput
              id="password"
              required
              tabIndex={2}
              {...register("password", { required: true })}
            />
          </div>
          <div className="text-base underline mt-2">
              <Link
                href="/auth/forgot-password"
                className="font-semibold text-gunmetal hover:text-blue-500 "
              >
                Mot de passe oublié ?
              </Link>
          </div>
        </div>


        { state && (<ClipLoader color="#1190ba" />)}
        
        <div>
          <SubmitButton isValid={isValid} isDirty={isDirty} />
        </div>
      </form>
    </>
  );
}
