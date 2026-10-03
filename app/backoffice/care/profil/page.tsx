"use client";
export const dynamic = "force-dynamic";

import { getToken, getUserFromSession } from "@/lib/session";
import {
  getStatsFront,
} from "@/Services/ServicesFront/users";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../loading";
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
  User,
  KeyRound,
  Smartphone,
  History,
  Lock,
  Save,
  Camera,
  ShieldAlert,
  Globe,
  Sliders,
  CheckCircle,
  FileText,
} from "lucide-react";

export default function Profil() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Map<string, number>>(new Map());
  const router = useRouter();
  const [profileSubTab, setProfileSubTab] = useState("general");
  const [toastMessage, setToastMessage] = useState(null);

  // Password change form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Show Toast helper
  const showToast = (msg:any) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleProfileSave = (e:any) => {
    e.preventDefault();
    showToast("Modifications du profil enregistrées avec succès !");
  };

  const handlePasswordChange = (e:any) => {
    e.preventDefault();
    if (user.newPassword !== user.confirmPassword) {
      showToast("Erreur : Les mots de passe ne correspondent pas.");
      return;
    }
    if (user.newPassword.length < 8) {
      showToast("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    showToast("Mot de passe mis à jour avec succès !");
  };
  let phone = "";

  const securityLogs = [
    {
      id: 1,
      event: "Connexion réussie au portail Admin",
      ip: "197.224.23.10",
      date: "27 Sept. 2026 - 08:30",
    },
    {
      id: 2,
      event: "Validation du devis REQ-2026-088",
      ip: "197.224.23.10",
      date: "26 Sept. 2026 - 15:40",
    },
    {
      id: 3,
      event: "Modification de la grille tarifaire Care",
      ip: "197.224.88.42",
      date: "25 Sept. 2026 - 11:20",
    },
    {
      id: 4,
      event: "Mise à jour de l'attestation 2FA",
      ip: "197.224.23.10",
      date: "20 Sept. 2026 - 09:12",
    },
  ];

  const sessionInfo = [
    {
      id: 1,
      device: 'MacBook Pro 16" - Chrome 129',
      ipAddress: "Dakar, Sénégal (IP: 197.224.23.10)",
      lastActive: "Session actuelle • Connecté à 08:30",
      current: true,
    },
    {
      id: 2,
      device: "iPhone 15 Pro - App Mobile Malaika",
      ipAddress: "Saly, Petite Côte (IP: 197.224.88.42)",
      time: "Dernière activité hier à 22:15",
      current: false,
    },
  ];

  async function fetchData() {
    const user = await getUserFromSession(await getToken());
    setUser(user);

    //Informations clients
    const stat = await getStatsFront();
    setStats(stat);
    setLoading(false);

    // //Informations commandes
    // const nbPackges = await getPackageCount()
    // setNbPack(nbPackges)
    // const nbPackgesDelivered = await getPackageCount(StatusPackage.DELIVERED)
    // setNbPackDelivered(Math.round((nbPackgesDelivered / nbPackges) * 100))
    // const nbPackgesUndelivered = await getPackageCount(StatusPackage.UNDELIVERABLE)
    // setNbPackUndelivered(Math.round((nbPackgesUndelivered / nbPackges) * 100))
    // const nbPackgesCreated = await getPackageCount(StatusPackage.CREATED)
    // const nbPackgesSubmitted = await getPackageCount(StatusPackage.SUBMITTED)
    // const nbPackgesCorrection = await getPackageCount(StatusPackage.AWAITING_CORRECTION)
    // const montantTotal = await getMontantFront()
    // if (montantTotal) setMontant(montantTotal)
    // setNbPackActive(Math.round(((nbPackges - (nbPackgesUndelivered + nbPackgesCreated + nbPackgesSubmitted + nbPackgesCorrection)) / nbPackges) * 100))
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* PROFILE HEADER HERO CARD */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-900/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          {/* AVATAR WITH BADGE */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-300 text-blue-950 font-black text-3xl sm:text-4xl flex items-center justify-center shadow-2xl border-4 border-blue-900">
              FN
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-950 hover:bg-blue-900 text-amber-400 p-2 rounded-xl border border-amber-400/40 shadow-md transition-all">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* USER INFO & METRICS */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {user?.firstName} {user?.lastName}
              </h1>
              <span className="bg-amber-500 text-blue-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" /> Compte Super
                Administrateur
              </span>
            </div>

            <p className="text-amber-300 font-semibold text-xs sm:text-sm">
              {user?.role} • Malaika Care
            </p>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {user?.city}, {user?.country}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                {user?.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                {user?.phone}
              </span>
            </div>
          </div>
          {/* QUICK STATS PILLS */}
          <div className="flex md:flex-col gap-3 shrink-0">
            <div className="bg-blue-900/60 border border-blue-800 rounded-2xl px-4 py-2.5 text-center">
              <span className="block text-xl font-black text-amber-400">
                142
              </span>
              <span className="text-[10px] text-slate-300 font-medium">
                Demandes supervisées
              </span>
            </div>
            <div className="bg-blue-900/60 border border-blue-800 rounded-2xl px-4 py-2.5 text-center">
              <span className="block text-xl font-black text-emerald-400">
                99.4%
              </span>
              <span className="text-[10px] text-slate-300 font-medium">
                Qualité & Réactivité
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* PROFILE SUB-NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setProfileSubTab("general")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            profileSubTab === "general"
              ? "bg-blue-950 text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
          }`}
        >
          <User className="w-4 h-4 text-amber-500" />
          <span>Informations Générales</span>
        </button>

        <button
          onClick={() => setProfileSubTab("security")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            profileSubTab === "security"
              ? "bg-blue-950 text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
          }`}
        >
          <KeyRound className="w-4 h-4 text-amber-500" />
          <span>Sécurité & 2FA</span>
        </button>
      </div>
      {/* SUB TAB 1: INFORMATIONS GENERALES FORM */}
      {profileSubTab === "general" && (
        <form
          onSubmit={handleProfileSave}
          className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6 animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-black text-blue-950">
                Informations Personnelles & Professionnelles
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Mettez à jour vos coordonnées administratives pour le réseau
                Malaika Sénégal.
              </p>
            </div>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Prénom
              </label>
              <input
                type="text"
                value={user?.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nom de famille
              </label>
              <input
                type="text"
                value={user?.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Adresse Email professionnelle
              </label>
              <input
                type="email"
                value={user?.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Téléphone Direct (Sénégal)
              </label>
              <input
                type="text"
                value={user?.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Intitulé du poste
              </label>
              <input
                type="text"
                value={user?.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Localisation / Agence Principale
              </label>
              <input
                type="text"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>
          </div>
          {user?.isEmergencyContact && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-blue-950 mb-3">
                Contact en cas d'Urgence
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nom du Contact
                  </label>
                  <input
                    type="text"
                    value={user?.emergencyContactName || ""}
                    onChange={(e) =>
                      setUser({ ...user, emergencyContactName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Téléphone d'urgence
                  </label>
                  <input
                    type="text"
                    value={user?.emergencyContactPhone || ""}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        emergencyContactPhone: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold font-mono"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Sauvegarder les modifications</span>
            </button>
          </div>
        </form>
      )}

      {/* SUB TAB 2: SECURITY & PASSWORD & SESSIONS */}
      {profileSubTab === "security" && (
        <div className="space-y-6 animate-fade-in">
          {/* CHANGE PASSWORD */}
          <form
            onSubmit={handlePasswordChange}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-5"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-blue-950">
                  Changer le mot de passe
                </h2>
                <p className="text-xs text-slate-500">
                  Pour des raisons de sécurité, nous recommandons de renouveler
                  votre mot de passe régulièrement.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Mettre à jour le mot de passe</span>
              </button>
            </div>
          </form>

          {/* ACTIVE SESSIONS & AUDIT LOG */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SESSIONS */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
              <h3 className="font-extrabold text-sm text-blue-950 mb-4 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-600" />
                <span>Sessions & Appareils Actifs</span>
              </h3>
              <div className="space-y-3 text-xs">
                {sessionInfo.map((s) => (
                  <div
                    key={s.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-extrabold text-slate-900">
                        {s.device}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {s.ipAddress}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {s.lastActive}
                      </p>
                    </div>
                    {s.current ? (
                      <span className="text-[10px] font-bold text-blue-950 bg-amber-400 px-2.5 py-1 rounded-full shrink-0">
                        Actif
                      </span>
                    ) : (
                      <button className="text-[10px] text-red-600 font-bold hover:underline shrink-0">
                        Déconnecter
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* AUDIT LOG */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
              <h3 className="font-extrabold text-sm text-blue-950 mb-4 flex items-center gap-2">
                <History className="w-4 h-4 text-amber-600" />
                <span>Historique d'Audit Sécurité</span>
              </h3>
              <div className="space-y-3 text-xs">
                {securityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start justify-between border-b border-slate-100 pb-2.5"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{log.event}</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        IP: {log.ip}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap">
                      {log.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
