"use client";

import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "@/app/backoffice/loading";
import { createInterventionFront, listBackofficeUsers } from "@/Services/ServicesFront/users";
import { User } from "lucide-react";
import { listClients } from "@/Services/ServicesBack/users";

export default function Form() {
    const router = useRouter()
    //let professionalC = useRef<any>([])
    const [pC, setPC] = useState<string[][]>([])
    const [loading, setLoading] = useState(true)
    const [errorTime, setErrorTime] = useState("")
    const [selectedClient, setSelectedClient] = useState(false)
    const [selectedProfessional, setSelectedProfessional] = useState(false)
    const [clients, setClients] = useState<string[][]>([])
    const [professionals, setProfessionals] = useState<string[][]>([])
    const [clientQuery, setClientQuery] = useState("")
    const [professionalQuery, setProfessionalQuery] = useState("")
    const [errors, setErrors] = useState({
        lastName: "" as string,
        firstName: "" as string,
        mail: "" as string,
        phone: "" as string,
    })
    const [validForm, setValidForm] = useState(true)
    const [formData, setFormData] = useState({
        clientId: "" as string,
        client: "" as string,
        professionalId: "" as string,
        professional: "" as string,
        address: "" as string,
        date: Date.now(),
        startHour: 0,
        endHour: 0,
        startMinutes: 0,
        endMinutes: 0,
        professionalRole: "" as string,
        diplomas: true,
        service: "" as string,
    });
    const filteredClients = clients.filter((item) =>
        item[1].toLowerCase().includes(clientQuery.toLowerCase())
    );
    const filteredProfessionals = pC.filter((item: string[]) =>
        item[1].toLowerCase().includes(professionalQuery.toLowerCase())
    );

    async function fetchData() {
        const { clients } = await listClients()
        const clientList: string[][] = []
        clients.forEach((item) => {
            if (item.address) {
                const client = [item.id, `${item.firstName} ${item.lastName}`, item.address]
                clientList.push(client)
            }
            else {
                const client = [item.id, `${item.firstName} ${item.lastName}`]
                clientList.push(client)
            }
        })
        setClients(clientList)

        const { users } = await listBackofficeUsers()
        const userList: string[][] = []
        users.forEach((item) => {
            if (item.role == "NURSE") {
                if (item.assistant) {
                    const user = [item.id, `${item.firstName} ${item.lastName}`, "ASSISTANT NURSE"]
                    userList.push(user)
                }
                else {
                    const user = [item.id, `${item.firstName} ${item.lastName}`, "NURSE"]
                    userList.push(user)
                }
            }
            else {
                const user = [item.id, `${item.firstName} ${item.lastName}`, item.role]
                userList.push(user)
            }

        })
        setPC(userList)
        setLoading(false)
        setProfessionals(userList)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (event: React.ChangeEvent<{ name: string; value: string }>) => {
        const { name, value } = event.target;
        console.log(value)
        if (name == "professionalRole") {
            console.log(professionals)
            setFormData((prevState) => ({ ...prevState, [name]: value }));
            setPC(professionals.filter((item) => item[2] == value))
        }
        if (name == "diplomas") {
            if (value == "true")
                setFormData((prevState) => ({ ...prevState, [name]: true }));
            else
                setFormData((prevState) => ({ ...prevState, [name]: false }));
        }
        else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }

    };

    const checkTime = () => {
        if (formData.startHour - formData.endHour > 0 || (formData.startHour == formData.endHour && formData.startMinutes > formData.endMinutes))
            return { result: false, msg: `L'heure de début (${formData.startHour}) ne peut pas être supérieure à l'heure de fin (${formData.endHour}) ${formData.startHour - formData.endHour}` }
        if (formData.startHour < 0 || formData.endHour < 0 || formData.startHour > 23 || formData.endHour > 23 || formData.startMinutes < 0 || formData.endMinutes < 0 || formData.startMinutes > 59 || formData.endMinutes > 59)
            return { result: false, msg: "Le format n'est pas conforme" }
        if (formData.startHour==formData.endHour && formData.startMinutes==formData.endMinutes)
            return { result: false, msg: "Merci de sélectionner un créneau" }
        return { result: true, msg: "xxx" }
    }

    const handleSubmit = async () => {
        setErrorTime("")
        const res = checkTime()
        if (res.result) {
            const result = await Swal.fire({
                title: 'Confirmation',
                text: "Vous êtes sur le point de soumettre le formulaire.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Annuler',
                confirmButtonText: 'Oui, soumettre !',
                reverseButtons: true,
            });

            if (result.isConfirmed) {
                Swal.fire('Soumis !', 'Le formulaire a été soumis.', 'success');
                await createInterventionFront(formData)
                toast.success("La demande a été soumise");
                router.push(`/backoffice/care/users`)
            } else {
                Swal.fire('Annulé', 'La soumission a été annulée.', 'error');
            }
        }
        else {
            setErrorTime(res.msg)
        }

    };

    // const { control, setValue, handleSubmit } = useForm({
    //   defaultValues: {
    //     typeProducts: [] as any[]
    //   }
    // });

    const validateForm = () => {
        let valid = true

        if (!formData.clientId) {
            valid = false
        }

        if (!formData.professionalId) {
            valid = false
        }

        if (!formData.professionalRole) {
            valid = false
        }

        if (!formData.service) {
            valid = false
        }

        if (!formData.address) {
            valid = false
        }

        setValidForm(valid);
    };

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        router.push(`/`)
    }

    useEffect(() => {
        validateForm();
    }, [formData]);

    // const handleFileSelect = (file: any, type: string) => {
    //   if (file) {
    //     const newFiles = [...formData.piecesJustificatives];
    //     const updatedFiles = newFiles.map(doc =>
    //       doc.type === type ? {
    //         ...doc,
    //         "file": file
    //       } : doc
    //     );
    //     const hasElement = newFiles.some(file => file.type === type);

    //     if (!hasElement) {
    //       updatedFiles.push({
    //         "type": type,
    //         "file": file
    //       });
    //     }
    //     setFormData({ ...formData, piecesJustificatives: updatedFiles });
    //   }
    //   else {
    //     const newFiles = formData.piecesJustificatives.filter((doc: { type: string }) => doc.type !== type);
    //     setFormData({ ...formData, piecesJustificatives: newFiles }); // Supprime le fichier
    //   }
    // };

    if (loading)
        return (
            <Loader />)
    return (

        <form className=" rounded-lg bg-white mt-15 border border-gray-400 shadow-2xl">
            <div className="flex justify-between">
                <h6 className="text-blueGray-400 text-lg xl:text-3xl px-4 pt-4 font-bold uppercase mb-3">
                    Nouvelle intervention
                </h6>
                <button
                    onClick={() => router.back()}
                    className="text-xs mr-3 font-bold text-amber-600 hover:underline flex items-center gap-1"
                >
                    ← Retour au Tableau de bord
                </button>
            </div>
            <div className="flex flex-col">
                <div>
                    <h2 className="text-xs pt-4 pl-4 font-black uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        1. Informations sur le l'intervention
                    </h2>
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex flex-col w-full">
                            <div className="w-full px-4 mt-3">
                                <div className="w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                                        Client <span className="text-red-500">*</span>
                                    </label>
                                    <input name="client" id="client" type="text"
                                        value={clientQuery}
                                        placeholder="Rechercher..."
                                        required
                                        onChange={(e) => {
                                            setClientQuery(e.target.value)
                                            setSelectedClient(false)
                                        }}
                                        className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                    {clientQuery && !selectedClient && (
                                        <ul className="w-full bg-white border rounded mt-1 max-h-48 overflow-auto">
                                            {filteredClients.map((item) => (
                                                <li
                                                    key={item[0]}
                                                    onClick={() => {
                                                        setSelectedClient(true)
                                                        setFormData((prevState) => ({ ...prevState, ["client"]: item[1] }));
                                                        setFormData((prevState) => ({ ...prevState, ["clientId"]: item[0] }));
                                                        if (item[3])
                                                            setFormData((prevState) => ({ ...prevState, ["address"]: item[3] }));
                                                        setClientQuery(item[1]);
                                                    }}
                                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                >
                                                    {item[1]}
                                                </li>
                                            ))}

                                            {filteredClients.length === 0 && (
                                                <li className="px-3 py-2 text-gray-500">
                                                    Aucun résultat
                                                </li>
                                            )}
                                        </ul>
                                    )}

                                    {/* {formData.client && (
                                        <p className="mt-2">
                                            Sélection : <strong>{formData.client}</strong>
                                        </p>
                                    )} */}
                                </div>
                                {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                            </div>
                            <div className="w-full px-4 mt-3">
                                <div className=" w-full mb-3">
                                    <label htmlFor="montant" className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2">
                                        Date de l'intervention <span className="text-red-500 text-sm">*</span>
                                    </label>
                                </div>
                                <div className="mt-2 rounded-md shadow-sm">
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        lang="fr-FR"
                                        className="w-full border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14"
                                        value={formData.date}
                                        onChange={handleChange}
                                        min={Date.now()}
                                        required
                                    />
                                </div>
                                {errors.mail && <p className="text-red-500 text-sm">{errors.mail}</p>}
                            </div>
                            <div className="w-full px-4 mt-3">
                                <div className="w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                                        Service
                                    </label>
                                    <input name="service" id="service" type="text" defaultValue={formData.service} onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <div className="w-full px-4 mt-3">
                                <div className="w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                                        Adresse de l'intervention <span className="text-red-500">*</span>
                                    </label>
                                    <input name="address" id="address" type="text" defaultValue={formData.address} required onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                </div>
                                {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                            </div>
                            <div className="w-full px-4 mt-3">
                                <div className=" w-full mb-3">
                                    <label htmlFor="montant" className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2">
                                        Heure de l'intervention <span className="text-red-500 text-sm">*</span>
                                    </label>
                                </div>
                                <div className=" flex flex-row mt-2 rounded-md shadow-sm">
                                    <input type="number"
                                        onChange={handleChange}
                                        value={formData.startHour}
                                        name="startHour" id="startHour" required className="border-5 w-1/4 px-2 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                    <span className="font-bold text-xl flex items-center px-2">:</span>
                                    <input type="number"
                                        onChange={handleChange}
                                        value={formData.startMinutes}
                                        name="startMinutes" id="startMinutes" required className="border-5 w-1/4 px-2 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                    <span className="font-bold text-xl flex items-center px-2">-</span>
                                    <input type="number"
                                        onChange={handleChange}
                                        value={formData.endHour}
                                        name="endHour" id="endHour" required className="border-5 w-1/4 px-2 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                    <span className="font-bold text-xl flex items-center px-2">:</span>
                                    <input type="number"
                                        onChange={handleChange}
                                        value={formData.endMinutes}
                                        name="endMinutes" id="endMinutes" required className="border-5 w-1/4 px-2 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                </div>
                                {errorTime && <p className="text-red-500 text-sm">{errorTime}</p>}
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <h2 className="text-xs border-t border-slate-200 pt-4 pl-4 font-black uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        2. Informations sur l'intervenant
                    </h2>
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex flex-col w-full">
                            <div className="p-5 rounded-2xl flex lg:flex-col sm:flex-row lg:items-start sm:items-center gap-4">
                                <label
                                    htmlFor="colisFragile"
                                    className="block uppercase text-blueGray-600 xl:text-md font-bold text-slate-900 text-sm"
                                >
                                    Poste <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center space-x-6 px-4">
                                    <label
                                        id="typeCompte"
                                        className="inline-flex items-center cursor-pointer font-medium text-sm text-slate-700"
                                    >
                                        <input
                                            onChange={handleChange}
                                            checked={formData.professionalRole == "DOCTOR"}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                            type="radio"
                                            name="professionalRole"
                                            value="DOCTOR"
                                        />{" "}
                                        <span className="ml-2">Docteur</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer font-medium text-sm text-slate-700">
                                        <input
                                            onChange={handleChange}
                                            checked={formData.professionalRole == "NURSE"}
                                            type="radio"
                                            name="professionalRole"
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                            value="NURSE"
                                        />{" "}
                                        <span className="ml-2">Infirmier</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer font-medium text-sm text-slate-700">
                                        <input
                                            onChange={handleChange}
                                            checked={formData.professionalRole == "ASSISTANT NURSE"}
                                            type="radio"
                                            name="professionalRole"
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                            value="ASSISTANT NURSE"
                                        />{" "}
                                        <span className="ml-2">Infirmier assistant</span>
                                    </label>
                                </div>
                            </div>
                            {formData.professionalRole.includes("NURSE") && (
                                <div className="w-full mb-3 p-5">
                                    <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                                        Intervenant <span className="text-red-500">*</span>
                                    </label>
                                    <input name="professional" id="professional" type="text"
                                        value={professionalQuery}
                                        placeholder="Rechercher..."
                                        required
                                        onChange={(e) => {
                                            setProfessionalQuery(e.target.value)
                                            setSelectedProfessional(false)
                                            console.log(pC)
                                        }}
                                        className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                    {professionalQuery && !selectedProfessional && (
                                        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-48 overflow-auto">
                                            {filteredProfessionals.map((item: string[]) => (
                                                <li
                                                    key={item[0]}
                                                    onClick={() => {
                                                        setSelectedProfessional(true)
                                                        setFormData((prevState) => ({ ...prevState, ["professional"]: item[1] }));
                                                        setFormData((prevState) => ({ ...prevState, ["professionalId"]: item[0] }));
                                                        setProfessionalQuery(item[1]);
                                                    }}
                                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                >
                                                    {item[1]}
                                                </li>
                                            ))}

                                            {filteredProfessionals.length === 0 && (
                                                <li className="px-3 py-2 text-gray-500">
                                                    Aucun résultat
                                                </li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                            {formData.professionalRole.includes("NURSE") && (
                                <div className="p-5 rounded-2xl flex lg:flex-col sm:flex-row lg:items-start sm:items-center gap-4">
                                    <label
                                        htmlFor="colisFragile"
                                        className="block uppercase text-blueGray-600 xl:text-md font-bold text-slate-900 text-sm"
                                    >
                                        Personne diplômée <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center space-x-6 px-4">
                                        <label
                                            id="typeCompte"
                                            className="inline-flex items-center cursor-pointer font-medium text-sm text-slate-700"
                                        >
                                            <input
                                                onChange={handleChange}
                                                checked={formData.diplomas}
                                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                                type="radio"
                                                name="diplomas"
                                                value="true"
                                            />{" "}
                                            <span className="ml-2">Oui</span>
                                        </label>
                                        <label className="inline-flex items-center cursor-pointer font-medium text-sm text-slate-700">
                                            <input
                                                onChange={handleChange}
                                                checked={!formData.diplomas}
                                                type="radio"
                                                name="diplomas"
                                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                                value="false"
                                            />{" "}
                                            <span className="ml-2">Non</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                            {formData.professionalRole == "DOCTOR" && (
                                <div className="w-full mb-3 p-5">
                                    <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                                        Intervenant <span className="text-red-500">*</span>
                                    </label>
                                    <input name="professional" id="professional" type="text"
                                        value={professionalQuery}
                                        placeholder="Rechercher..."
                                        required
                                        onChange={(e) => {
                                            setProfessionalQuery(e.target.value)
                                            setSelectedProfessional(false)
                                        }}
                                        className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                    {professionalQuery && !selectedProfessional && (
                                        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-48 overflow-auto">
                                            {filteredProfessionals.map((item: string[]) => (
                                                <li
                                                    key={item[0]}
                                                    onClick={() => {
                                                        setSelectedProfessional(true)
                                                        setFormData((prevState) => ({ ...prevState, ["professional"]: item[1] }));
                                                        setFormData((prevState) => ({ ...prevState, ["professionalId"]: item[0] }));
                                                        setProfessionalQuery(item[1]);
                                                    }}
                                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                >
                                                    {item[1]}
                                                </li>
                                            ))}

                                            {filteredProfessionals.length === 0 && (
                                                <li className="px-3 py-2 text-gray-500">
                                                    Aucun résultat
                                                </li>
                                            )}
                                        </ul>
                                    )}

                                    {formData.professional && (
                                        <p className="mt-2">
                                            Sélection : <strong>{formData.professional}</strong>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <div className=" flex justify-end gap-4 mt-3 mb-6 p-4">
                <button
                    className="flex items-center bg-red-200 text-gray-800 border border-gray-300 py-2 px-4 rounded shadow-xl hover:bg-red-300 transition-all"
                    onClick={(e) => { handleCancel(e) }}
                >
                    <FontAwesomeIcon icon={faXmark} className="mr-2" />
                    <span className="hidden sm:inline-block   xl:inline-block" >Annuler</span>
                </button>
                <div className="flex flex-wrap gap-8">
                    <button
                        className="flex items-center bg-green-400 disabled:bg-gray-300 text-gray-800 border border-gray-300 py-2 px-4 rounded shadow-xl hover:bg-green-500 transition-all"
                        type="button"
                        onClick={handleSubmit}
                        disabled={!validForm}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        <span className="hidden sm:inline-block   xl:inline-block" >Soumettre</span>
                    </button>
                </div>
            </div>
        </form>
    );
}

