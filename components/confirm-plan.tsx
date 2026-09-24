import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface ConfirmDialogPlanProps {
    onConfirm: () => void;
    disabled: boolean;
    title?: string;
    msg?: string;
}

const ConfirmDialogPlan = ({ onConfirm, disabled, title, msg }: ConfirmDialogPlanProps) => {
    console.log(disabled)
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    disabled={disabled}
                >
                    {title ? title : 'Soumettre le plan'}
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-lg font-semibold">
                        Confirmation
                    </AlertDialog.Title>
                    <AlertDialog.Description className="mt-2">
                        {msg ? msg : 'Soumettre le plan'}


                    </AlertDialog.Description>
                    <div className="mt-4 flex justify-end space-x-2">
                        <AlertDialog.Cancel asChild>
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Annuler
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                                disabled={disabled}
                            >
                                Confirmer
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

export default ConfirmDialogPlan;
