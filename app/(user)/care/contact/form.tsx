"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../loading";
import { getToken, getUserFromSession } from "@/lib/session";
import { sendEmailContact } from "@/lib/emails/mailer";
import { newRequest } from "@/Services/ServicesFront/users";
import FileUploader, { getFileType } from "@/components/fileField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowLeft, ChevronLeft, Send, User, PlusCircle } from "lucide-react";

export default function Form() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState<
    { name: string; type: string; file: File }[]
  >([]);
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
    text: "" as string,
  });

  async function fetchData() {
    const user = await getUserFromSession(await getToken());
    if (user != null) {
      setFormData({
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        phone: user.phone,
        text: "",
      });
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
      Swal.fire('Soumis !', 'Le formulaire a été soumis.', 'success');
      await newRequest(formData, "INFORMATION", user, docs)
      sendEmailContact(formData, docs)
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
    } else if (!/\+\d{1,3}\s?\d{8,14}/.test(formData.phone)) {
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
            className="items-center py-2 px-4 rounded transition-all fa-2xl"
            onClick={(e) => {
              handleCancel(e);
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
              Demande de renseignement
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Veuillez remplir vos coordonnées ci-dessous
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-500" />
            1. Informations de contact
          </h2>
          <div className="flex flex-col lg:flex-row gap-6">
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
                  <p className="text-red-500">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="montant"
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                >
                  Adresse mail <span className="text-red-500 text-sm">*</span>
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
            </div>
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
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <div>
            <div className="pt-4 border-t border-slate-200">
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

          <div>
            {/* <label htmlFor="comments" className="block uppercase text-blueGray-600 text-sm xl:text-md font-bold mb-2">
              Ajouter des documents
            </label> */}
            <div className="pt-4 border-t border-slate-200">
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
            <span className="hidden sm:inline-block   xl:inline-block">
              Soumettre {validForm}
            </span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
