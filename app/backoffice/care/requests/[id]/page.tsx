"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Loader from "../../../loading";
import { getUserById, updateRequestFront, updateUserStatus, getRequestById, getDocumentsByRequest } from "@/Services/ServicesFront/users";
import { faCircleChevronLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getButtonByRequestStatus, getButtonByUserStatus, translateRequestStatus, translateRequestType } from '@/Services/ServicesFront/keywords';
import { Badge } from '@/components/badge';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import FileUploader, { getFileType } from '@/components/fileField';
import { XMarkIcon } from "@heroicons/react/24/outline";
import { sendEmailQuoteValidated, sendEmailUserDesactivated, sendEmailUserReactivated } from '@/lib/emails/mailer';
import { getProfessionalFromSession, getToken } from '@/lib/session';

export default function Page({
    params,
}: {
    params: { id: string };
}) {

    const [client, setClient] = useState<any>(null)
    const [user, setUser] = useState<any>(null)
    const [request, setRequest] = useState<any>(null)
    const [documents, setDocuments] = useState<any[]>([])
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    async function fetchData(id: number) {
        const user = await getProfessionalFromSession(await getToken())
        setUser(user)
        const req = await getRequestById(id)
        setRequest(req)
        if (req) {
            const client = await getUserById(req?.clientId, "INDIVIDUAL")
            setClient(client)
        }
        const documents = await getDocumentsByRequest(id)
        setDocuments(documents)
        setLoading(false)
    }

    async function newStatus(status: string, id: string) {
        const result = await Swal.fire({
            title: 'Confirmation',
            text: "Vous êtes sur le point de mettre à jour le statut de l'utilisateur",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui, valider !',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            Swal.fire('Soumis !', 'Le statut a été mis à jour.', 'success');
            let stat = "ACTIF"
            if (status === "ACTIF") {
                stat = "INACTIF"
                sendEmailUserDesactivated(client.lastName, client.firstName, client.email)
            }
            else
                sendEmailUserReactivated(client.lastName, client.firstName, client.email)
            await updateUserStatus(stat, id, "INDIVIDUAL")
            //sendEmailQuote(formData)
            toast.success("Le statut a bien été mis à jour");
            router.push(`/`)
        } else {
            Swal.fire('Annulé', 'La mise à jour a été annulée.', 'error');
        }
    }

    async function updateRequest(status: string, type: string, id: number, userId: string) {
        let confirmation_text = ""
        if (status === "SUBMITTED")
            if (type === "QUOTE")
                confirmation_text = "fermer la demande de devis"
            else
                confirmation_text = "fermer la demande de renseignement"
        const result = await Swal.fire({
            title: 'Confirmation',
            text: "Vous êtes sur le point de " + confirmation_text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui, valider !',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            Swal.fire('Soumis !', 'La demande a été mise à jour.', 'success');
            await updateRequestFront(status, id, client.id)
            if (type == "QUOTE")
                sendEmailQuoteValidated(client.lastName, client.firstName, client.email)
            toast.success("La demande a bien été mise à jour");
            router.push(`/backoffice/care/requests`)
        } else {
            Swal.fire('Annulé', 'La mise à jour a été annulée.', 'error');
        }
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

    function removeDocuments(deletedDoc: any) {
        const docs = JSON.parse(JSON.stringify(documents));
        for (let i = 0; i < documents.length; i++) {
            if (docs.at(i)?.name == deletedDoc.name) {
                docs.splice(i, 1)
            }
        }
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
                        <div className="w-full mb-3 flex flex-row">
                            <label className={`border-5 px-3 placeholder-blueGray-300 text-blueGray-600 ${client?.status === "ACTIF" ? "bg-green-300" : "bg-red-300"} flex justify-center items-center rounded rounded-lg focus:outline-none focus:ring ease-linear transition-all duration-150 h-14 py-2 px-4`}>{client?.status}</label>
                            <button type="button" onClick={() => { newStatus(client?.status, client?.id) }} className='rounded-md flex items-center bg-blue-400 text-white border border-gray-300 ml-2 xl:ml:0 py-2 px-4 rounded shadow-xl hover:bg-blue-500 transition-all'>
                                {getButtonByUserStatus(client?.status)}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Prénom et nom</label>
                            <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{client?.firstName} {client?.lastName}</label>
                        </div>
                        <div className="w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Email</label>
                            <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{client?.email}</label>
                        </div>
                        <div className="w-full mb-3">
                            <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Numéro de téléphone</label>
                            <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{client?.phone}</label>
                        </div>

                        {client?.address ?
                            <div className="w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Adresse</label>
                                <label className="border-5 px-3 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{client.address}</label>
                            </div>
                            :
                            <div className="w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Adresse</label>
                                <label className="border-5 px-3 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">A renseigner</label>
                            </div>
                        }
                        {client?.city ?
                            <div className="w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Ville</label>
                                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{client.city}</label>
                            </div>
                            :
                            <div className="w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-md font-bold mb-2">Ville</label>
                                <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">A renseigner</label>
                            </div>
                        }
                    </div>
                </section>

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
                            <div className='flex flex-col mb-3 items-center flex'>
                                <h1 className="text-lg font-bold mb-2">Documents complémentaires</h1>
                                {documents.map((doc, index) => (
                                    <div key={index} className='flex flex-row'>
                                        <div className='text-lg font-bold'>
                                            {doc.name}
                                        </div>
                                        {user.role == "ADMIN" && (
                                            <button type="button" onClick={() => { removeDocuments(doc) }} className="text-xl text-red-500 hover:text-red-800">
                                                <XMarkIcon className="w-7 h-7" />
                                            </button>
                                        )}
                                        <FontAwesomeIcon icon={faEye} className="mx-2" />

                                    </div>
                                ))}
                                <div className='flex items-start justify-start'>
                                    <FileUploader title="Ajouter un document" onFileSelect={(file) => { newDocuments(file) }} type="pdf" />
                                </div>
                                {/*Bouton de mise à jour de la requête*/}
                            </div>
                        </div>
                    </div>
                </section>
                {request.status !== "FINISHED" && (
                    <div className='my-3 flex items-center justify-center'>
                        <button type="button" className='bg-yellow-700 hover:bg-yellow-900 text-xl text-black p-3 m-3 shadow-xl rounded-lg flex justify-center items-center' onClick={() => { updateRequest(request.status, request.type, request.id, request.userId) }}>
                            {getButtonByRequestStatus(request.status)}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}