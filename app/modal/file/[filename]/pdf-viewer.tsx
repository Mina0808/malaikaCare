"use client";

import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

interface Props {
  url: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PDFViewer = ({ url }: Props) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log("numPages")
    setNumPages(numPages);
  }

  console.log("url",url)

  return (
    <div>
      <Document
        file={`${url}`}
        onLoadSuccess={onDocumentLoadSuccess}
        loading="Chargement du PDF..."
        className={"w-full h-[80vh]"}
      >
      </Document>
    </div>
  );
};

export default PDFViewer;
