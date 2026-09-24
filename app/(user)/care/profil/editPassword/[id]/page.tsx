"use client";

import { useEffect, useState } from "react";
import { getToken, getUserFromSession } from "@/lib/session";
import { useRouter } from "next/navigation";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "@/app/(user)/loading";
import { PasswordInput } from "@/components/password-input";
import { checkPassword, getPassword, updatePassword } from "@/Services/ServicesFront/users";



export default function Page({
    params,
}: {
    params?: { id: string };
}) {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [oldPassword, setOldPassword] = useState("")
    const router = useRouter()
    const [validForm, setValidForm] = useState(false)
    const [errors, setErrors] = useState({
    oldPassword: "" as string,
    password: "" as string,
    confirmPassword: "" as string,
  })
    const [formData, setFormData] = useState({
        oldPassword: "" as string,
        password: "" as string,
        passwordConfirmation: "" as string,
    })

    async function fetchData() {
        const user = await getUserFromSession(getToken())
        if (user) {
            const oldPwd = await getPassword(user.id)
            setOldPassword(oldPwd?.password)
            setUser(user)
            setLoading(false)
        }
    }

    useEffect(() => {
        router.prefetch(`/care/profil`)
        fetchData()
    }, [])


    const validateForm = async () => {
    let errors = { oldPassword: "", password: "", confirmPassword: "" };
    let valid = true
    
      if (!await checkPassword(oldPassword, formData.oldPassword)) {
        valid = false
        errors.oldPassword="Le ,mot de passe est incorrect"
      }

      if (formData.password.length<8 || formData.password.length>50)
      {
        valid=false
        errors.password="Le mot de passe doit contenir entre 8 et 50 caractères"
      }

      if (formData.password != formData.passwordConfirmation) {
        valid = false
        errors.confirmPassword="Les mots de passe ne correspondent pas"
      }

    setErrors(errors);
    return valid
  };

    const handleChange = async (event: React.ChangeEvent<{ name: string; value: string }>) => {
        const { name, value } = event.target;
        console.log(formData)
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    async function handleSubmit() {
        if (await validateForm())
        {await updatePassword(user?.id, formData.password)
        router.push(`/care/profil`)}
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
                <h3 className="text-blueGray-400 text-2xl mt-3 mb-6 p-2 font-bold uppercase">Réinitialiser le mot de passe</h3>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-xl font-medium leading-6 text-gray-900"
                    >
                        Ancien mot de passe
                    </label>
                    <div className="mt-2">
                        <PasswordInput onChange={handleChange} id="oldPassword" name="oldPassword" required />
                    </div>
                    {errors.oldPassword && <p className="text-red-500">{errors.oldPassword}</p>}
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-xl font-medium leading-6 text-gray-900"
                    >
                        Nouveau mot de passe
                    </label>
                    <div className="mt-2">
                        <PasswordInput onChange={handleChange} id="password" name="password" required />
                    </div>
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-xl font-medium leading-6 text-gray-900"
                    >
                        Confirmer le nouveau mot de passe
                    </label>
                    <div className="mt-2">
                        <PasswordInput
                            onChange={handleChange}
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            required
                        />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div>
                    <button
                        onClick={handleSubmit}
                        type="button"
                        disabled={!formData.oldPassword||!formData.password||!formData.passwordConfirmation}
                        className="flex w-full disabled:bg-gray-500 justify-center rounded-md bg-gunmetal px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-gunmetal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        Réinitialiser le mot de passe
                    </button>
                </div>
            </div>
        </form>
    );
}
