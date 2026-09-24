"use client";

import { useEffect, useState } from "react";
import { getEmergencyContactById, getUserById, updateEmergencyContactFront } from "@/Services/ServicesFront/users";
import { useRouter } from "next/navigation";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "@/app/(user)/loading";
import { getlistReferentials } from "@/Services/ServicesFront/referentials";



export default function Page({
    params,
}: {
    params?: { id: string };
}) {
    const userId = params?.id
    const [emergency, setEmergency] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({
        lastName: "" as string,
        firstName: "" as string,
        mail: "" as string,
        phone: "" as string,
    })
    const [validForm, setValidForm] = useState(false)
    const [countries, setCountries] = useState<{
        id: number;
        name: string;
        category: string;
        subCategory: string | null;
    }[]>([])

    const [formData, setFormData] = useState({
        firstName: "" as string,
        lastName: "" as string,
        email: "" as string,
        phone: "" as string,
    })
    const router = useRouter()

    async function fetchData(id?: string) {
        if (id) {
            const emergency = await getEmergencyContactById(id)
            setEmergency(emergency)
        }
        const countries = await getlistReferentials("COUNTRY")
        setCountries(countries)


        setFormData({
            firstName: emergency?.firstName || "",
            lastName: emergency?.lastName || "",
            phone: emergency?.phone || "",
            email: emergency?.email || "",
        });
        setLoading(false)
    }

    useEffect(() => {
        router.prefetch(`/care/profil`)
        fetchData(params?.id)

    }, [])

    const handleChange = async (event: React.ChangeEvent<{ name: string; value: string }>) => {
        const { name, value } = event.target;
        console.log(name, ": ", value)
        setFormData((prevState) => ({ ...prevState, [name]: value }));


    }


    async function handleSubmit() {
        if (userId) {
            console.log("form", formData)
            console.log("id", userId)
            await updateEmergencyContactFront(formData, userId, emergency?.id)
            router.push(`/care/profil`)
        }
    }

    const validateForm = () => {
        let errors = { firstName: "", lastName: "", mail: "", phone: "", text: "" };
        let valid = true

        if (!formData.firstName) {
            valid = false
        }

        if (!formData.lastName) {
            valid = false
        }

        if (!formData.phone && !formData.email) {
            errors.mail = "Merci de rentrer une adresse mail ou un numéro de téléphone"
            valid = false
        }
        else {
            if (formData.phone && !/\+\d{1,3}\s?\d{8,14}/.test(formData.phone)) {
                errors.phone = "Merci de rentrer un numéro valide avec l'indicatif du pays"
                valid = false
            }

            if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
                errors.mail = "L'adresse mail n'est pas valide";
                valid = false
            }
        }

        setErrors(errors);
        setValidForm(valid);
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    if (loading)
        return (
            <Loader />)

    return (
        <form className="flex gap-4">
            <button type="button" className="flex justify-start items py-2 px-4 rounded transition-all fa-2xl"
                onClick={() => router.back()}>
                <FontAwesomeIcon icon={faCircleChevronLeft} className="mr-2" />
            </button>
            <div className="space-y-6 bg-white border border-gray-400 shadow-2xl rounded-lg container mx-auto overflow-y-auto py-3 flex flex-col gap-10 border mt-3">
                <h3 className="text-blueGray-400 text-2xl mt-3 mb-6 p-2 font-bold uppercase">Informations du contact d'urgence</h3>
                <div className="grid grid-cols-2 gap-8">
                    <div className="">
                        <label
                            htmlFor="lastName"
                            className="block text-xl font-medium leading-6 text-gray-900"
                        >
                            Nom
                        </label>
                        <div className="pt-2">
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                className="input"
                                defaultValue={formData.lastName}
                                onChange={e => {
                                    handleChange(e);
                                }}
                                required
                            />
                        </div>
                        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                    </div>

                    <div className="">
                        <label
                            htmlFor="firstName"
                            className="block text-xl font-medium leading-6 text-gray-900"
                        >
                            Prénom
                        </label>
                        <div className="pt-2">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                className="input"
                                required
                                defaultValue={formData.firstName}
                                onChange={e => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
                    </div>

                    <div className="py-2">
                        <label
                            htmlFor="email"
                            className="block text-xl font-medium leading-6 text-gray-900"
                        >
                            Adresse email
                        </label>
                        <div className="pt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="input"
                                defaultValue={formData.email}
                                onChange={e => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                        {errors.mail && <p className="text-red-500">{errors.mail}</p>}
                    </div>

                    <div className="py-2">
                        <label
                            htmlFor="indic"
                            className="block text-xl font-medium leading-6 text-gray-900"
                        >
                            Numéro de téléphone
                        </label>
                        <div className="flex pt-2">
                            <input
                                id="phone"
                                name="phone"
                                type="phone"
                                autoComplete="phone"
                                className="input"
                                defaultValue={formData.phone}
                                onChange={e => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        name="type"
                        disabled={!validForm}
                        onClick={() => { handleSubmit() }}
                        className="rounded-md bg-blue px-3 py-2.5 text-xl w-full font-semibold leading-6 text-white shadow-sm hover:bg-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:focus-visible:outline-gray-400"
                    >
                        Valider les modifications
                    </button>
                </div>
            </div>
        </form>
    );
}