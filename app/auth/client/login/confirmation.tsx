"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from 'react'
import Loader from "@/app/(user)/loading";

export default function ConfirmedMessage() {
  const confirmed = useSearchParams().get("confirmed");
  if (!confirmed) return <div />;
  return (
    <Suspense fallback={ <Loader />}>
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">
        Votre compte est actif ! Vous pouvez vous connecter.
      </span>
    </div>
    </Suspense>
  );
}
