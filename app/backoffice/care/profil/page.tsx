"use client"
export const dynamic = "force-dynamic";

import { getToken, getUserFromSession } from "@/lib/session";
import { translateRole } from "@/Services/ServicesFront/keywords";
import { getStatsFront } from "@/Services/ServicesFront/users";
import { faCircleChevronLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../loading";
import Link from "next/link";

export default function Profil() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Map<string, number>>(new Map())
  const router = useRouter()
  let phone = ""


  async function fetchData() {
    const user = await getUserFromSession(getToken())
    setUser(user)

    //Informations clients
    const stat = await getStatsFront()
    setStats(stat)
    setLoading(false)

    // //Informations commandes
    // const nbPackges = await getPackageCount()
    // setNbPack(nbPackges)
    // const nbPackgesDelivered = await getPackageCount(StatusPackage.DELIVERED)
    // setNbPackDelivered(Math.round((nbPackgesDelivered / nbPackges) * 100))
    // const nbPackgesUndelivered = await getPackageCount(StatusPackage.UNDELIVERABLE)
    // setNbPackUndelivered(Math.round((nbPackgesUndelivered / nbPackges) * 100))
    // const nbPackgesCreated = await getPackageCount(StatusPackage.CREATED)
    // const nbPackgesSubmitted = await getPackageCount(StatusPackage.SUBMITTED)
    // const nbPackgesCorrection = await getPackageCount(StatusPackage.AWAITING_CORRECTION)
    // const montantTotal = await getMontantFront()
    // if (montantTotal) setMontant(montantTotal)
    // setNbPackActive(Math.round(((nbPackges - (nbPackgesUndelivered + nbPackgesCreated + nbPackgesSubmitted + nbPackgesCorrection)) / nbPackges) * 100))
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading)
    return (
      <Loader />)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col 2xl:flex-row">
        <button className="flex justify-start items py-2 px-4 rounded transition-all fa-2xl"
          onClick={() => router.back()}>
          <FontAwesomeIcon icon={faCircleChevronLeft} className="mr-2" />
          <h1 className="text-3xl font-bold mb-8 text-blue-600 items-center">Page de profil</h1>
        </button>
      </div>
      <div className="grid grid-cols-1 bg-white border border-gray-400 shadow-2xl rounded-lg container mx-auto overflow-y-auto py-8 border">
        <div className="grid grid-cols-3 gap-2">
          <section className="flex flex-col gap-6">
            <div className="grid grid-cols-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold mb-4">Nombre de clients <label className="text-xl font-bold ml-4">{stats.get("client")} clients</label></h3>

              </div>
            </div>
          </section>
          <section className="flex flex-col gap-6">
            <div className="grid grid-cols-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold mb-4">Les demandes de devis <label className="text-xl font-bold ml-4"> {stats.get("quote")} </label></h3>
                <div className="flex flex-col">
                  <label className="text-xl font-normal"> {stats.get("submittedQuote")} demandes soumises</label>
                    <label className="text-xl font-normal"> {stats.get("receivedQuote")} demandes en cours de traitement</label>
                  <label className="text-xl font-normal"> {stats.get("finishedQuote")} demandes fermées</label>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-6">
            <div className="grid grid-cols-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold mb-4">Les demandes de renseignements <label className="text-xl font-bold ml-4">{stats.get("infos")}</label></h3>
                <div className="flex flex-col">
                    <label className="text-xl font-normal ml-4"> {stats.get("submittedInfos")} demandes soumises</label>
                    <label className="text-xl font-normal ml-4"> {stats.get("receivedInfos")} demandes en cours de traitement</label>
                  <label className="text-xl font-normal ml-4"> {stats.get("finishedInfos")} demandes fermées</label>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="grid grid-cols-1 bg-white border border-gray-400 shadow-2xl rounded-lg container mx-auto overflow-y-auto py-8 border">
        <section className="flex flex-col mt-5">
          <h3 className="text-2xl font-bold mb-8">Informations concernant l'utilisateur</h3>
          <div className="grid grid-cols-1 xl:grid-cols-2">
            <div className="w-full mb-6">
              <label className="block uppercase text-blueGray-600 text-md font-bold mb-4">Prénom et nom</label>
              <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user?.firstName} {user?.lastName}</label>
            </div>
            <div className="w-full mb-6">
              <label className="block uppercase text-blueGray-600 text-md font-bold mb-4">Email</label>
              <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user?.email}</label>
            </div>
            {phone !== "" && (
              <div className="w-full mb-6">
                <label className="block uppercase text-blueGray-600 text-md font-bold mb-4">Numéro de téléphone</label>
                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user?.phone}</label>
              </div>
            )}
            <div className="w-full mb-6">
              <label className="block uppercase text-blueGray-600 text-md font-bold mb-4">Profil</label>
              <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{translateRole(user?.role)}</label>
            </div>

            {user?.address && (
              <div className="w-full mb-6">
                <label className="block uppercase text-blueGray-600 text-md font-bold mb-4">Adresse</label>
                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user.address}</label>
              </div>
            )}
            {user?.country && (
              <div className="w-full mb-6">
                <label className="block uppercase text-blueGray-600 text-md font-bold mb-4">Pays</label>
                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user.country}</label>
              </div>
            )}
            {user?.city && (
              <div className="w-full mb-6">
                <label className="block uppercase text-blueGray-600 text-md font-bold mb-4">Ville</label>
                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user.city}</label>
              </div>
            )}
          </div>
          <div className="flex justify-start">
            <Link
              className="flex items-center bg-white text-gray-800 border border-gray-300 py-2 px-4 rounded shadow-xl hover:bg-gray-300 transition-all mt-6"
              href={`/backoffice/profil/edit/${user.id}`}
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
