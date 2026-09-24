"use client"

import { faLocationPin, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";
import { CiLinkedin } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function Footer({
  isOpen,
}: {
  isOpen: boolean
}) {
  return (
    <footer className={`w-full text-center`}>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">

          <div className="flex flex-col w-full">

            <div className="text-white h-3/4">
              <div className="grid grid-cols-4 place-content-center bg-blue-400 h-1/4 text-left">
                <label className="pl-4">Qui sommes-nous ?</label>
                <label className="pl-4">Nos services</label>
                <label className="pl-4">Nos agences</label>
                <label className="pl-4">Nous contacter</label>
              </div>
              <div className="bg-blue-300 h-3/4 grid grid-cols-4 place-content-center py-8">
                <table className=" bg-blue-300 w-full text-left">
                
                    <tr className="">
                      <Link href={''}>
                      <td className="px-4 py-2 font-medium">Qui sommes-nous ?</td>
                      </Link>
                    </tr>
                    <tr>
                    <Link href={''}>
                      <td className="px-4 py-2 font-medium">Comment ça marche ?</td>
                      </Link>
                    </tr>
                    <tr>
                    <Link href={''}>
                      <td className="px-4 py-2 font-medium">Actualités</td>
                      </Link>
                    </tr>
                
                </table>
                <table className=" bg-blue-300 w-full  text-left">
                  <tbody>
                  <tr className="">
                      <Link href={''}>
                      <td className="px-4 py-2 font-medium">Soins médicaux</td>
                      </Link>
                    </tr>
                    <tr>
                    <Link href={''}>
                      <td className="px-4 py-2 font-medium">Services à la personne</td>
                      </Link>
                    </tr>
                    <tr>
                    <Link href={''}>
                      <td className="px-4 py-2 font-medium">Coordination des soins</td>
                      </Link>
                    </tr>
                  </tbody>
                </table>
                <table className=" bg-blue-300 w-full  text-left">
                  <tbody>
                  <tr className="">
                      <Link href={''}>
                      <td className="px-4 py-2 font-medium"> <FontAwesomeIcon icon={faLocationPin} className="mr-2"/>Adresse 1</td>
                      </Link>
                    </tr>
                    <tr>
                    <Link href={''}>
                      <td className="px-4 py-2 font-medium"><FontAwesomeIcon icon={faLocationPin} className="mr-2"/>Adresse 2</td>
                      </Link>
                    </tr>
                  </tbody>
                </table>
                <table className=" bg-blue-300 w-full  text-left">
                  <tbody>
                  <tr className="">
                      <Link href={''}>
                      <td className="px-4 py-2 font-medium"> <FontAwesomeIcon icon={faMailBulk} className="mr-2"/>contact@malaika-cs.com</td>
                      </Link>
                    </tr>
                    <tr>
                    <Link href={''}>
                      <td className="px-4 py-2 font-medium"><FontAwesomeIcon icon={faPhone} className="mr-2"/>+221 78 256 70 70</td>
                      </Link>
                    </tr>
                    <tr>
                    <Link href={''}>
                      <td className="px-4 py-2 font-medium flex flex-row"> <CiLinkedin className="w-7 h-7 mr-2" /> Lien LinkedIn</td>
                      </Link>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between">

        </div>



        <div className="flex flex-col my-5">
          <p>
            <span className="font-sans">&copy;</span> Malaika Care & Conseil
          </p>
        </div>
      </div>

    </footer>
  );
}
