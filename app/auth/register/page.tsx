import Link from "next/link";
import { Suspense } from "react";
import AuthDivider from "@/components/auth-divider";
import Loader from '../loading'
import Form from "./form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Inscription",
};

export default async function Register() {
  return (
      <Suspense fallback={ <Loader />}>
      <h2 className="text-center text-2xl font-bold leading-9 text-gray-900">
        Inscription
      </h2>
      <AuthDivider />

      <Form />

      <p className="mt-4 text-xl text-gray-500">
        Vous avez déjà un compte ?{" "}
        <Link
          href="/auth/login"
          className="font-semibold leading-6 text-gunmetal underline hover:text-blue-500"
        >
          Se connecter
        </Link>
      </p>
      </Suspense>    
  );
}
