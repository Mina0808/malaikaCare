"use client";

import { useFormState } from "react-dom";
import { sendResetEmail } from "./actions";

export default function Form() {
  const [state, formAction] = useFormState(sendResetEmail, { _errors: [] });
  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <label
          htmlFor="email"
          className="block text-xl font-medium leading-6 text-gray-900"
        >
          Entrez votre adresse email et nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-xl sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-gunmetal px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-gunmetal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Envoyer le lien de réinitialisation
        </button>
      </div>
    </form>
  );
}
