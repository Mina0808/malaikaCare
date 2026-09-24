import { Suspense } from 'react'
import AuthDivider from "@/components/auth-divider";
import Loader from '../loading'
import Form from "./form";

export default function ForgotPassword() {
  return (
    <>
    <Suspense fallback={ <Loader />}>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Réinitialisation du mot de passe
      </h2>
      <AuthDivider />
      <Form />
      </Suspense>
    </>
  );
}
