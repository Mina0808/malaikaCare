"use client"
export const dynamic = "force-dynamic";

import { getToken, getUserFromSession } from "@/lib/session";
import { faCircleChevronLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../loading";
import Link from "next/link";

export default function Profil() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    const user = await getUserFromSession(getToken())
    setUser(user)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading)
    return (
      <Loader />)

  return (
    <div className="flex flex-col gap-4">
      <button className="flex justify-start items py-2 px-4 rounded transition-all fa-2xl"
        onClick={() => router.back()}>
        <FontAwesomeIcon icon={faCircleChevronLeft} className="mr-2" />
      </button>
      <div className="grid grid-cols-1 bg-white border border-gray-400 shadow-2xl rounded-lg container mx-auto overflow-y-auto py-3 border">
        <h1 className="text-3xl font-bold mb-4">Page de profil</h1>

      </div>
      <div className="grid grid-cols-1 bg-white border border-gray-400 shadow-2xl rounded-lg container mx-auto overflow-y-auto py-3 border">
        <section className="flex flex-col mt-5">
          <h3 className="text-2xl font-bold mb-4">Informations concernant l'utilisateur</h3>
          <div className="grid grid-cols-2">
            <div className="w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Prénom et nom</label>
              <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user?.firstName} {user?.lastName}</label>
            </div>
            <div className="w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Email</label>
              <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user?.email}</label>
            </div>
            <div className="w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Numéro de téléphone</label>
              <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user?.phone}</label>
            </div>

            {user?.address && (
              <div className="w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Adresse</label>
                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user.address}</label>
              </div>
            )}
            {user?.country && (
              <div className="w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Pays</label>
                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user.country}</label>
              </div>
            )}
            {user?.city && (
              <div className="w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Ville</label>
                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user.city}</label>
              </div>
            )}

          </div>
          <div className="flex justify-start">
            <Link
              className="flex items-center bg-white text-gray-800 border border-gray-300 py-2 px-4 rounded shadow-xl hover:bg-gray-300 transition-all"
              href={`/profil/edit/${user.id}`}
              type="button"
            >
              <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
              <span className="hidden sm:inline-block xl:inline-block">
                Modifier les informations
              </span>

            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

