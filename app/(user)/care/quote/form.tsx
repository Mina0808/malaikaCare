"use client";

import { faCircleChevronLeft, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../loading";
import { getToken, getUserFromSession } from "@/lib/session";
import FileUploader, { getFileType } from "@/components/fileField";
import { newRequest, getBenefactors } from "@/Services/ServicesFront/users";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { sendEmailQuote } from "@/lib/emails/mailer";

export default function Form() {
  const [user, setUser] = useState<any>(null)
  const [benefactors, setBenefactors] = useState<Map<string, any>>(new Map())
  const [isClient, setIsClient] = useState(true)
  const [addBenefactor, setAddBenefactor] = useState(false)
  const [docs, setDocs] = useState<{ name: string, type: string, file: File }[]>([])
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({
    lastName: "" as string,
    firstName: "" as string,
    mail: "" as string,
    phone: "" as string,
    text: "" as string,
  })
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    lastName: "" as string,
    firstName: "" as string,
    email: "" as string,
    phone: "" as string,
    clientLastName: "" as string,
    clientFirstName: "" as string,
    clientEmail: "" as string,
    clientPhone: "" as string,
    text: "" as string,
  });

  async function fetchData() {
    const user = await getUserFromSession(getToken())
    if (user != null) {
      const benefactors = await getBenefactors(user?.id)
      setFormData({
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        phone: user.phone,
        clientLastName: "",
        clientFirstName: "",
        clientEmail: "",
        clientPhone: "",
        text: "",
      });
      setBenefactors(benefactors)
    }
    setUser(user)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = (event: React.ChangeEvent<{ name: string; value: string }>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

  };

  const handleBenefactorChange = (event: React.ChangeEvent<{ name: string; value: any }>) => {
    console.log(event.target.name)
    console.log(event.target.value.lastName)
    const { name, value } = event.target;
    if (value){
      setFormData({
      ...formData,
      clientFirstName: benefactors.get(value).firstName,
      clientLastName: benefactors.get(value).lastName,
      clientEmail: benefactors.get(value).email,
      clientPhone: benefactors.get(value).phone,
    });
    }

  };
  const newBenefactor = () => {
    setAddBenefactor(!addBenefactor)
  }

  function newDocuments(newDocs: FileList) {
    const documents = JSON.parse(JSON.stringify(docs));
    for (let i = 0; i < newDocs?.length; i++) {
      const extension = newDocs.item(i)?.name.split(".").pop()
      if (extension) {
        documents.push({ name: newDocs.item(i)?.name, type: getFileType(extension), file: newDocs.item(i) })
      }
    }
    console.log("new", newDocs)
    setDocs(documents)
  }

  function removeDocuments(deletedDoc: any) {
    const documents = JSON.parse(JSON.stringify(docs));
    for (let i = 0; i < docs.length; i++) {
      if (documents.at(i)?.name==deletedDoc.name) {
        documents.splice(i,1)
      }
    }
    setDocs(documents)
  }

  const handleSubmit = async () => {
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
      await newRequest(formData, "QUOTE", user, docs)
      console.log("send email")
      sendEmailQuote(formData, docs)
      toast.success("La demande a été soumise");
      router.push(`/care`)
    } else {
      Swal.fire('Annulé', 'La soumission a été annulée.', 'error');
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
    else if (!/\+\d{1,3}\s?\d{5,14}/.test(formData.phone)) {
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


    if (!formData.text) {
      // errors.text = 'Merci de rentrer votre demande';
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
        Demande de devis
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
        </div>

      </div>
      <div>
        <div className="mt-6 ml-3 flex flex-row w-full">
          <label
            htmlFor="colisFragile"
            className="font-bold text-gray-900"
          >
            Êtes-vous le client ? <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col sm:flex-row ml-4">
            <label id="typeCompte" className="px-2">
              <input
                onChange={() => { setIsClient(true) }}
                checked={isClient}
                type="radio" name="client" value="OUI" /> Oui
            </label>
            <label className="px-2">
              <input
                onChange={() => { setIsClient(false) }}
                checked={!isClient}
                type="radio" name="client" value="NON" /> Non
            </label>
          </div>
        </div>
      </div>
      {!isClient && benefactors && (
        <div>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col w-full">
              <div className="w-full px-4 mt-3">
                <div className="w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                    Liste des bénéficiaires
                  </label>
                  <select
                    id="benefactor"
                    name="benefactor"
                    className="border-5 px-3 py-3 rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14"
                    defaultValue={"Sélectionner un bénéficiaire"}
                    onChange={e => {
                      handleBenefactorChange(e);
                    }}
                  >
                    <option value="">Sélectionnez un bénéficiaire</option>
                    {Array.from(benefactors.values()).map((benefactor: any, index: any) => (
                      <option key={index} value={benefactor.id} className="text-xl">
                        {benefactor.firstName} {benefactor.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {addBenefactor && (
                <div>
                  <div className="w-full px-4 mt-3">
                    <div className="w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                        Nom du client <span className="text-red-500">*</span>
                      </label>
                      <input name="clientLastName" id="clientLastName" type="text" defaultValue={formData.clientLastName} required onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                    </div>
                  </div>
                  <div className="w-full px-4 mt-3">
                    <div className=" w-full mb-3">
                      <label htmlFor="montant" className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2">
                        Adresse mail du client
                      </label>
                    </div>
                    <div className="mt-2 rounded-md shadow-sm">
                      <input type="text"
                        onChange={handleChange}
                        defaultValue={formData.clientEmail}
                        name="clientEmail" id="clientEmail" className="border-5 px-10 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="flex flex-col w-full">
              <div className="w-full px-4 mt-3">
                <div className="w-full mb-3 mt-7">
                  {addBenefactor ?
                    <button onClick={newBenefactor} type="button" className="border-5 px-3 py-3 bg-red-500 hover:bg-red-800 rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" >Annuler</button>
                    :
                    <button onClick={newBenefactor} type="button" className="border-5 px-3 py-3 bg-blue-500 hover:bg-blue-800 rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" >Ajouter un client</button>
                  }

                </div>
              </div>
              {addBenefactor && (
                <div>
                  <div className="w-full px-4 mt-3">
                    <div className="w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                        Prénom du client <span className="text-red-500">*</span>
                      </label>
                      <input name="clientFirstName" id="clientFirstName" type="text" defaultValue={formData.clientFirstName} required onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                    </div>
                  </div>
                  <div className="w-full px-4 mt-3">
                    <div className=" w-full mb-3">
                      <label htmlFor="montant" className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2">
                        Numéro de téléphone du client
                      </label>
                    </div>
                    <div className="mt-2 rounded-md shadow-sm">
                      <input type="text"
                        onChange={handleChange}
                        name="clintPhone" id="clientPhone" defaultValue={formData.clientPhone} className="border-5 px-10 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {!isClient && !benefactors && (
        <div>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col w-full">
              <div className="w-full px-4 mt-3">
                <div className="w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                    Liste des bénéficiaires
                  </label>
                  <select
                    id="benefactor"
                    name="benefactor"
                    className="input"
                    value={"Sélectionner un bénéficiaire"}
                    onChange={e => {
                      handleBenefactorChange(e);
                    }}
                  >
                    <option value="">Sélectionnez un bénéficiaire</option>
                  </select>
                </div>
              </div>
              {addBenefactor && (
                <div>
                  <div className="w-full px-4 mt-3">
                    <div className="w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                        Nom du client <span className="text-red-500">*</span>
                      </label>
                      <input name="clientLastName" id="clientLastName" type="text" required onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                    </div>
                  </div>
                  <div className="w-full px-4 mt-3">
                    <div className=" w-full mb-3">
                      <label htmlFor="montant" className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2">
                        Adresse mail du client
                      </label>
                    </div>
                    <div className="mt-2 rounded-md shadow-sm">
                      <input type="text"
                        onChange={handleChange}
                        name="clientEmail" id="clientEmail" className="border-5 px-10 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="flex flex-col w-full">
              <div className="w-full px-4 mt-3">
                <div className="w-full mb-3">
                  {addBenefactor ?
                    <button type="button" onClick={newBenefactor} className="border-5 px-3 py-3 bg-red-500 hover:bg-red-800 rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" >Annuler</button>
                    :
                    <button type="button" onClick={newBenefactor} className="border-5 px-3 py-3 bg-blue-500 hover:bg-blue-800 rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" >Ajouter un client</button>
                  }

                </div>
              </div>
              {addBenefactor && (
                <div>
                  <div className="w-full px-4 mt-3">
                    <div className="w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2" htmlFor="numberArticle">
                        Prénom du client <span className="text-red-500">*</span>
                      </label>
                      <input name="clientFirstName" id="clientFirstName" type="text" required onChange={handleChange} className="border-5 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                    </div>
                  </div>
                  <div className="w-full px-4 mt-3">
                    <div className=" w-full mb-3">
                      <label htmlFor="montant" className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2">
                        Numéro de téléphone du client
                      </label>
                    </div>
                    <div className="mt-2 rounded-md shadow-sm">
                      <input type="text"
                        onChange={handleChange}
                        name="clientPhone" id="clientPhone" className="border-5 px-10 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      <hr className="mt-6 border-b-1 border-blueGray-300" /> {/*Section pour expliquer la demande */}

      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full 2xl:flex-row">
            <div className="w-full px-4 mt-3">
              <div className=" w-full mb-3">
                <label htmlFor="comments" className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2">
                  Objet de la demande <span className="text-red-500">*</span>
                </label>
                <textarea name="text" id="text" required onChange={handleChange} placeholder="Veuillez rentrer l'objet de votre demande" className="border-5 px-3 py-3 h-20 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg  shadow-xl rounded-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-14" />
              </div>
              {errors.text && <p className="text-red-500 text-sm">{errors.text}</p>}
            </div>
          </div>
        </div>
      </div>

      {/*Section pour ajouter des documents et valider*/}
      <div className="flex bg-white mb-3 items-center justify-center">
        {/* <label htmlFor="comments" className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2">
          Ajouter des documents
        </label> */}
        <div className="flex flex-col border border-gray-400 rounded-lg shadow-xl">
          {docs.map((doc, index) => (
            <div key={index} className="flex flex-row">
              <p className="text-xl m-3 font-bold">{doc.name}</p>
              <button type="button" onClick={() => { removeDocuments(doc) }} className="text-xl text-red-500 hover:text-red-800">
                <XMarkIcon className="w-7 h-7" />
              </button>
            </div>
          ))}
          <FileUploader title="Ajouter un document" onFileSelect={(file) => { newDocuments(file) }} type="pdf" />
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

