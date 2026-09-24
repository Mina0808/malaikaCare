import { Suspense } from "react";
import Loader from '../loading'

export default function Confirmation() {
  return (
<Suspense fallback={ <Loader />}>
      <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Un email de confirmation vous a été envoyé.
      </h2>
      <hr className="my-8 bg-green-400 rounded" />
  </Suspense>
  );
}
