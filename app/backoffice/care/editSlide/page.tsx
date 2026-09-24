"use client";
import { SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getDocumentsByPageFront, updateSlides } from "@/Services/ServicesFront/documents";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import FileUploader, { getFileType } from "@/components/fileField";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileUploader from "@/components/fileField";

export default function EditSlide() {
    const [slides, setSlides] = useState<{ name: string, type: string }[]>([])
    const [deletedSlides, setDeletedSlides] = useState<{ name: string, type: string }[]>([])
    const [addedSlides, setAddedSlides] = useState<{ name: string, type: string, file: File }[]>([])
    const router = useRouter()

    async function onSubmit() {
        console.log("deleted: ", deletedSlides)
        console.log("added: ", addedSlides)
        //await updateSlides(deletedSlides, addedSlides);
        toast.success(`Slides mis à jour`);
        router.push("/backoffice")
    };
    const onCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        router.push("/backoffice")
    };

    async function fetchData() {
        const slide = await getDocumentsByPageFront("home")
        const newSlide: { name: string; type: string; }[] = []
        slide.forEach((item) => {
            newSlide.push({ name: item.name, type: item.type })
        })
        setSlides(newSlide)
    }

    function addSlide(newSlides: FileList) {
        console.log("remove before")
        const slide = JSON.parse(JSON.stringify(slides));
        const addSlide = JSON.parse(JSON.stringify(addedSlides));
        const deleteSlide = JSON.parse(JSON.stringify(deletedSlides));
        console.log("new", newSlides)
        console.log("add", addSlide)
        console.log("delete", deleteSlide)
        for (let i = 0; i < newSlides?.length; i++) {
            const extension = newSlides.item(i)?.name.split(".").pop()
            // if (extension) {
            //     addSlide.push({ name: newSlides.item(i)?.name, type: getFileType(extension), file: newSlides.item(i) })
            //     slide.push({ name: newSlides.item(i)?.name, type: getFileType(extension) })
            // }
        }
        console.log("remove after")
        console.log("add", addSlide)
        console.log("delete", deleteSlide)
        setSlides(slide)
        setAddedSlides(addSlide)
        setDeletedSlides(deleteSlide)
    }

    function removeSlide(slideName: string, slideType: string) {
        // console.log("remove before")
        const newSlide = JSON.parse(JSON.stringify(slides));
        const deleteSlide = JSON.parse(JSON.stringify(deletedSlides));
        // console.log("slide", newSlide)
        // console.log("delete", deleteSlide)
        let index = 0
        let bool = false
        while (index < newSlide.length && !bool) {
            console.log(newSlide[index], " - ", index)
            if (newSlide[index].name === slideName && newSlide[index].type === slideType)
                bool = true
            else
                index += 1
        }
        if (!bool)
            index = -1
        //console.log("slide", index)
        deleteSlide.push({ name: slideName, type: slideType })
        newSlide.splice(index, 1)
        // console.log("remove after")
        // console.log("slide", newSlide)
        // console.log("delete", deleteSlide)
        setSlides(newSlide)
        setDeletedSlides(deleteSlide)
        console.log(newSlide)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (

        <form>
            <div className="grid grid-cols-1 gap-6 mt-3">
                <div className="col-span-2 sm:col-span-1">
                    <label
                        htmlFor="firstName"
                        className="block flex justify-center items-center text-xl mb-5 font-medium text-gray-700"
                    >
                        Modifier les slides
                    </label>
                    <div className="flex flex-col justify-center items-center flex flex-col">
                        <button className="items-center py-2 px-4 rounded transition-all fa-2xl"
                            onClick={() => router.back()}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} className="mr-2" />
                        </button>
                        <table className="bg-white border border-black-2">
                            <tr>
                                <th className="px-4 border border-black-200 border-b-6">Nom du fichier</th>
                                <th className="px-4 border border-black-200">Type du fichier</th>
                                <th className="px-4 border border-black-200"></th>
                            </tr>
                            {slides.map((item, index) => (
                                <tr key={index} className="">
                                    <td className="px-4 border border-black-200">{item.name.split(".")[0]}</td>
                                    <td className="px-4 border border-black-200">{item.type}</td>
                                    <td className="px-4 border border-black-200">
                                        <button type="button" onClick={() => { removeSlide(item.name, item.type) }} className="text-xl text-red-500 hover:text-red-800">
                                            <XMarkIcon className="w-7 h-7" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </table>
                        {/* // <div className="flex flex-row gap-4">
                            //     <span>
                            //         {item.name}
                            //     </span>
                            //     <input
                            //         onChange={()=>{handleChange(item.name, item.type)}}
                            //         type="checkbox" name="deleteSlide" value={`${item.name}`} />
                            // </div> */}
                    </div>
                    <FileUploader type="pdf" title="Nouveau document" onFileSelect={(file) => { addSlide(file) }} />
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
                <button onClick={onCancel} className="rounded-md bg-red-500 px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                    Annuler
                </button>

                <button
                    type="button"
                    onClick={() => { onSubmit() }}
                    disabled={deletedSlides.length < 1 && addedSlides.length < 1}
                    className="px-2 py-1 border border-transparent text-xl rounded-md shadow-sm text-white bg-blue disabled:bg-gray-400 hover:bg-blue-dark disabled:hover:bg-gray-400focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
                >
                    Enregistrer
                </button>
            </div>
        </form>
    );
}
