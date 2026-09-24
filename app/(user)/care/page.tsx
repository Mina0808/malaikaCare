"use client"
import { useState, useEffect } from "react";
import Loader from "../loading";
import Image from "next/image";
import logo from "@/images/logo_malaika_care.png";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getDocumentsByPageFront } from "@/Services/ServicesFront/documents";


export const dynamic = "force-dynamic";

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [slides, setSlides] = useState([] as any[])

  async function fetchData() {
    const slide = await getDocumentsByPageFront("home")
    slide.map((item) => {
      const url = "/file/" + item.name
      item.name = url
    })
    setSlides(slide)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading)
    return (
      <Loader />)
  return (
    <div className="w-full flex flex-col justify-center items-center sm:px-0">
      {/* <h1 className="py-4 font-bold text-xl">TITRE DE LA PAGE</h1> */}
      <div className="w-full sm:px-0">
        {/* <h1 className="py-4 font-bold text-xl">TITRE DE LA PAGE</h1> */}
        <div className='flex flex-col items-center justify-center'>
          <div className="bg-white m-1 pb-10 flex items-center flex-col rounded-lg shadow-xl">
            <Image
              src={logo}
              alt="logo"
              className="w-[30%] h-auto"
              priority
            />
            {/* <h1 className="text-5xl font-bold text-yellow-700">Malaika Care</h1> */}
            <div className="flex flex-col justify-center items-center mt-10 border">
              <div className={"text-lg mt-3 px-10"}>
                Malaika Care est le pôle de soins et de services à domicile de Malaika Conseils & Services.<br />
                Nous intervenons chez vous avec des équipes qualifiées, disponibles 7j/7, pour prendre soin de vous et de vos proches.
              </div>
              <h2 className="text-3xl font-bold mt-10 mb-1 text-blue-900">Soins et suivis médicaux à domicile</h2>
              <h3 className='text-xl font-bold my-2 text-emerald-700'>Soins infirmiers</h3>
              <div className={"text-lg mt-3 px-10"}>
                Injections, pansements, suivis post-opératoires réalisés à domicile par des professionnels qualifiés.
              </div>
              <h3 className='text-xl font-bold my-2 text-emerald-700'>Garde malade & nursing</h3>
              <div className={"text-lg mt-3 px-10"}>
                Accompagnement continu pour les patients fragiles, avec une présence humaine et rassurante.
              </div>
              <h3 className='text-xl font-bold my-2 text-emerald-700'>Accompagnement hospitalier</h3>
              <div className={"text-lg mt-3 px-10"}>
                Présence pendant les hospitalisations et coordination complète des parcours de soins.
              </div>
              <h3 className='text-xl font-bold my-2 text-emerald-700'>Médecins à domicile</h3>
              <div className={"text-lg mt-3 px-10 mb-10"}>
                Consultations médicales réalisées au domicile du patient, sans déplacement.
              </div>
              <h2 className="text-3xl font-bold mt-10 mb-1 text-blue-900">Service à la personne - une offre complète</h2>
              <h3 className='text-xl font-bold my-2 text-emerald-700'>Entretien et logistique</h3>
              <div className={"text-lg mt-3 px-10 "}>
                Ménage, repassage, jardinage, livraison de courses ou repas, mise à disposition de chauffeur, transport avec location voiture incluse.
              </div>
              <h3 className='text-xl font-bold my-2 text-emerald-700'>Bien-être et accompagnement</h3>
              <div className={"text-lg mt-3 px-10"}>
                Soins esthétiques, massages, dame de compagnie pour personnes âgées, garde d'animaux.
              </div>
              <h3 className='text-xl font-bold my-2 text-emerald-700'>Services familiaux et administratifs</h3>
              <div className={"text-lg mt-3 px-10"}>
                Garde d'enfants, garde baptême, cours à domicile, assistance dans les démarches administratives, conseil juridique.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}