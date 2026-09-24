"use client"
import { EyeIcon } from "@heroicons/react/24/solid";
import { Badge } from "@/components/badge";
import Pagination from "@/components/pagination";
import { getColorByUserStatus, translateRequest } from "@/Services/ServicesFront/keywords";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import Loader from "../../loading";
import { useRouter } from "next/navigation";
import { getUsersByRequests, listCustomers, listRequests } from "@/Services/ServicesFront/users";
import Link from "next/link";

export const dynamic = "force-dynamic";


export default function Page({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  let userC = useRef<any>([]);
  const [users, setUsers] = useState<any[]>([])
  const [statut, setStatut] = useState("")
  const [pages, setPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  async function fetchData(page=1, filter?:string) {
    setLoading(true)
    console.log("fetch data")
    const { users, totalPages } = await listCustomers(page, filter);
    userC.current = users
    setUsers(users)
    setPages(totalPages)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  function filterUsers(status: string) {
    setStatut(status)
    if (status !== "Tous les clients") {
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
            onChange={(e) => filterUsers(e.target.value)}
            className="rounded-md ml-2 xl:ml-0 border-0 min-w-max text-xl text-gray-900 shadow-xl py-2 px-4 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-umber sm:text-sm sm:leading-6"
          >
            <option value="Tous les clients">Tous les clients</option>
            <option value={"ACTIF"}>Actifs</option>
            <option value={"INACTIF"}>Inactifs</option>
          </select>
        </div>
        <Link className="rounded-md flex items-center bg-blue-400 text-white text-xl border border-gray-300 ml-2 xl:ml:0 py-2 px-4 rounded shadow-xl hover:bg-blue-500 transition-all`" href="/backoffice/care/customers/add">
          Ajouter un nouveau client
        </Link>
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
                  Statut
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {userC.current.map((user:any, index:any) => (
                <tr key={index}>
                  <td className="whitespace-nowrap py-4 pr-3 text-xl font-medium text-gray-900 pl-0">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="whitespace-nowrap py-4 pr-3 text-xl font-medium text-gray-900 pl-0 hidden xl:table-cell">
                    {user.email}
                  </td>
                  <td className="xl:whitespace-nowrap px-3 py-4 text-xl">
                    {user.phone}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-xl hidden xl:table-cell">
                    <Badge text={user.status !== null ? user.status : "Indéfini"} color={getColorByUserStatus(user.status)} size="medium" />
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-0 text-right hidden xl:table-cell">
                    <span className="inline-flex gap-4">
                      <Link href={`/backoffice/care/customers/${user.id}`} className="hover:text-blue-700">
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
