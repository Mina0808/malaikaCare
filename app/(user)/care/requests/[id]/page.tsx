"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Loader from "../../../loading";
import { getUserById, getBeneficiaryByRequest, getRequestById, getDocumentsByRequest } from "@/Services/ServicesFront/users";
import { faCircleChevronLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { translateRequestStatus, translateRequestType } from '@/Services/ServicesFront/keywords';
import { Badge } from '@/components/badge';
import FileUploader, { getFileType } from '@/components/fileField';

export default function Page({
    params,
}: {
    params: { id: string };
}) {

    const [user, setUser] = useState<any>(null)
    const [beneficiary, setBeneficiary] = useState<any>(null)
    const [request, setRequest] = useState<any>(null)
    const [documents, setDocuments] = useState<any[]>([])
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    async function fetchData(id: number) {
        const req = await getRequestById(id)
        setRequest(req)
        if (req) {
            const user = await getUserById(req?.userId)
            if (req.benefactorId) {
                const beneficiary = await getBeneficiaryByRequest(req?.benefactorId)
                setBeneficiary(beneficiary)
            }
            setUser(user)
        }
        const documents = await getDocumentsByRequest(id)
        setDocuments(documents)
        setLoading(false)
    }

    function newDocuments(newDocs: FileList) {
    const docs = JSON.parse(JSON.stringify(documents));
    for (let i = 0; i < newDocs?.length; i++) {
      const extension = newDocs.item(i)?.name.split(".").pop()
      if (extension) {
        docs.push({ name: newDocs.item(i)?.name, type: getFileType(extension), file: newDocs.item(i) })
      }
    }
    console.log("new", newDocs)
    setDocuments(docs)
  }

    useEffect(() => {
        console.log("fetch ", params)
        fetchData(Number(params?.id))
    }, [])


    if (loading)
        return (
            <Loader />)

    return (
        <div>
            <button className="items-center py-2 px-4 rounded transition-all fa-2xl"
                onClick={() => router.back()}>
                <FontAwesomeIcon icon={faCircleChevronLeft} className="mr-2" />
            </button>
            <div className="m-4 grid grid-cols-1 border">
                <section className="flex flex-col mt-5 bg-white border border-gray-400 shadow-2xl rounded-lg container mx-auto overflow-y-auto py-3">
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2">Informations concernant l'utilisateur</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2">
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

                        {user?.address ?
                            <div className="w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Adresse</label>
                                <label className="border-5 px-3 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user.address}</label>
                            </div>
                            :
                            <div className="w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Adresse</label>
                                <label className="border-5 px-3 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">A renseigner</label>
                            </div>
                        }
                        {user?.country ?
                            <div className="w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Pays</label>
                                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user.country}</label>
                            </div>
                            :
                            <div className="w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Pays</label>
                                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">A renseigner</label>
                            </div>
                        }
                        {user?.city ?
                            <div className="w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Ville</label>
                                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user.city}</label>
                            </div>
                            :
                            <div className="w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Ville</label>
                                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">A renseigner</label>
                            </div>
                        }
                    </div>
                </section>
                {beneficiary && (
                    <section className="flex flex-col mt-5 bg-white border border-gray-400 shadow-2xl rounded-lg container mx-auto overflow-y-auto py-3">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold mb-2">Bénéficiaire</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2">
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
                            </div>
                        </div>
                    </section>
                )}

                <section className="flex flex-col mt-5 bg-white border border-gray-400 shadow-2xl rounded-lg container mx-auto overflow-y-auto py-3">
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2">Détail de la requête</h3>
                        <div className="flex flex-col">
                            <div className='grid grid-cols-1 md:grid-cols-2'>
                            <div className='flex flex-col mb-3'>
                                <h1 className="text-lg font-bold mb-2">Type de requête</h1>
                                <div className='text-lg'>
                                    {translateRequestType(request.type)}
                                </div>
                            </div>
                            <div className='flex flex-col mb-3'>
                                <h1 className="text-lg font-bold mb-2">État de la requête</h1>
                                <div className='text-lg'>
                                    <Badge text={translateRequestStatus(request.status)} color='blue' size="medium" />
                                </div>
                            </div>
                            </div>
                            <div className='flex flex-col mb-3'>
                                <h1 className="text-lg font-bold mb-2">Objet de la demande</h1>
                                <div className='text-lg'>
                                    {request.text}
                                </div>
                            </div>
                            <div className='flex flex-col mb-3'>
                                <h1 className="text-lg font-bold mb-2">Documents complémentaires</h1>
                                {documents.map((doc,index)=>(
                                    <div key={index} className='flex flex-row'>
                                        <div className='text-lg font-bold'>
                                            {doc.name}
                                        </div>
                                        <FontAwesomeIcon icon={faEye} className="mx-2" />
                                    {/*{nom du document + bouton de visualisation}*/}
                                </div>
                                ))}
                                <FileUploader title="Ajouter un document" onFileSelect={(file) => { newDocuments(file) }} type="pdf" />
                                {/* <button type='button' className='bg-blue-400 hover:bg-blue-600 w-1/4 text-xl text-black py-1 m-3 shadow-xl rounded-lg flex justify-center items-center' >
                                    Ajouter un document
                                </button> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}