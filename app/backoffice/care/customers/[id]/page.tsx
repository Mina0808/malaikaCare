"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Loader from "../../../loading";
import { getEmergencyContact, getUserById, getRequestsByUser, updateRequestFront, updateUserStatus, getBeneficiaryByRequest } from "@/Services/ServicesFront/users";
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getButtonByUserStatus, translateRequestStatus, translateRequestType } from '@/Services/ServicesFront/keywords';
import { Badge } from '@/components/badge';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { sendEmailUserDesactivated, sendEmailUserReactivated } from '@/lib/emails/mailer';

export default function Page({
    params,
}: {
    params: { id: string };
}) {

    const [user, setUser] = useState<any>(null)
    const [emergency, setEmergency] = useState<any>(null)
    const [requests, setRequests] = useState<any[]>([])
    const [beneficiaries, setBeneficiaries] = useState<Map<number, any>>(new Map())
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    async function fetchData(id: string) {
        const user = await getUserById(id)
        const emergency = await getEmergencyContact(id)
        const {requests, totalPages} = await getRequestsByUser(user)
        const requestBeneficiaries = new Map()
    for (let i = 0; i < requests.length; i++) {
      const req = requests[i]
      if (req.benefactorId) {
        const beneficiary = await getBeneficiaryByRequest(req.benefactorId)
        requestBeneficiaries.set(req.id, beneficiary)
      }
    }
    setBeneficiaries(requestBeneficiaries)
        setRequests(requests)
        setUser(user)
        setEmergency(emergency)
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
            if (status === "ACTIF"){
                stat = "INACTIF"
                sendEmailUserDesactivated(user.lastName, user.firstName, user.email)
            }
            else
                sendEmailUserReactivated(user.lastName, user.firstName, user.email)
            await updateUserStatus(id, stat)
            toast.success("Le statut a bien été mis à jour");
            router.push('/backoffice/care/customers')
        } else {
            Swal.fire('Annulé', 'La mise à jour a été annulée.', 'error');
        }
    }

    useEffect(() => {
        console.log("fetch ", params)
        fetchData(params?.id)
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
                            <label className={`border-5 px-3 placeholder-blueGray-300 text-blueGray-600 ${user?.status==="ACTIF"?"bg-green-300":"bg-red-300"} flex justify-center items-center rounded rounded-lg focus:outline-none focus:ring ease-linear transition-all duration-150 h-14 py-2 px-4`}>{user?.status}</label>
                            <button type="button" onClick={() => { newStatus(user?.status, user?.id) }} className='rounded-md flex items-center bg-blue-400 text-white border border-gray-300 ml-2 xl:ml:0 py-2 px-4 rounded shadow-xl hover:bg-blue-500 transition-all'>
                                {getButtonByUserStatus(user?.status)}
                            </button>
                        </div>
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
                <section className="flex flex-col mt-5 bg-white border border-gray-400 shadow-2xl rounded-lg container mx-auto overflow-y-auto py-3">
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2">Contact d'urgence</h3>
                        {emergency ?
                            <div className="w-full mb-3 flex flex-row">
                                <label className="border-5 px-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{user?.status}</label>
                            </div>
                            :
                            <div className="w-full mb-3 flex flex-row">
                                <label className="border-5 px-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">A renseigner</label>
                            </div>
                        }
                    </div>
                </section>
                <section className="flex flex-col mt-5 bg-white border border-gray-400 shadow-2xl rounded-lg container mx-auto overflow-y-auto py-3">
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2">Les demandes</h3>
                        {requests.map((request, index) => (
                            <div key={index} className="">
                                {requests?.indexOf(request)>0 &&(
                                    <hr className='my-3'/>
                                )}
                                <div className='flex flex-col mb-3'>
                                    <h1 className="text-lg font-bold mb-2">
                                        Demande n°{requests?.indexOf(request)+1}
                                    </h1>
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
                                </div>
                                <div className='mb-3'>
                                    <div className='flex flex-col'>
                                        <label className='text-lg font-bold mb-2'>Objet de la demande : </label>
                                        <div className='text-lg'>{request.text}</div>
                                    </div>
                                </div>
                                {request.benefactorId && (
                                    <div className='mb-3'>
                                        <div className='flex flex-col'>
                                            <label className='text-lg font-bold mb-2'>Bénéficiaire de la demande </label>
                                            <div>
                                                <div className="grid grid-cols-1 md:grid-cols-2">
                                                    <div className="w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-md mb-2">Prénom et nom</label>
                                                        <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{beneficiaries.get(request.id).firstName} {beneficiaries.get(request.id).lastName}</label>
                                                    </div>
                                                    {beneficiaries.get(request.id).email?
                                                    <div className="w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-md mb-2">Email</label>
                                                        <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{beneficiaries.get(request.id).email}</label>
                                                    </div>
                                                    :
                                                    <div className="w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-md mb-2">Email</label>
                                                        <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">Non renseigné</label>
                                                    </div>
                                                }
                                                    {beneficiaries.get(request.id).phone?
                                                    <div className="w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-md mb-2">Numéro de téléphone</label>
                                                        <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">{beneficiaries.get(request.id).phone}</label>
                                                    </div>
                                                    :
                                                    <div className="w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-md mb-2">Numéro de téléphone</label>
                                                        <label className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14">Non renseigné</label>
                                                    </div>
                                                }
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* <div className='mb-3'>
                                    <div className='flex flex-col'>
                                        <label className='text-lg font-bold mb-2'>Documents complémentaires </label>
                                        <div>{request.text}</div>
                                    </div>
                                </div> */}
                            </div>
                            
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}