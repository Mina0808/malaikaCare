import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from 'react'
import AuthDivider from "@/components/auth-divider";
import Loader from '../loading'
import Form from "./form";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre compte",
};

export default function Login() {
  return (
      <Suspense fallback={ <Loader />}>
      <h2 className="text-center w-full text-3xl xl:text-5xl font-thin leading-9 text-gray-900">
        Connexion
      </h2>
      <AuthDivider />

      <Form />

      {/* <p className="mt-10 text-md xl:text-2xl font-thin text-gray-500">
        Vous n'avez pas de compte ?{" "}
        <Link
          href="/auth/register"
          className="font-semibold leading-6 text-gunmetal underline hover:text-blue-500"
        >
          S'inscrire
        </Link>
      </p> */}
      </Suspense>
  );
}
