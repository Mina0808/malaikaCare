"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import Loader from "../loading";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { PencilIcon } from "@heroicons/react/24/outline";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { getDocumentsByPageFront } from "@/Services/ServicesFront/documents";


export const dynamic = "force-dynamic";

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [slides, setSlides] = useState([] as any[])

  async function fetchData() {
    const slide = await getDocumentsByPageFront("home")
    slide.map((item) => {
      const url = "/file/" + item.name
      item.name = url
    })
    setSlides(slide)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading)
    return (
      <Loader />)
  return (
    <div className="mx-2 w-full flex justify-center items-center sm:px-0">
      <div className="w-full flex flex-col">
        <div className="flex justify-end mr-50">
          <Link href={"/backoffice/editSlide"}>
            <button className="text-xl text-gray-500 hover:text-yellow-200 mr-2">
              <PencilIcon className="w-7 h-7" />
            </button>
          </Link>
        </div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 15000,
            disableOnInteraction: false,
          }}
          navigation
          pagination={{
            clickable: true,
          }}

          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper flex w-full overflow-hidden"
        >
          {slides.map((item, index) => (
            <SwiperSlide key={index} className="shadow-xl rouded-lg">
              <div className="relative flex-auto">
                {item.type === "image" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`${item.name}`} alt="image" className="w-full h-[80vh]" />
                )}
                {item.type === "video" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <video src={`${item.name}`} height={700} autoPlay controls className="w-full h-[80vh]" />
                )}
                {item.type === "pdf" && (
                  <iframe
                    src={`/file/CV_Aminata_Sylla_.pdf`}
                    className="w-full h-[80vh]"
                    title="document pdf"
                  />
                  // <PDFViewer url={`/file/bilan ent.pdf`}/>
                )}
              </div>
            </SwiperSlide>
          ))}


        </Swiper>
      </div>
    </div>
  );
}