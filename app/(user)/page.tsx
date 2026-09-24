"use client"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from "next/image";
import logo from "@/images/logo malaika.jpg";
import logoCare from "@/images/logo_malaika_care.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { getUserFromSession, getToken } from '@/lib/session';


export const dynamic = "force-dynamic";

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    fetchData()
  }, [])
  async function fetchData() {
    const user = await getUserFromSession(getToken());
    setUser(user)
    setLoading(false)
  }

  async function getCare() {
    if (!user) {
      router.push("/care")
      return
    }
    router.push(user?.role === "ADMIN" ? "/backoffice/care" : "/care")
  }
  function getConsulting() {
    router.push("/consulting")
  }
  return (
    <div className=" flex justify-center items-center md:block w-full">
      <div className="flex flex-col h-full">
        <div className="">
          <div className="">
            <div className="w-full flex flex-col pb-5 sm:px-0">
              <div className='w-full bg-white flex justify-center items-center'>
                <Image
                  src={logo}
                  alt="logo"
                  className="w-[40%] h-auto"
                  width={300}
                  height={300}
                  priority
                />
              </div>
              {/* <h1 className="py-4 font-bold text-xl">TITRE DE LA PAGE</h1> */}
              <div className='grid grid-cols-2 items-stretch'>
                <div className='flex flex-col p-12 h-full items-center justify-center bg-white mt-3 ml-10 mr-3 rounded-lg shadow-xl'>
                  <div className="flex items-center flex-col">
                    <Image
                      src={logoCare}
                      alt="logo"
                      className="w-[30%] h-auto"
                      width={300}
                      height={300}
                      priority
                    />
                    {/* <h1 className="text-5xl font-bold text-yellow-700">Malaika Care</h1> */}
                    <div className="flex flex-col justify-center items-center">
                      <div className={"text-lg mt-3 px-6"}>
                        Malaika Care est le pôle de soins et de services à domicile de Malaika Conseils & Services.<br />
                        Nous intervenons chez vous avec des équipes qualifiées, disponibles 7j/7, pour prendre soin de vous et de vos proches.
                      </div>
                      <button type="button" onClick={getCare} disabled={loading} className="bg-yellow-600 hover:bg-yellow-800 mt-10 text-xl p-2 rounded-lg shadow-lg disabled:opacity-50">Voir malaika Care</button>
                      <div className='grid grid-cols-2'>
                        <div className='px-4'>
                          <h2 className="text-2xl font-bold mt-10 mb-1 text-blue-900">Soins médicaux à domicile</h2>
                          <h3 className='text-xl my-2 '>Soins infirmiers</h3>
                          <h3 className='text-xl my-2 '>Garde malade & nursing</h3>
                          <h3 className='text-xl my-2 '>Accompagnement hospitalier</h3>
                          <h3 className='text-xl my-2 '>Médecins à domicile</h3>
                        </div>
                        <div className='px-4'>
                          <h2 className="text-2xl font-bold mt-10 mb-1 text-blue-900">Service à la personne</h2>
                          <h3 className='text-xl my-2 '>Entretien et logistique</h3>
                          <h3 className='text-xl my-2 '>Bien-être et accompagnement</h3>
                          <h3 className='text-xl my-2 '>Services familiaux et administratifs</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-12 h-full items-center rounded-lg shadow-xl bg-white mt-3 mr-10 ml-3">
                  <Image
                  src={logoCare}
                  alt="logo"
                  className="w-[30%] h-auto"
                  width={300}
                  height={300}
                  priority
                />
                  {/* <h1 className="text-5xl font-bold text-yellow-700">Malaika Consulting</h1> */}
                  <div className="flex flex-col justify-center items-center">
                    <div className={"text-lg mt-3 mb-10 px-6"}>
                      Nous accompagnons les organisations dans leur développement humain et organisationnel, avec des méthodologies éprouvées et une approche terrain.
                    </div>
                    <button type="button" onClick={getConsulting} disabled={loading} className="bg-yellow-600 hover:bg-yellow-800 mt-10 text-xl p-2 rounded-lg shadow-lg disabled:opacity-50">Voir malaika Consulting</button>
                    <div className='flex flex-row w-full justify-start items-start'>
                      <div className='flex flex-col justify-start items-start'>
                        <h2 className="text-2xl font-bold mt-8 mb-1 text-blue-900">Audits performance & qualité</h2>
                        <div className='text-xl my-2 ml-1'>
                          Diagnostic complet de vos processus internes, identification des leviers d'amélioration et recommandations actionnables.
                        </div>
                      </div>
                      <div className='flex flex-col justify-start items-start'>
                        <h2 className="text-2xl font-bold mt-8 mb-1 text-blue-900">Accompagnement au changement</h2>
                        <div className='text-xl my-2 ml-1'>
                          Conduite du changement humain et organisationnel pour réussir vos transformations avec l'adhésion de vos équipes.
                        </div>
                      </div>
                      <div className='flex flex-col justify-start items-start'>
                        <h2 className="text-2xl font-bold mt-8 mb-1 text-blue-900">Formations professionnelles</h2>
                        <div className='text-xl my-2 ml-1'>
                          Programmes sur mesure pour développer les compétences de vos collaborateurs et renforcer votre capital humain.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}