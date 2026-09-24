import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React from "react";

const FileInput = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    files?: FileList;
    [key: string]: any;
  }
>(({ label, files, ...props }, ref) => {
  return (
    <div className="relative">
      <label htmlFor="fileInput" className="block text-xl font-medium">
        {label}
      </label>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        multiple
        {...props}
        ref={ref}
      />
      <label
        htmlFor="fileInput"
        className="mt-2 flex justify-center items-center gap-2 rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
      >
        <ArrowUpTrayIcon className="h-6 w-6 text-gray-900/50" />
        {/* <div className="text-xl leading-6 text-gray-600">
          {files?.length
            ? Array.from(files).map((file) => (
                <p key={file.name}>{file.name}</p>
              ))
            : "Choisir un fichier"}
        </div> */}
      </label>
    </div>
  );
});

FileInput.displayName = "FileInput";
export default FileInput;
