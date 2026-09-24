"use client";

//import { deleteContent } from "@/Services/ServicesFront/faq";
import { XMarkIcon } from "@heroicons/react/24/outline";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteContent({ content }: { content: any }) {
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    //const deletedSetting = await deleteContent(content.id);
    toast.success(`Zone de texte supprimée`);
    setOpen(false);
  };
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <button className="text-xl text-red-500 hover:text-red-600">
          <XMarkIcon className="w-4 h-4" />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/70 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-2xl font-bold uppercase text-gray-700 mb-5">
            Supprimer cette question ?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-gunmetal mt-4 mb-5 text-xl leading-normal">
            Cette action est irréversible.
          </AlertDialog.Description>
          <form onSubmit={() => { onSubmit() }}>
            <div className="flex justify-end gap-4 mt-4">
              <AlertDialog.Cancel asChild>
                <button className="rounded-md bg-red-500 px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                  Non
                </button>
              </AlertDialog.Cancel>

              <button
                className="rounded-md bg-blue px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark"
                onClick={onSubmit}
              >
                Oui
              </button>
            </div>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
