import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";

export default function ConfirmDialogAlert({
    title,
    message,
    onSubmit,
    icon,
    color,
    disabled,
}: {
    title: string;
    message: string;
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    icon?: any;
    color: string;
    disabled: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger asChild>
                <button
                    disabled={disabled || processing}
                    className={`rounded-md flex ${color} px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm ${disabled || processing ? "bg-gray-400" : "hover:bg-blue-light"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark`}
                >
                    {icon} {title}
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-black/70 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setProcessing(true);
                            await onSubmit(e);
                            setProcessing(false);
                            setOpen(false);
                        }}
                    >
                        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">Confirmation</AlertDialog.Title>
                        <AlertDialog.Description className="text-gunmetal mt-4 mb-5 text-[15px] leading-normal">
                            {message}
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-4 mt-4">
                            <AlertDialog.Cancel asChild>
                                <button
                                    disabled={processing}
                                    className="rounded-md bg-red-500 px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                >
                                    NON
                                </button>
                            </AlertDialog.Cancel>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-blue px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark"
                            >
                                {processing && (
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline w-4 h-4 me-3 text-blue animate-spin dark:text-white"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.081 50.5908C9.081 73.4454 27.1454 91.5098 50 91.5098C72.8546 91.5098 90.919 73.4454 90.919 50.5908C90.919 27.7362 72.8546 9.67176 50 9.67176C27.1454 9.67176 9.081 27.7362 9.081 50.5908Z"
                                            fill="#E5E7EB"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5537C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.55316C69.5422 4.38251 63.2754 2.51562 56.7663 2.05124C51.766 1.69975 46.7397 2.10256 41.816 3.24383C39.3256 3.81436 37.8559 6.30568 38.493 8.73104C39.1301 11.1564 41.5996 12.5545 44.1189 12.0623C47.9221 11.2818 51.8592 11.0784 55.7154 11.4682C60.869 11.9767 65.8352 13.7196 70.2462 16.629C74.6573 19.5384 78.4075 23.5502 81.2048 28.3628C83.3453 31.7403 84.9426 35.4009 85.9383 39.2289C86.6182 41.6523 89.5422 42.9862 91.9676 39.0409Z"
                                            fill="currentColor"
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
