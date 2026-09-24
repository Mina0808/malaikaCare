"use client"

import { useEffect, useState } from "react";
import AddSection from "./newSection";
//import { getAllContents, getAllSections } from "@/Services/ServicesFront/faq";
import AddContent from "./newContent";
import EditContent from "./editContent";
import EditSection from "./editSection";
import DeleteContent from "./deleteContent";
import DeleteSection from "./deleteSection";

export const dynamic = "force-dynamic";

export default function Faq() {
  const [sections, setSections] = useState<any[]>([])
  const [contents, setContents] = useState(new Map())

  return (
    <div className="mx-8 py-16 px-4 md:px-0">
      <div className="flex justify-end">
        <AddSection />
      </div>
      <div className="grid grid-cols-1 mb-8 mt-4 p-2 gap-4">
        {sections.map((item: any, index: number) => (
          <div key={index} className="shadow-md rounded-lg bg-white border border-gray-400 bpackge p-4">
            <div className="flex flex-col md:flex-row gap-2 md:justify-between mb-4">
              <h2 className="font-bold uppercase text-xl">{item.name}</h2>
              <div className="flex gap-4">
                <AddContent sectionId={item.id} />
                <EditSection section={item} />
                <DeleteSection section={item} />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {contents.get(item.id)?.map((content: any, index: number) => (
                <div key={index} className="border border-blueGray-400 p-4">
                  <div className="flex flex-col md:flex-row gap-2 md:justify-between">
                    <h2 className="font-semibold uppercase text-xl mb-4 break-words">{content.title}</h2>
                    <div className="flex gap-4">
                    <EditContent content={content} />
                    <DeleteContent content={content} />
                    </div>
                  </div>
                  <label>
                    <pre dangerouslySetInnerHTML={{ __html: content.text }} className="break-words whitespace-pre-wrap" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
