"use client";

import { useEffect, useState } from "react";
import { getToken, getUserFromSession } from "@/lib/session";
import { updateUserFront } from "@/Services/ServicesFront/users";
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
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const [countries, setCountries] = useState<{
        id: number;
        name: string;
        category: string;
        subCategory: string | null;
    }[]>([])

    const [formData, setFormData] = useState({
        firstName: "" as string,
        lastName: "" as string,
        phone: "" as string,
        address: "" as string,
        country: "" as string,
        city: "" as string,
    })
    const router = useRouter()

    async function fetchData() {
        const user = await getUserFromSession(getToken())
        setUser(user)
        const countries = await getlistReferentials("COUNTRY")
        setCountries(countries)


        setFormData({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            phone: user?.phone || "",
            address: user?.address || "",
            country: user?.country || "",
            city: user?.city || "",
        });
        setLoading(false)
    }

    useEffect(() => {
        router.prefetch(`/care/profil`)
        fetchData()
    }, [])

    const handleChange = async (event: React.ChangeEvent<{ name: string; value: string }>) => {
        const { name, value } = event.target;
        console.log(name, ": ", value)
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }


    async function handleSubmit() {
        console.log("form", formData)
        console.log("user", user)
        await updateUserFront(user?.id, formData)
        router.push(`/care/profil`)
    }

    if (loading)
        return (
            <Loader />)

    return (
        <form className="flex gap-4">
            <button type="button" className="flex justify-start items py-2 px-4 rounded transition-all fa-2xl"
                onClick={() => router.back()}>
                <FontAwesomeIcon icon={faCircleChevronLeft} className="mr-2" />
            </button>
            <div className="space-y-6 bg-white border border-gray-400 shadow-2xl rounded-lg container mx-auto overflow-y-auto py-3 flex flex-col gap-10 border">
                <h3 className="text-blueGray-400 text-2xl mt-3 mb-6 p-2 font-bold uppercase">Informations utilisateur</h3>
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
                            />
                        </div>
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
                                defaultValue={formData.firstName}
                            />
                        </div>
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
                                value={user?.email}
                                disabled
                            />
                        </div>
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
                    </div>
                    <div className="py-2">
                        <label
                            htmlFor="address"
                            form="address"
                            className="block text-xl font-medium leading-6 text-gray-900"
                        >
                            Adresse
                        </label>
                        <div className="pt-2">
                            <input
                                id="address"
                                name="address"
                                autoComplete="address"
                                className="input"
                                defaultValue={formData.address}
                                onChange={e => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                    </div>
                    <div className="py-2">
                        <label
                            htmlFor="country"
                            form="country"
                            className="block text-xl font-medium leading-6 text-gray-900"
                        >
                            Pays
                        </label>
                        <div className="pt-2">
                            <select
                                id="country"
                                name="country"
                                className="input"
                                value={formData.country}
                                onChange={e => {
                                    handleChange(e);
                                }}
                            >
                                <option value="">Sélectionnez un pays</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.name} className="text-xl">
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="py-2">
                        <label
                            htmlFor="city"
                            form="city"
                            className="block text-xl font-medium leading-6 text-gray-900"
                        >
                            Ville
                        </label>
                        <div className="pt-2">
                            <input
                                id="city"
                                name="city"
                                autoComplete="city"
                                className="input"
                                defaultValue={formData.city}
                                onChange={e => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        name="type"
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