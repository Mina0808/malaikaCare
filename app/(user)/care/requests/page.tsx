"use client"
import { EyeIcon } from "@heroicons/react/24/solid";
import { Badge } from "@/components/badge";
import Pagination from "@/components/pagination";
import { getColorByRequestStatus, translateRequestStatus, translateRequestType } from "@/Services/ServicesFront/keywords";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import Loader from "../../loading";
import { useRouter } from "next/navigation";
import { getRequestsByUser, getBeneficiaryByRequest } from "@/Services/ServicesFront/users";
import Link from "next/link";
import { getUserFromSession, getToken } from "@/lib/session";

export const dynamic = "force-dynamic";


export default function Page({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  let requestC = useRef<any>([]);
  const [statut, setStatut] = useState("")
  const [requests, setRequests] = useState<any[]>([])
  const [beneficiaries, setBeneficiaries] = useState<Map<number, any>>(new Map())
  const [pages, setPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  async function fetchData(page=1, filter?:string) {
    setLoading(true)
    const user = await getUserFromSession(getToken())
    const {requests, totalPages} = await getRequestsByUser(user, page, filter);
    const requestBeneficiaries = new Map()
    for (let i = 0; i < requests.length; i++) {
      const req = requests[i]
      if (req.benefactorId) {
        const beneficiary = await getBeneficiaryByRequest(req.benefactorId)
        requestBeneficiaries.set(req.id, beneficiary)
      }

    }
    requestC.current = requests
    setRequests(requests)
    setPages(totalPages)
    setBeneficiaries(requestBeneficiaries)
    setUser(user)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  function filterRequest(status: string) {
    setStatut(status)
    //const [type, stat] = status.split(" ")
    if (status !== "Toutes les requêtes") {
      fetchData(1, status)
    }
    else
    fetchData()
  }


  if (loading)
    return (
      <Loader />)

  return (
    <div className="container mx-auto mt-3">
      <button className="items-center py-2 px-4 rounded transition-all fa-2xl"
        onClick={() => router.back()}>
        <FontAwesomeIcon icon={faCircleChevronLeft} className="mr-2" />
      </button>
      <div className="flex flex-row justify-between">
        <div>
          <select
            name="status"
            value={statut}
            title="Filtrer par statut"
            onChange={(e) => filterRequest(e.target.value)}
            className="rounded-md ml-2 xl:ml-0 border-0 min-w-max text-xl text-gray-900 shadow-xl py-2 px-4 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-umber sm:text-sm sm:leading-6"
          >
            <option value="Toutes les requêtes">Toutes les requêtes</option>
            <option value={"SUBMITTED"}>Demande soumise</option>
            <option value={"RECEIVED"}>Demande validée</option>
            <option value={"FINISHED"}>Demande traitée</option>
          </select>
        </div>
      </div>
      <div className="bg-white border border-gray-400 shadow-2xl rounded-lg mx-0 mt-4 py-10 px-0 overflow-x-auto">
        <div className="inline-block min-w-full py-2 px-8">
          <table className="min-w-full acc ach">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap py-3 pr-3 text-left text-xl font-semibold text-gray-900 pl-0"
                >
                  Prénom Nom
                </th>
                <th
                  scope="col"
                  className="py-3 pr-3 text-left text-xl font-semibold text-gray-900 pl-0 hidden xl:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xl font-semibold text-gray-900"
                >
                  Téléphone
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xl font-semibold text-gray-900 hidden xl:table-cell"
                >
                  Type de demande
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xl font-semibold text-gray-900 hidden xl:table-cell"
                >
                  Statut
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {requestC.current.map((request: any, index: any) => (
                <tr key={index}>
                  <td className="whitespace-nowrap py-4 pr-3 text-xl font-medium text-gray-900 pl-0">
                    {request.benefactorId ? beneficiaries.get(request.id).firstName : user.firstName} {request.benefactorId ? beneficiaries.get(request.id).lastName : user.lastName}
                  </td>
                  <td className="whitespace-nowrap py-4 pr-3 text-xl font-medium text-gray-900 pl-0 hidden xl:table-cell">
                    {request.benefactorId ? beneficiaries.get(request.id).email : user.email}
                  </td>
                  <td className="xl:whitespace-nowrap px-3 py-4 text-xl">
                    {request.benefactorId ? beneficiaries.get(request.id).phone : user.phone}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-xl hidden xl:table-cell">
                    {translateRequestType(request.type)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-xl hidden xl:table-cell">
                    <Badge text={translateRequestStatus(request.status)} color={getColorByRequestStatus(request.status)} size="medium" />
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-0 text-right hidden xl:table-cell">
                    <span className="inline-flex gap-4">
                      <Link href={`/care/requests/${request.id}`} className="hover:text-blue-700">
                        <EyeIcon className="w-6 h-6" />
                      </Link>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination setPage={fetchData} totalPages={pages} />
    </div>
  );
}
