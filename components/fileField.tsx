"use client"
import { useState } from "react";

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "react-pdf/dist/esm/Page/TextLayer.css";

 export function getFileType(extension: string) {
      let fileType = ""
        if (
          ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "svg", "webp"].includes(
            extension ?? "",
          )
        )
          fileType = "image";
        else if (["mp4", "avi", "kvm", "mov", "mpeg"].includes(extension ?? "")) fileType = "video";
        else if (extension === "pdf") fileType = "pdf";
        return fileType
    }
export function getAcceptedExtension(fileType: string) {
      let extension = ""
      if (fileType=="image")
          extension = "image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/svg, image/webp";
        else if (fileType == "video")
          extension = "video/mp4, video/avi";
        else if (fileType === "pdf") extension = ".pdf";
        else extension = ".pdf, image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/svg, image/webp, video/mp4, video/avi"
        return extension
    }

export function getExtension(fileType: string) {
      let extension = ""
      if (fileType=="image")
          extension = "png, jpeg, jpg, gif, bmp, tiff, svg, webp";
        else if (fileType == "video")
          extension = "mp4, avi";
        else if (fileType === "pdf") extension = "pdf";
        else extension = "pdf, png, jpeg, jpg, gif, bmp, tiff, svg, webp, mp4, avi"
        return extension
    }
const FileUploader = ({
  title,
  onFileSelect,
  type
}
  : {
    title?: string,
    onFileSelect: (files: FileList) => void,
    type:string
  }) => {
  const [files, setFiles] = useState<{ file: File, extension: string, type: string, name: string }[]>([]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("out ")
    const selectedFiles = event.target.files ? event.target.files : null;
    const fileList = JSON.parse(JSON.stringify(files));
    if (selectedFiles)
      for (let i = 0; i < selectedFiles?.length; i++) {
        console.log("in ")
        const selectedFile = selectedFiles.item(i)
        const extension = selectedFile?.name.split(".").pop();
        if (extension) {
          const fileType = getFileType(extension)
          fileList.push({ file: selectedFile, extension: extension, type: fileType, name: selectedFile?.name })
        }
        onFileSelect(selectedFiles);
      }

   
    setFiles(fileList)


    //   if (selectedFile && selectedFile.type.startsWith('image/')) {
    //     setPreview(URL.createObjectURL(selectedFile));
    //   } else if (selectedFile && selectedFile.type === 'application/pdf') {
    //     setPreview(URL.createObjectURL(selectedFile));
    //   } else {
    //     setPreview(null);
    //   }

  };


  // const removeFile = (fileName: string) => { //Revoir dans le cas de plusieurs fichiers (ce n'est pas le bon qui se supprime)
  //   const fileList = JSON.parse(JSON.stringify(files));
  //   for (const f of files) {
  //     if (fileName == f.name) {
  //       fileList.splice(fileList.indexOf(f), 1)
  //     }
  //   }
  //   setFiles(fileList)
  // }

  return (
    <div className="p-2 ">
      {/* <div className="flex items-center justify-center mb-3">
        <div className="flex-shrink-0">
          <FontAwesomeIcon icon={faFile} className="text-6xl text-gray-300" />
        </div>

        <div className="ml-4">
          <h3 className="text-md text-center font-semibold text-gray-800">{title}</h3>
          {(files.length == 1) && (
            <p className="text-gray-500 mt-1">Fichier sélectionné : <div className='flex flex-row'>{files[0].name} <button type='button' onClick={() => { removeFile(files[0].name) }} className="text-xl text-red-500 hover:text-red-800">
              <XMarkIcon className="w-7 h-7" />
            </button></div></p>
          )}
          {(files.length > 1) && (
            <p className="text-gray-500 mt-1">Fichiers sélectionnés :
              {files.map((file, index) => (
                <div className='flex flex-row'>
                  {file.name}
                  <button type='button' onClick={() => { removeFile(file.name) }} className="text-xl text-red-500 hover:text-red-800">
                    <XMarkIcon className="w-7 h-7" />
                  </button>
                </div>
              ))}

            </p>
          )}
        </div>
      </div> */}

      <div className="flex space-x-4 items-center justify-center">
        <label className="flex flex-col items-center text-white font-bold py-2 px-4 cursor-pointer transition-all">
          {/* <span className="hidden lg:inline-block xl:inline-block">  {file ? 'Modifier' : 'Charger'}</span> */}
          <div className='bg-blue-400 hover:bg-blue-600 w-full text-xl text-black py-1 m-3 shadow-xl rounded-lg flex justify-center items-center'>
            {title}
            <input
              type="file"
              className="hidden"
              accept={getAcceptedExtension(type)}
              multiple={true}
              onChange={(e) => {
                console.log("change")
                handleFileChange(e)
              }
              }
            />
          </div>
          {(files.length == 0) && (
            
            <p className="text-black mt-1">Formats : {getExtension(type)}</p>
          )}
        </label>

        {/* {(fileToLoaded && !file) && (
          <>
            <button
              type="button"
              className="">
              <Link href={`/modal/file/${fileToLoaded.nom}`} className="flex items-center bg-white text-gray-800 border border-gray-300 py-2 px-4 rounded shadow-xl hover:bg-gray-100 transition-all">
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                <span className="hidden lg:inline-block   xl:inline-block" >Aperçu</span>
              </Link>
            </button>
          </>
        )}

        {(file) && (
          <>
            <button
              type="button"
              className="flex items-center bg-white text-gray-800 border border-gray-300 py-2 px-4 rounded shadow-xl hover:bg-gray-100 transition-all"
              onClick={openModal}
            >
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              <span className="hidden lg:inline-block xl:inline-block">Aperçu</span>
            </button>
            <button
              type="button"
              className="flex items-center bg-white text-gray-800 border border-gray-300 py-2 px-4 rounded shadow-xl hover:bg-gray-100 transition-all"
              onClick={removeFile}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              <span className="hidden lg:inline-block xl:inline-block">Supprimer</span>
            </button>
          </>
        )} */}
      </div>

      {/* {(preview && isModalOpen) &&
        <Dialog.Root open onOpenChange={() => setIsModalOpen(false)}>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/70 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="fixed data-[state=open]:animate-contentShow top-[50%] left-[50%] h-[80vh] min-w-[30vw]  max-w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <div className="flex flex-col h-full">
                <div className="flex flex-row justify-between mb-8">
                  <Dialog.Title className="block m-0 text-[17px] font-medium">
                    {title}
                    <Link
                      href={preview}
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
                    <img src={preview} alt="image" className="w-full h-auto" />
                  )}
                  {fileType === "pdf" && <PDFViewer url={preview} />}
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      } */}
    </div>
  );
};

export default FileUploader;
