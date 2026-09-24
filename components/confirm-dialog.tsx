"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

export default function ConfirmDialog({
  id,
  title,
  message,
  onFormSubmit,
  icon,
  color,
}: {
  id?: string;
  title: string;
  message: string;
  onFormSubmit: (formData: FormData) => void;
  icon?: any;
  color: string;
}) {
  const {
    register,
    formState: { isValid },
    reset,
  } = useForm();
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);


  // Function to handle form submission
  const onSubmit = async (prev: any, formData: FormData) => {
    setProcessing(true);
    onFormSubmit(formData);
    setOpen(false);
    setProcessing(false);

  };
  const [state, formAction] = useFormState(onSubmit, null);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <button
          className={`rounded-md flex ${color} flex items-center bg-blue-400 text-white text-xl border border-gray-300 py-2 px-4 rounded shadow-xl hover:bg-blue-500 transition-all`}
        >
          {icon} {title}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/70 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <form action={formAction}>
            <AlertDialog.Title className="text-mauve12 m-0 text-2xl font-medium">
              Confirmation
            </AlertDialog.Title>
            <AlertDialog.Description className="text-gunmetal mt-4 mb-5 text-xl leading-normal">
              {message}
            </AlertDialog.Description>
            <input type="hidden" {...register("id")} value={id} />
            <div className="flex justify-end gap-4 mt-4">
              <AlertDialog.Cancel asChild>
                <button disabled={processing} className="rounded-md bg-red-500 px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                  NON
                </button>
              </AlertDialog.Cancel>

              <button
                type="submit"
                disabled={processing}
                className="rounded-md bg-blue px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark"
              >
                 {processing && ( // Afficher le spinner si en cours de traitement
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-blue animate-spin dark:text-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#0b8a6d"
              />
            </svg>
          )}
                OUI
              </button>
            </div>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}