"use client";
//import { addSection } from "@/Services/ServicesFront/faq";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddSection() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")

    const onSubmit = async () => {
        //const newSection = await addSection(name);
        toast.success(`Nouvelle section ajoutée`);
        setOpen(false);
    };

    function handleChange(event: React.ChangeEvent<{ name: string; value: string }>): void {
        const { name, value } = event.target;
        setName(value);
    }

    useEffect(() => {
        if (open) {
            setName("");
        }
    }, [open]);

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger asChild>
            <button className="rounded-md flex items-center bg-blue-400 text-white text-xl border border-gray-300 py-2 px-4 rounded shadow-xl hover:bg-blue-500 transition-all">
          Nouvelle section
        </button>
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-black/70 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="overflow-y-auto data-[state=open]:animate-contentShow absolute top-[50%] left-[50%] max-h-[calc(100vw)] lg:h-auto w-[90vw] md:w-[70vw] translate-x-[-50%] translate-y-[-40%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-2xl font-bold uppercase text-gray-700 mb-5">
                        Ajouter une section
                    </AlertDialog.Title>
                        <div className="grid grid-cols-1 gap-6 mt-3">
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="firstName"
                                    className="block text-xl font-medium text-gray-700"
                                >
                                    Nom de la section <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nom"
                                    onChange={handleChange}
                                    value={name}
                                    className="mt-1 focus:ring-blue focus:border-blue block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <AlertDialog.Cancel asChild>
                                <button className="rounded-md bg-red-500 px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                                    Annuler
                                </button>
                            </AlertDialog.Cancel>

                            <button
                                disabled={!name}
                                className="px-2 py-1 border border-transparent text-xl rounded-md shadow-sm text-white bg-blue disabled:bg-gray-400 hover:bg-blue-dark disabled:hover:bg-gray-400focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
                                onClick={onSubmit}
                            >
                                Enregistrer
                            </button>
                        </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}
