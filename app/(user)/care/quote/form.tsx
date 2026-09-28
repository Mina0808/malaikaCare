"use client";

import {
  faCircleChevronLeft,
  faPaperPlane,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../loading";
import { getToken, getUserFromSession } from "@/lib/session";
import FileUploader, { getFileType } from "@/components/fileField";
import { newRequest, getBenefactors } from "@/Services/ServicesFront/users";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowLeft, ChevronLeft, Send, User, PlusCircle } from "lucide-react";

export default function Form() {
  const [user, setUser] = useState<any>(null);
  const [benefactors, setBenefactors] = useState<Map<string, any>>(new Map());
  const [isClient, setIsClient] = useState(true);
  const [addBenefactor, setAddBenefactor] = useState(false);
  const [docs, setDocs] = useState<
    { name: string; type: string; file: File }[]
  >([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({
    lastName: "" as string,
    firstName: "" as string,
    mail: "" as string,
    phone: "" as string,
    text: "" as string,
  });
  const [validForm, setValidForm] = useState(false);
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
    const user = await getUserFromSession(getToken());
    if (user != null) {
      const benefactors = await getBenefactors(user?.id);
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
      setBenefactors(benefactors);
    }
    setUser(user);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<{ name: string; value: string }>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleBenefactorChange = (
    event: React.ChangeEvent<{ name: string; value: any }>,
  ) => {
    console.log(event.target.name);
    console.log(event.target.value.lastName);
    const { name, value } = event.target;
    if (value) {
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
    setAddBenefactor(!addBenefactor);
  };

  function newDocuments(newDocs: FileList) {
    const documents = JSON.parse(JSON.stringify(docs));
    for (let i = 0; i < newDocs?.length; i++) {
      const extension = newDocs.item(i)?.name.split(".").pop();
      if (extension) {
        documents.push({
          name: newDocs.item(i)?.name,
          type: getFileType(extension),
          file: newDocs.item(i),
        });
      }
    }
    console.log("new", newDocs);
    setDocs(documents);
  }

  function removeDocuments(deletedDoc: any) {
    const documents = JSON.parse(JSON.stringify(docs));
    for (let i = 0; i < docs.length; i++) {
      if (documents.at(i)?.name == deletedDoc.name) {
        documents.splice(i, 1);
      }
    }
    setDocs(documents);
  }

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Vous êtes sur le point de soumettre le formulaire.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, soumettre !",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      Swal.fire("Soumis !", "Le formulaire a été soumis.", "success");
      await newRequest(formData, "QUOTE", user, docs);
      //sendEmailQuote(formData)
      toast.success("La demande a été soumise");
      router.push(`/care`);
    } else {
      Swal.fire("Annulé", "La soumission a été annulée.", "error");
    }
  };

  // const { control, setValue, handleSubmit } = useForm({
  //   defaultValues: {
  //     typeProducts: [] as any[]
  //   }
  // });

  const validateForm = () => {
    let errors = { firstName: "", lastName: "", mail: "", phone: "", text: "" };
    let valid = true;

    if (!formData.firstName) {
      // errors.firstName = 'Le prénom est obligatoire';
      valid = false;
    }

    if (!formData.lastName) {
      // errors.lastName = 'Le nom est obligatoire';
      valid = false;
    }

    if (!formData.phone) {
      // errors.phone = 'Merci de rentrer un téléphone';
      valid = false;
    } else if (!/\+\d{1,3}\s?\d{5,14}/.test(formData.phone)) {
      errors.phone =
        "Merci de rentrer un numéro valide avec l'indicatif du pays";
      valid = false;
    }

    if (!formData.email) {
      // errors.mail = 'Email is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.mail = "L'adresse mail n'est pas valide";
      valid = false;
    }

    if (!formData.text) {
      // errors.text = 'Merci de rentrer votre demande';
      valid = false;
    }

    setErrors(errors);
    setValidForm(valid);
  };

  const handleCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    router.push(`/`);
  };

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

  if (loading) return <Loader />;
  return (
    <form className="rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden transition-all duration-300">
      <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <button
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center justify-center border border-slate-700"
            onClick={(e) => {
              handleCancel(e);
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
              Demande de devis
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Veuillez remplir vos coordonnées ci-dessous
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[11px] bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 font-semibold">
            Devis en ligne
          </span>
        </div>
      </div>
      <div className="p-6 sm:p-8 space-y-6">
        {}
        <div>
          <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-500" />
            1. Informations de contact
          </h2>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT COLUMN */}
            <div className="flex flex-col w-full space-y-4">
              <div>
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="numberArticle"
                >
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  defaultValue={formData.lastName}
                  required
                  onChange={handleChange}
                  className={`w-full h-12 px-4 bg-white border ${
                    errors.lastName
                      ? "border-red-500 bg-red-50/30"
                      : "border-slate-300"
                  } text-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="montant"
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                >
                  Adresse mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  defaultValue={formData.email}
                  name="email"
                  id="email"
                  required
                  className={`w-full h-12 px-4 bg-white border ${
                    errors.mail
                      ? "border-red-500 bg-red-50/30"
                      : "border-slate-300"
                  } text-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all`}
                />
                {errors.mail && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    {errors.mail}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="comments"
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                >
                  Objet de la demande <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="text"
                  id="text"
                  required
                  onChange={handleChange}
                  placeholder="Veuillez rentrer l'objet de votre demande"
                  className={`w-full h-12 px-4 bg-white border ${
                    errors.text
                      ? "border-red-500 bg-red-50/30"
                      : "border-slate-300"
                  } text-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all`}
                />
                {errors.text && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    {errors.text}
                  </p>
                )}
              </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className="flex flex-col w-full space-y-4">
              <div>
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="numberArticle"
                >
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  id="firstName"
                  type="text"
                  required
                  defaultValue={formData.firstName}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 bg-white border ${
                    errors.firstName
                      ? "border-red-500 bg-red-50/30"
                      : "border-slate-300"
                  } text-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="montant"
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                >
                  Numéro de téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="phone"
                  id="phone"
                  required
                  defaultValue={formData.phone}
                  className={`w-full h-12 px-4 bg-white border ${
                    errors.phone
                      ? "border-red-500 bg-red-50/30"
                      : "border-slate-300"
                  } text-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                {docs.map((doc, index) => (
                  <div key={index} className="flex flex-row">
                    <p className="text-xl m-3 font-bold">{doc.name}</p>
                    <button
                      type="button"
                      onClick={() => {
                        removeDocuments(doc);
                      }}
                      className="text-xl text-red-500 hover:text-red-800"
                    >
                      <XMarkIcon className="w-7 h-7" />
                    </button>
                  </div>
                ))}
                <FileUploader
                  title="Ajouter un document"
                  onFileSelect={(file) => {
                    newDocuments(file);
                  }}
                  type="pdf"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <label
              htmlFor="colisFragile"
              className="font-bold text-slate-900 text-sm"
            >
              Êtes-vous le client ? <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-6">
              <label
                id="typeCompte"
                className="inline-flex items-center cursor-pointer font-medium text-sm text-slate-700"
              >
                <input
                  onChange={() => {
                    setIsClient(true);
                    setAddBenefactor(false);
                  }}
                  checked={isClient}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  type="radio"
                  name="client"
                  value="OUI"
                />{" "}
                <span className="ml-2">Oui</span>
              </label>
              <label className="inline-flex items-center cursor-pointer font-medium text-sm text-slate-700">
                <input
                  onChange={() => {
                    setIsClient(false);
                  }}
                  checked={!isClient}
                  type="radio"
                  name="client"
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                  value="NON"
                />{" "}
                <span className="ml-2">Non</span>
              </label>
            </div>
          </div>
        </div>
        {!isClient && benefactors && (
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-4">
            <div className="flex items-center justify-between">
              <label
                className="block uppercase text-slate-700 text-xs font-extrabold tracking-wider"
                htmlFor="numberArticle"
              >
                Liste des bénéficiaires
              </label>
              <button
                type="button"
                onClick={newBenefactor}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Nouveau bénéficiaire
              </button>
            </div>

            <select
              id="benefactor"
              name="benefactor"
              className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl shadow-sm text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              defaultValue={"Sélectionner un bénéficiaire"}
              onChange={(e) => {
                handleBenefactorChange(e);
              }}
            >
              <option value="">Sélectionnez un bénéficiaire</option>
              {Array.from(benefactors.values()).map(
                (benefactor: any, index: any) => (
                  <option key={index} value={benefactor.id} className="text-xl">
                    {benefactor.firstName} {benefactor.lastName}
                  </option>
                ),
              )}
            </select>
            {addBenefactor && (
              <div className="pt-4 border-t border-amber-200/80 space-y-4">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Saisir les coordonnées du client / bénéficiaire :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="numberArticle"
                    >
                      Nom du client <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="clientLastName"
                      id="clientLastName"
                      type="text"
                      defaultValue={formData.clientLastName}
                      required
                      onChange={handleChange}
                      className={`w-full h-12 px-4 bg-white border ${
                        errors.clientLastName
                          ? "border-red-500 bg-red-50/30"
                          : "border-slate-300"
                      } text-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all`}
                    />
                    {errors.clientLastName && (
                      <p className="text-red-500 text-xs font-semibold mt-1">
                        {errors.clientLastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="montant"
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    >
                      Adresse mail du client
                    </label>
                    <input
                      type="text"
                      onChange={handleChange}
                      defaultValue={formData.clientEmail}
                      name="clientEmail"
                      id="clientEmail"
                      className="w-full h-12 px-4 bg-white border border-slate-300 text-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="numberArticle"
                    >
                      Prénom du client <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="clientFirstName"
                      id="clientFirstName"
                      type="text"
                      defaultValue={formData.clientFirstName}
                      required
                      onChange={handleChange}
                      className="w-full h-12 px-4 bg-white border border-slate-300 text-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="montant"
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    >
                      Numéro de téléphone du client
                    </label>
                    <input
                      type="text"
                      onChange={handleChange}
                      name="clintPhone"
                      id="clientPhone"
                      defaultValue={formData.clientPhone}
                      className="w-full h-12 px-4 bg-white border border-slate-300 text-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {!isClient && !benefactors && (
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-4">
            <div className="flex items-center justify-between">
              <label
                className="block uppercase text-slate-700 text-xs font-extrabold tracking-wider"
                htmlFor="numberArticle"
              >
                Liste des bénéficiaires
              </label>
              <button
                type="button"
                onClick={newBenefactor}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Nouveau bénéficiaire
              </button>
            </div>

            <select
              id="benefactor"
              name="benefactor"
              className="w-full h-12 px-4 bg-white border border-slate-300 rounded-xl shadow-sm text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              defaultValue={"Sélectionner un bénéficiaire"}
              onChange={(e) => {
                handleBenefactorChange(e);
              }}
            >
              <option value="">Sélectionnez un bénéficiaire</option>
              {Array.from(benefactors.values()).map(
                (benefactor: any, index: any) => (
                  <option key={index} value={benefactor.id} className="text-xl">
                    {benefactor.firstName} {benefactor.lastName}
                  </option>
                ),
              )}
            </select>
            {addBenefactor && (
              <div className="pt-4 border-t border-amber-200/80 space-y-4">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Saisir les coordonnées du client / bénéficiaire :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="numberArticle"
                    >
                      Nom du client <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="clientLastName"
                      id="clientLastName"
                      type="text"
                      defaultValue={formData.clientLastName}
                      required
                      onChange={handleChange}
                      className={`w-full h-12 px-4 bg-white border ${
                        errors.clientLastName
                          ? "border-red-500 bg-red-50/30"
                          : "border-slate-300"
                      } text-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all`}
                    />
                    {errors.clientLastName && (
                      <p className="text-red-500 text-xs font-semibold mt-1">
                        {errors.clientLastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="montant"
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    >
                      Adresse mail du client
                    </label>
                    <input
                      type="text"
                      onChange={handleChange}
                      defaultValue={formData.clientEmail}
                      name="clientEmail"
                      id="clientEmail"
                      className="w-full h-12 px-4 bg-white border border-slate-300 text-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all"
                    />
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {addBenefactor ? (
                    <button
                      type="button"
                      onClick={newBenefactor}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      Annuler
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={newBenefactor}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      Ajouter un client
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            onClick={(e) => {
              handleCancel(e);
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline-block   xl:inline-block">
              Annuler
            </span>
          </button>
          <button
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            type="button"
            onClick={handleSubmit}
            disabled={!validForm}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline-block   xl:inline-block">
              Soumettre
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
