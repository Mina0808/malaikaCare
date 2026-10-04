"use client";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Badge } from "@/components/badge";
import Pagination from "@/components/pagination";
import {
  getColorByRequestStatus,
  getColorByUserStatus,
  translateRequest,
  translateRequestStatus,
  translateRequestType,
} from "@/Services/ServicesFront/keywords";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import Loader from "../../loading";
import { useRouter } from "next/navigation";
import {
  getUserByRequest,
  listRequests,
} from "@/Services/ServicesFront/users";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  let requestC = useRef<any>([]);
  const [statut, setStatut] = useState("");
  const [requests, setRequests] = useState<any[]>([]);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userRequests, setUserRequests] = useState<Map<number, any>>(new Map());
  const router = useRouter();

  async function fetchData(page = 1, filter?: string) {
    setLoading(true);
    const { request, totalPages } = await listRequests(page, filter);
    console.log(request);
    requestC.current = request;
    setRequests(request);
    //setUsers(users)
    setPages(totalPages);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function filterRequest(status: string) {
    setStatut(status);
    //const [type,stat] = status.split(" ")
    if (status !== "Toutes les requêtes") {
      fetchData(1, status);
    } else fetchData();
  }

  if (loading) return <Loader />;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-blue-950">
            Gestion Complète des Demandes & Devis
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Consultez, validez et affectez les intervenants pour chaque dossier
            client.
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
              value="Toutes les requêtes"
              onClick={(e) =>
                filterRequest((e.currentTarget as HTMLButtonElement).value)
              }
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                statut === "Toutes les requêtes"
                  ? "bg-white text-blue-950 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Tous
            </button>
            <button
              value="SUBMITTED"
              onClick={(e) =>
                filterRequest((e.currentTarget as HTMLButtonElement).value)
              }
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                statut === "SUBMITTED"
                  ? "bg-amber-500 text-blue-950 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Soumise
            </button>
            <button
              value="FINISHED"
              onClick={(e) =>
                filterRequest((e.currentTarget as HTMLButtonElement).value)
              }
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                statut === "FINISHED"
                  ? "bg-blue-950 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Traitée
            </button>
          </div>
        </div>
        <br />
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase text-[10px]">
              <th className="pb-3">Client</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Téléphone</th>
              <th className="pb-3">Type de demande</th>
              <th className="pb-3">Statut</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requestC.current.map((request: any, index: any) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="py-3 font-extrabold text-slate-900">
                  {userRequests.get(request.id)?.firstName}{" "}
                  {userRequests.get(request.id)?.lastName}
                </td>
                <td className="py-3 font-extrabold text-slate-900">
                  {userRequests.get(request.id)?.email}
                </td>
                <td className="py-3 text-slate-700">
                  {userRequests.get(request.id)?.phone}
                </td>
                <td className="py-3 font-bold text-blue-950">
                  {translateRequestType(request.type)}
                </td>
                <td className="py-3">
                  <span className="font-bold text-slate-600">
                    {request.status !== null
                      ? translateRequestStatus(request.status)
                      : "Indéfini"}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button
                    onClick={() =>
                      router.push(`/backoffice/care/requests/${request.id}`)
                    }
                    className="bg-amber-500 text-blue-950 font-bold px-3 py-1 rounded-lg text-xs"
                  >
                    Détails / Traiter
                  </button>
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
