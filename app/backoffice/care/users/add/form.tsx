"use client";

import { faCircleChevronLeft, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "@/app/backoffice/loading";
import { emailValidFront, createUserFront } from "@/Services/ServicesFront/users";
import { User } from "lucide-react";

export default function Form() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState("")
    const [validEmail, setValidEmail] = useState(true)
    const [errors, setErrors] = useState({
        lastName: "" as string,
        firstName: "" as string,
        mail: "" as string,
        phone: "" as string,
    })
    const [validForm, setValidForm] = useState(false)
    const [formData, setFormData] = useState({
        lastName: "" as string,
        firstName: "" as string,
        email: "" as string,
        phone: "" as string,
        address: "" as string,
        workAddress: "" as string,
        role: "NURSE" as string,
        speciality: "" as string,
        diplomas: false,
        activity: false,
        assistant: false
    });

    async function fetchData() {
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (event: React.ChangeEvent<{ name: string; value: string }>) => {
        const { name, value } = event.target;
        if (name == "diplomas" || name == "assistant" || name == "activity") {
            if (value == "true")
                setFormData((prevState) => ({ ...prevState, [name]: true }));
            else
                setFormData((prevState) => ({ ...prevState, [name]: false }));
        }
        else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }

    };
    const handleSubmit = async () => {
        const emailValid = await emailValidFront(formData.email, "PROFESSIONAL")
        setValidEmail(emailValid)
        if (emailValid) {
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
                await createUserFront(formData, "PROFESSIONAL")
                toast.success("La demande a été soumise");
                router.push(`/backoffice/care/users`)
            } else {
                Swal.fire('Annulé', 'La soumission a été annulée.', 'error');
            }
        }

    };

    // const { control, setValue, handleSubmit } = useForm({
    //   defaultValues: {
    //     typeProducts: [] as any[]
    //   }
    // });

    const validateForm = () => {
        let errors = { firstName: "", lastName: "", mail: "", phone: "", text: "" };
        let valid = true

        if (!formData.firstName) {
            // errors.firstName = 'Le prénom est obligatoire';
            valid = false
        }

        if (!formData.lastName) {
            // errors.lastName = 'Le nom est obligatoire';
            valid = false
        }

        if (!formData.phone) {
            // errors.phone = 'Merci de rentrer un téléphone';
            valid = false
        }
        else if (!/\+\d{1,3}\s?\d{8,14}/.test(formData.phone)) {
            errors.phone = "Merci de rentrer un numéro valide avec l'indicatif du pays"
            valid = false
        }

        if (!formData.email) {
            // errors.mail = 'Email is required.';
            valid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.mail = "L'adresse mail n'est pas valide";
            valid = false
        }

        setErrors(errors);
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
            <button className="items-center py-2 px-4 rounded transition-all fa-2xl"
                onClick={(e) => { handleCancel(e) }}>
                <FontAwesomeIcon icon={faCircleChevronLeft} className="mr-2" />
            </button>
            <h6 className="text-blueGray-400 text-md xl:text-3xl px-4 pt-4 font-bold uppercase mb-3">
                Nouvel utilisateur
            </h6>
            <div className="flex flex-col">
                <div>
                    <h2 className="text-xs pt-4 pl-4 font-black uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        1. Informations générales
                    </h2>
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex flex-col w-full">
                            <div className="w-full px-4 mt-3">
                                <div className="w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                                        Nom <span className="text-red-500">*</span>
                                    </label>
                                    <input name="lastName" id="lastName" type="text" defaultValue={formData.lastName} required onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                </div>
                                {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                            </div>
                            <div className="w-full px-4 mt-3">
                                <div className=" w-full mb-3">
                                    <label htmlFor="montant" className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2">
                                        Adresse mail <span className="text-red-500 text-sm">*</span>
                                    </label>
                                </div>
                                <div className="mt-2 rounded-md shadow-sm">
                                    <input type="text"
                                        onChange={handleChange}
                                        defaultValue={formData.email}
                                        name="email" id="email" required className="border-5 px-10 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                </div>
                                {errors.mail && <p className="text-red-500 text-sm">{errors.mail}</p>}
                                {!validEmail && <p className="text-red-500 text-sm">Cette adresse mail est déjà utilisée</p>}
                            </div>
                            <div className="w-full px-4 mt-3">
                                <div className="w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                                        Adresse postale
                                    </label>
                                    <input name="address" id="address" type="text" defaultValue={formData.address} onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                </div>
                            </div>
                            {formData.activity && (
                                <div className="w-full px-4 mt-3">
                                    <div className="w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                                            Lieu de l'activité
                                        </label>
                                        <input name="workAddress" id="workAddress" type="text" defaultValue={formData.workAddress} onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col w-full">
                            <div className="w-full px-4 mt-3">
                                <div className="w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                                        Prénom <span className="text-red-500">*</span>
                                    </label>
                                    <input name="firstName" id="firstName" type="text" required defaultValue={formData.firstName} onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                </div>
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>
                            <div className="w-full px-4 mt-3">
                                <div className=" w-full mb-3">
                                    <label htmlFor="montant" className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2">
                                        Numéro de téléphone <span className="text-red-500">*</span>
                                    </label>
                                </div>
                                <div className="mt-2 rounded-md shadow-sm">
                                    <input type="text"
                                        onChange={handleChange}
                                        name="phone" id="phone" required defaultValue={formData.phone} className="border-5 px-10 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                </div>
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            <div className="p-5 rounded-2xl flex lg:flex-col sm:flex-row lg:items-start sm:items-center gap-4">
                                <label
                                    htmlFor="colisFragile"
                                    className="block uppercase text-blueGray-600 xl:text-md font-bold text-slate-900 text-sm"
                                >
                                    En activité <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center space-x-6 px-4">
                                    <label
                                        id="typeCompte"
                                        className="inline-flex items-center cursor-pointer font-medium text-sm text-slate-700"
                                    >
                                        <input
                                            onChange={handleChange}
                                            checked={formData.activity}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                            type="radio"
                                            name="activity"
                                            value="true"
                                        />{" "}
                                        <span className="ml-2">Oui</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer font-medium text-sm text-slate-700">
                                        <input
                                            onChange={handleChange}
                                            checked={!formData.activity}
                                            type="radio"
                                            name="activity"
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                            value="false"
                                        />{" "}
                                        <span className="ml-2">Non</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <h2 className="text-xs border-t border-slate-200 pt-4 pl-4 font-black uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        2. Informations sur le poste
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
                                            checked={formData.role == "DOCTOR"}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                            type="radio"
                                            name="role"
                                            value="DOCTOR"
                                        />{" "}
                                        <span className="ml-2">Docteur</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer font-medium text-sm text-slate-700">
                                        <input
                                            onChange={handleChange}
                                            checked={formData.role != "DOCTOR"}
                                            type="radio"
                                            name="role"
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                            value="NURSE"
                                        />{" "}
                                        <span className="ml-2">Infirmier</span>
                                    </label>
                                </div>
                            </div>
                            {formData.role == "NURSE" && (
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
                        </div>
                        <div className="flex flex-col w-full">
                            {formData.role == "DOCTOR" ?
                                <div className="w-full px-4 mt-3">
                                    <div className="w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                                            Spécialité
                                        </label>
                                        <input name="speciality" id="speciality" type="text" value={formData.speciality} defaultValue={formData.speciality} onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                                    </div>
                                </div> :
                                <div className="p-5 rounded-2xl flex lg:flex-col sm:flex-row lg:items-start sm:items-center gap-4">
                                    <label
                                        htmlFor="colisFragile"
                                        className="block uppercase text-blueGray-600 xl:text-md font-bold text-slate-900 text-sm"
                                    >
                                        Infirmier assistant <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center space-x-6 px-4">
                                        <label
                                            id="typeCompte"
                                            className="inline-flex items-center cursor-pointer font-medium text-sm text-slate-700"
                                        >
                                            <input
                                                onChange={handleChange}
                                                checked={formData.assistant}
                                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                                type="radio"
                                                name="assistant"
                                                value="true"
                                            />{" "}
                                            <span className="ml-2">Oui</span>
                                        </label>
                                        <label className="inline-flex items-center cursor-pointer font-medium text-sm text-slate-700">
                                            <input
                                                onChange={handleChange}
                                                checked={!formData.assistant}
                                                type="radio"
                                                name="assistant"
                                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                                value="false"
                                            />{" "}
                                            <span className="ml-2">Non</span>
                                        </label>
                                    </div>
                                </div>}
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

