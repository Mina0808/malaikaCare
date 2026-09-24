"use client"
import { faEye, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Link from "next/link";

const FileReader = ({
  title,
  fileToLoaded
} 
: {
  title? : string,
  fileToLoaded : any
 }) => {
  console.log(fileToLoaded)
  return (
    <div className="bg-white border border-gray-400 shadow-xl rounded-lg p-6 mx-auto w-full overflow-x-auto ">
      <div className="flex flex-col gap-2 md:flex-row items-center justify-center mb-3">
        <div className="flex-shrink-0">
          <FontAwesomeIcon icon={faFile} className="text-4xl text-gray-300" />
        </div>

        <div className="truncate overflow-x-hidden">
          <h3 className="flex whitespace-nowrap uppercase text-blueGray-600 text-xl font-bold">{title}</h3>
        </div>
        <div className="flex space-x-4 items-center justify-center">
          { ( fileToLoaded ) && (
            <>
              <button
                type="button"
                className="flex items-center bg-white text-gray-800 border border-gray-300 py-2 px-4 mx-2 rounded shadow-xl hover:bg-gray-100 transition-all">
                <Link href={`/modal/file/${fileToLoaded.nom}`} className="group rounded-xl text-black flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                <span className="inline-block" >Aperçu</span>
                </Link>
              </button>            
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileReader;
