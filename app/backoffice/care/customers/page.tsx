"use client";

import { Badge } from "@/components/badge";
import Pagination from "@/components/pagination";
import {
  getColorByUserStatus,
} from "@/Services/ServicesFront/keywords";
import { useState, useEffect, useRef } from "react";
import Loader from "../../loading";
import { useRouter } from "next/navigation";
import {
  getClients,
  getClientsByProfessionals,
} from "@/Services/ServicesFront/users";
import Link from "next/link";
import { View } from "lucide-react";
import { getProfessionalFromSession, getToken } from "@/lib/session";

export const dynamic = "force-dynamic";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  let clientC = useRef<any>([]);
  const [user, setUser] = useState<any>();
  const [statut, setStatut] = useState("");
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function fetchData(page = 1, filter?: string) {
    setLoading(true);
    const user = await getProfessionalFromSession(await getToken())
    console.log("fetch data");
    if (user) {
      if(user.role=="ADMIN"){
        const { clients, totalPages } = await getClients(page, filter);
        clientC.current = clients;
      setPages(totalPages);
      }
      else{
        const { clients, totalPages } = await getClientsByProfessionals(user?.id, page, filter);
        clientC.current = clients;
      setPages(totalPages);
      }
      setUser(user)
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  function filterUsers(status: string) {
    setStatut(status);
    if (status !== "Tous les clients") {
      fetchData(1, status);
    } else fetchData();
  }

  if (loading) return <Loader />;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-blue-950">
            Gestion du Répertoire Patients & Clients
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Retrouvez l'historique médical des patients suivis par Malaika Care
            ainsi que les comptes clients.
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
        >
          ← Retour au Tableau de bord
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex flex-row justify-between">
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/60 self-start sm:self-auto">
            <button
              value="Tous les clients"
              onClick={(e) =>
                filterUsers((e.currentTarget as HTMLButtonElement).value)
              }
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${statut === "Tous les clients"
                  ? "bg-white text-blue-950 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              Tous
            </button>
            <button
              value="ACTIF"
              onClick={(e) =>
                filterUsers((e.currentTarget as HTMLButtonElement).value)
              }
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${statut === "ACTIF"
                  ? "bg-amber-500 text-blue-950 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              Actifs
            </button>
            <button
              value="INACTIF"
              onClick={(e) =>
                filterUsers((e.currentTarget as HTMLButtonElement).value)
              }
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${statut === "INACTIF"
                  ? "bg-blue-950 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              Inactifs
            </button>
          </div>
          {user.role == "ADMIN" && (
            <Link
              className="bg-blue-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl`"
              href="/backoffice/care/customers/add"
            >
              Ajouter un nouveau client
            </Link>
          )}

        </div>
        <br />
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase text-[10px]">
              <th scope="col" className="pb-3">
                Prénom Nom
              </th>
              <th scope="col" className="pb-3">
                Email
              </th>
              <th scope="col" className="pb-3">
                Téléphone
              </th>
              <th scope="col" className="pb-3">
                Statut
              </th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clientC.current.map((client: any, index: any) => (
              <tr key={index}>
                <td className="py-3 font-extrabold text-slate-900">
                  {client.firstName} {client.lastName}
                </td>
                <td className="py-3 font-extrabold text-slate-900">
                  {client.email}
                </td>
                <td className="py-3 text-slate-700">{client.phone}</td>
                <td className="font-bold text-slate-600">
                  <Badge
                    text={client.status !== null ? client.status : "Indéfini"}
                    color={getColorByUserStatus(client.status)}
                    size="medium"
                  />
                </td>
                <td className="py-3 text-right">
                  <span className="inline-flex gap-4">
                    <Link
                      href={`/backoffice/care/customers/${client.id}`}
                      className="bg-amber-500 text-blue-950 font-bold px-3 py-1 rounded-lg text-xs"
                    >
                      <View className="w-6 h-6" />
                    </Link>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination setPage={fetchData} totalPages={pages} />
    </div>
  );
}
