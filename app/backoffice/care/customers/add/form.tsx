"use client";

import { faCircleChevronLeft, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "@/app/backoffice/loading";
import { emailValidFront, createUserFront } from "@/Services/ServicesFront/users";

export default function Form() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
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
    city: "" as string,
    country: "" as string,
    documents: [] as any,
  });

  async function fetchData() {
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = (event: React.ChangeEvent<{ name: string; value: string }>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

  };
  const handleSubmit = async () => {
    const emailValid = await emailValidFront(formData.email, "INDIVIDUAL")
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
        await createUserFront(formData, "INDIVIDUAL")
        //sendEmailQuote(formData)
        toast.success("La demande a été soumise");
        router.push(`/backoffice/care/customers`)
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
      <h6 className="text-blueGray-400 text-md xl:text-3xl px-4 pt-4 font-bold uppercase">
        Nouvel utilisateur
      </h6>
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
                Adresse
              </label>
              <input name="address" id="address" type="text" defaultValue={formData.address} onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
            </div>
          </div>
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
          <div className="w-full px-4 mt-3">
            <div className="w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                Ville
              </label>
              <input name="city" id="city" type="text" defaultValue={formData.city} onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
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

