"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { register as SignUp } from "./actions";
import { getlistReferentials } from "@/Services/ServicesFront/referentials";
import { callingCountries } from "country-data";
import { PasswordInput } from "@/components/password-input";
import { Mail, Lock, ArrowRight } from "lucide-react";

function SubmitButton({
  isValid,
  isAgreed,
}: {
  isValid: boolean;
  isAgreed: boolean;
}) {
  const { pending } = useFormStatus();
  const disabled = pending || !isValid || !isAgreed;
  return (
    <button
      type="submit"
      name="type"
      value="submit"
      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-base py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 flex items-center justify-center gap-2 group mt-2"
      aria-disabled={disabled}
      disabled={disabled}
    >
      <span>S&rsquo;inscrire</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

export default function Form() {
  //   const {
  //     register,
  //     formState: { isValid },
  //     formState: { errors },
  //     reset,
  //     setValue,
  //     getValues
  //   } = useForm({ mode: "onChange" });
  //   const [state, formAction] = useFormState(SignUp, []);
  //   const [cities, setCities] = useState<{
  //     id: number;
  //     value: string;
  //     label: string;
  //     type: string;
  //   }[]>([])
  //   const [agree, setAgree] = useState<boolean>(false)
  //   const [openIndic, setOpenIndic] = useState(false)
  //   const [valueIndic, setValueIndic] = useState("")
  //   const [countries, setCountries] = useState<{
  //     id: number;
  //     name: string;
  //     category: string;
  //     subCategory: string|null;
  //   }[]>([])

  //   const handleClick = () => {
  //     setOpenIndic(!openIndic)
  //   }

  //   const handleIndicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setValueIndic(e.target.value)
  //     setValue("indic", e.target.value)
  //     console.log(e.target.value)
  //     console.log(" values", getValues())
  //   }

  //   const handleCountryChange = async (eventCountry: React.ChangeEvent<HTMLSelectElement>) => {
  //     //Liste des villes
  //     const country = eventCountry.target.value

  //     //Indicateur téléphonique
  //     const code = countries.find(item => item.label === country)?.value
  //     console.log("code ", code)
  //     if (code) {
  //       setValueIndic(callingCountries[code]?.countryCallingCodes[0])
  //       setValue("indic", callingCountries[code]?.countryCallingCodes[0])
  //     }

  //   }
  //   const handleCheckboxChange = () => {
  //     setAgree(!agree)
  //   }

  //   async function fetchData() {
  //     const countries = await getlistReferentials("COUNTRY")
  //     setCountries(countries)

  //   }

  //   useEffect(() => {
  //     fetchData()
  //   }, [])

  //   const openWindow = (url: string) => {
  //     window.open(url, '_blank')
  //   }

  return <></>;
}
