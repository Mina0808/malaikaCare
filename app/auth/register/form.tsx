"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { register as SignUp } from "./actions";
import { getlistReferentials } from "@/Services/ServicesFront/referentials";
import { callingCountries } from 'country-data';
import { PasswordInput } from "@/components/password-input";

function SubmitButton({ isValid, isAgreed }: { isValid: boolean, isAgreed: boolean }) {
  const { pending } = useFormStatus();
  const disabled = pending || !isValid || !isAgreed;
  return (
    <button
      type="submit"
      name="type"
      value="submit"
      className="rounded-md px-3 py-2.5 text-2xl text-white w-full flex justify-center items-center bg-blue-400 text-gray-800 border border-gray-300 py-2 px-4 rounded shadow-xl disabled:bg-gray-400 hover:bg-blue-500 transition-all"
      aria-disabled={disabled}
      disabled={disabled}
    >
      S&rsquo;inscrire
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

  return (
   <></> 
  );
}
