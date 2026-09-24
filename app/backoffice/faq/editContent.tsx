"use client";
//import { editContent } from "@/Services/ServicesFront/faq";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PencilIcon } from "@heroicons/react/24/outline";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function EditContent({ content }: { content: any }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(content.title)
    const [text, setText] = useState(content.text)
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(false)
    const [underline, setUnderline] = useState(false)
    const editorRef = useRef<HTMLDivElement>(null);
    const onSubmit = async () => {
        if (editorRef.current) {
            setText(editorRef.current.innerHTML);
            const content_text = editorRef.current.innerHTML;
            //const newContent = await editContent(content.id, content.sectionId, title, content_text);
            toast.success(`Nouvelle zone de texte ajoutée`);
            setOpen(false);
        }
    };

    const applyStyle = (tag: string) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selectedContent = range.extractContents()

        if (tag === "bullets") {
            const childs = selectedContent.childNodes
            const lines:string[] = []
            childs.forEach((child)=>{
                if (child.textContent) lines.push(child.textContent)
            })
            console.log(lines)

            if (lines.length === 0) return; 

            const ul = document.createElement("ul");
            ul.style.listStyleType = "disc";
            ul.style.paddingLeft = "20px";

            
            lines.forEach((line) => {
                const li = document.createElement("li");
                li.textContent = line.trim();
                ul.appendChild(li); 
            });

            range.deleteContents();
            range.insertNode(ul);
            range.collapse(false);
        }
        else {
            const element = document.createElement(tag);
            element.appendChild(selectedContent);
            range.insertNode(element);
        }

    };

    useEffect(() => {
        console.log(content)
        setTitle(content.title);
        setText(content.text);
        setBold(false)
        setUnderline(false)
        setItalic(false)
    }, []);

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger asChild>
                <button className="text-xl text-umber hover:text-blue-500">
                    <PencilIcon className="w-4 h-4" />
                </button>
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-black/70 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="overflow-y-auto data-[state=open]:animate-contentShow absolute top-[50%] left-[50%] max-h-[calc(100vw)] lg:h-auto w-[90vw] md:w-[70vw] translate-x-[-50%] translate-y-[-40%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-2xl font-bold uppercase text-gray-700 mb-5">
                        Modifier la zone de texte
                    </AlertDialog.Title>
                        <div className="grid grid-cols-1 gap-6 mt-3">
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="firstName"
                                    className="block text-xl font-medium text-gray-700"
                                >
                                    Titre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nom"
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    value={title}
                                    className="mt-1 focus:ring-blue focus:border-blue block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="firstName"
                                    className="block text-xl font-medium text-gray-700"
                                >
                                    Contenu <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-row gap-10">
                                    <button className={`w-5 h-5 hover:bg-gray-100 font-bold ${bold ? 'bg-gray-300' : ''}`} onClick={(event) => { event.preventDefault(); setBold(!bold); applyStyle("strong") }}><b>G</b></button>
                                    <button className={`w-5 h-5 hover:bg-gray-100 italic ${italic ? 'bg-gray-300' : ''}`} onClick={(event) => { event.preventDefault(); setItalic(!italic); applyStyle("em") }}><i>I</i></button>
                                    <button className={`w-5 h-5 hover:bg-gray-100 underline ${underline ? 'bg-gray-300' : ''}`} onClick={(event) => { event.preventDefault(); setUnderline(!underline); applyStyle("u") }}>S</button>
                                    <button className={`w-5 h-5 hover:bg-gray-100`} onClick={(event) => { event.preventDefault(); applyStyle("bullets") }}><FontAwesomeIcon icon={faList} className="mr-0 2xl:mr-2" /></button>
                                </div>
                                <div
                                    ref={editorRef}
                                    contentEditable
                                    className="w-full h-40 p-4 border rounded focus:outline-none overflow-y-auto"
                                    dangerouslySetInnerHTML={{ __html: content.text }}
                                />
                            </div>
                            {/* <div className="text-gray-500 mt-2">
                                {editorRef.current?.textContent?editorRef.current?.textContent.length:0} caractère{`${text.length > 1 ? "s" : ""}`}
                            </div> */}

                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                            <AlertDialog.Cancel asChild>
                                <button className="rounded-md bg-red-500 px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                                    Annuler
                                </button>
                            </AlertDialog.Cancel>

                            <button
                                disabled={!text && !title}
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
