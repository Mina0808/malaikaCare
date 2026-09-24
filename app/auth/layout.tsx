"use client"
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Suspense } from 'react'
import logo from "@/images/logo malaika.jpg";
import bg from "@/images/img_malaika.png";
import Loader from './loading'
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Auth({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <div className="relative flex flex-col">

      <div className="absolute inset-0">
        <Image
          src={bg}
          alt="background image"
          className="object-cover w-full h-full blur-2xl"
          priority
        />
      </div>

      <div className=" flex flex-row z-10">

        <div className=" flex items-center md:block md:p-4 w-full">
          <div className="flex flex-col mx-8 md:mt-2 h-full bg-white shadow-[0_35px_60px_-5px_rgba(0,0,0,2)]">
            <button className="flex items-start py-2 px-4 rounded transition-all fa-2xl"
                onClick={() => router.back()}>
                <FontAwesomeIcon icon={faCircleChevronLeft} className="mr-2" />
            </button>
            <div className="flex justify-center items-center w-full ">
                <Link href="/" className="flex justify-center items-center">
              <Image
                src={logo}
                alt="logo"
                className="w-[50%] h-[50%] flex justify-center items-center"
                priority
              />
            </Link>
            </div>

            <Suspense fallback={<Loader />}>
              <div className="flex justify-center w-full">
                <div className="px-8 w-full">{children}</div>
              </div>
            </Suspense>
          </div>
        </div>
      </div>

      {/* <footer className="absolute relative bottom-0 w-full text-center z-15">
        <p>INDITEKK</p>
        <p>
          <span className="font-sans">&copy;</span> Inclusive IT
        </p>
      </footer> */}
      <footer className="sticky w-full text-center my-5">
        <p>
          <span className="font-sans">&copy;</span> Malaika Care & Conseil
        </p>
      </footer>
    </div>
  );
}
