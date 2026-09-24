"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PDFViewer from "./pdf-viewer";

type FileType = "pdf" | "image";

export default function Page({
  params: { uuid, filename },
}: {
  params: {
    uuid: string;
    filename: string;
  };
}) {
  const router = useRouter();
  const [fileType, setFileType] = useState<FileType | null>(null);
  const title = useSearchParams().get("title");

  useEffect(() => {
    const extension = filename.split(".").pop();
    if (
      ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "svg", "webp"].includes(
        extension ?? "",
      )
    )
      setFileType("image");
    else if (extension === "pdf") setFileType("pdf");
  }, [filename]);

  const url = `/file/${filename}`;

  return (
    <Dialog.Root open onOpenChange={() => router.back()}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/70 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="fixed data-[state=open]:animate-contentShow top-[50%] left-[50%] h-[80vh] min-w-[30vw]  max-w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="flex flex-col h-full">
            <div className="flex flex-row justify-between mb-8">
              <Dialog.Title className="block m-0 text-[17px] font-medium">
                {title}
                <Link
                  href={url}
                  download
                  className="text-umber hover:text-blue-500 flex gap-1 items-center"
                >
                  <span>Télécharger</span>
                  <DocumentArrowDownIcon className="h-5 w-5 inline" />
                </Link>
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="text-viridian-dark hover:text-viridian-light inline-flex"
                  aria-label="Close"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>
            <div className="relative flex-auto overflow-y-auto">
              {fileType === "image" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt="image" className="w-full h-auto" />
              )}
              {fileType === "pdf" && <PDFViewer url={url} />}
              {fileType === null && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-4xl text-gunmetal-dark">
                    <DocumentArrowDownIcon className="h-20 w-20" />
                  </div>
                  <Link href={url} className="text-gunmetal-dark text-2xl">
                    Télécharger le fichier
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
