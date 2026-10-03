"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loader from "../loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { getDocumentsByPageFront } from "@/Services/ServicesFront/documents";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Stethoscope,
  Briefcase,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Calendar,
  MapPin,
  ChevronRight,
  Phone,
  Mail,
  DollarSign,
  UserCheck,
  Building2,
  Sparkles,
  Download,
  Eye,
  X,
  ShieldCheck,
  Check,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState([] as any[]);

  const [selectedBranchFilter, setSelectedBranchFilter] = useState("ALL"); // 'ALL' | 'CARE' | 'CONSULTING'
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  async function fetchData() {
    const slide = await getDocumentsByPageFront("home");
    slide.map((item) => {
      const url = "/file/" + item.name;
      item.name = url;
    });
    setSlides(slide);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loader />;

  // Mock interventions schedule for today
  const todayInterventions = [
    {
      id: "INT-101",
      patient: "Mme Khady Ba (Sénior)",
      service: "Toilette & Pansement post-opératoire",
      staff: "Aminata Touré (Auxiliaire)",
      location: "Fann Résidence",
      time: "08:30 - 10:00",
      status: "IN_PROGRESS",
    },
    {
      id: "INT-102",
      patient: "El Hadj Oumar Tall",
      service: "Injection & Suivi tensionnel",
      staff: "Pape Mamadou Cissé (Infirmier)",
      location: "Sacré-Cœur 3",
      time: "11:00 - 11:45",
      status: "PLANNED",
    },
    {
      id: "INT-103",
      patient: "Famille Badiane",
      service: "Entretien ménager & Repassage",
      staff: "Ndéye Coumba Ndiaye",
      location: "Ngor Virage",
      time: "14:00 - 17:00",
      status: "PLANNED",
    },
  ];

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* TAB 1: DASHBOARD OVERVIEW */}

      <div className="space-y-8 animate-fade-in">
        {/* WELCOME BANNER */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-blue-900/50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-amber-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Portail de Gestion Officiel • Sénégal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Bonjour, Équipe Malaika 👋
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Voici l'état d'avancement des interventions de soins à domicile et
              des missions de conseils pour la journée.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <button
              onClick={() => setActiveTab("requests")}
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle demande</span>
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl backdrop-blur-sm transition-all flex items-center gap-2">
              <Download className="w-4 h-4 text-amber-400" />
              <span>Rapport du jour</span>
            </button>
          </div>
        </div>

        {}
        {/* KPI STAT CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* STAT 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Demandes en attente
              </span>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-blue-950">X</span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                A traiter
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-emerald-600">+18%</span>{" "}
              depuis la semaine dernière
            </p>
          </div>

          {/* STAT 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Soins & Services du jour
              </span>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-blue-950">28</span>
              <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full">
                Dakar & Régions
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              <span className="font-bold text-blue-950">12</span> en cours •{" "}
              <span className="font-bold text-emerald-600">16</span> planifiés
            </p>
          </div>

          {/* STAT 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Intervenants sur le terrain
              </span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-blue-950">42</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Actifs
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Infirmiers, Garde-malades, Chauffeurs
            </p>
          </div>

          {/* STAT 4 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Chiffre d'Affaires Mensuel
              </span>
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-blue-950">
                18.450.000
              </span>
              <span className="text-xs font-extrabold text-slate-500">
                FCFA
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-emerald-600">+14%</span> vs
              mois précédent
            </p>
          </div>
        </div>

        {}
        {/* MAIN TWO-COLUMN DASHBOARD SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN (2 COLS): DEMANDES ET DEVIS RECENTS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
              {/* SECTION HEADER & FILTERS */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-black text-blue-950 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-amber-600" />
                    <span>Dernières Demandes de Services & Devis</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Supervision en temps réel des pôles Care et Consulting
                  </p>
                </div>

                {/* BRANCH FILTER BUTTONS */}
                <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/60 self-start sm:self-auto">
                  <button
                    onClick={() => setSelectedBranchFilter("ALL")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                      selectedBranchFilter === "ALL"
                        ? "bg-white text-blue-950 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Tous
                  </button>
                  <button
                    onClick={() => setSelectedBranchFilter("CARE")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                      selectedBranchFilter === "CARE"
                        ? "bg-amber-500 text-blue-950 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Care
                  </button>
                  <button
                    onClick={() => setSelectedBranchFilter("CONSULTING")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                      selectedBranchFilter === "CONSULTING"
                        ? "bg-blue-950 text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Consulting
                  </button>
                </div>
              </div>

              {/* SEARCH BAR */}
              <div className="relative mb-5">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Rechercher par nom de client, quartier (ex: Almadies), service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                />
              </div>

              {/* REQUESTS TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="pb-3 pl-2">Référence & Client</th>
                      <th className="pb-3">Type de demande</th>
                      <th className="pb-3">Bénéficiaire</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Statut</th>
                      <th className="pb-3 text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-8 text-slate-400"
                      >
                        Aucune demande correspondant aux critères.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (1 COL): INTERVENTIONS DU JOUR & ALERTES */}
          <div className="space-y-6">
            {/* INTERVENTIONS DU JOUR (CARE) */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-sm text-blue-950 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Planning des Soins (Aujourd'hui)</span>
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Dakar
                </span>
              </div>

              <div className="space-y-3">
                {todayInterventions.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:bg-amber-50/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-extrabold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                        {item.time}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.location}
                      </span>
                    </div>
                    <p className="font-extrabold text-xs text-blue-950 mt-1">
                      {item.patient}
                    </p>
                    <p className="text-[11px] text-slate-600">{item.service}</p>
                    <div className="mt-2 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-500">
                      <span>
                        Intervenant :{" "}
                        <strong className="text-slate-800">{item.staff}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REPARTITION DES ACTIVITES */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
              <h3 className="font-extrabold text-sm text-blue-950 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Répartition des Services ce mois</span>
              </h3>

              <div className="space-y-3 text-xs font-semibold">
                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Soins Médicaux & Nursing</span>
                    <span className="font-extrabold text-blue-950">48%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[48%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Service à la personne & Chauffeurs</span>
                    <span className="font-extrabold text-blue-950">32%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-900 h-full w-[32%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Malaika Consulting & Formations</span>
                    <span className="font-extrabold text-blue-950">20%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[20%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
