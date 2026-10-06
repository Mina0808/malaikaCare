"use client"
export const dynamic = "force-dynamic";

import { getToken, getClientFromSession } from "@/lib/session";
import { faCircleChevronLeft, faFloppyDisk, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../loading";
import { KeyRound, Save, User, Lock } from "lucide-react";
import { updatePassword, updateUserFront } from "@/Services/ServicesFront/users";

export default function Profil() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
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

  const handleProfileSave =async (e:any) => {
    e.preventDefault();
    await updateUserFront(user.id, user, "INDIVIDUAL")
    showToast("Modifications du profil enregistrées avec succès !");
  };

  const handlePasswordChange = async(e:any) => {
    e.preventDefault();
    if (user.newPassword !== user.confirmPassword) {
      showToast("Erreur : Les mots de passe ne correspondent pas.");
      return;
    }
    if (user.newPassword.length < 8) {
      showToast("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    await updatePassword(user.id, passwordData.newPassword, "INDIVIDUAL")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    showToast("Mot de passe mis à jour avec succès !");
  };

  async function fetchData() {
    const user = await getClientFromSession(await getToken())
    setUser(user)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading)
    return (
      <Loader />)

  return (
    <div className="flex flex-col gap-4">
      <button className="flex justify-start items py-2 px-4 rounded transition-all fa-2xl"
        onClick={() => router.back()}>
        <FontAwesomeIcon icon={faCircleChevronLeft} className="mr-2" />
      </button>
      <div className="grid grid-cols-1 bg-white border border-gray-400 shadow-2xl rounded-lg container mx-auto overflow-y-auto py-3 border">
        <h1 className="text-3xl font-bold mb-4">Page de profil</h1>

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
          onClick={() => setProfileSubTab("password")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            profileSubTab === "password"
              ? "bg-blue-950 text-white shadow-md"
              : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
          }`}
        >
          <KeyRound className="w-4 h-4 text-amber-500" />
          <span>Mot de passe</span>
        </button>
      </div>

      {profileSubTab === "general" && (
        <form
          onSubmit={handleProfileSave}
          className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6 animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-black text-blue-950">
                Informations Personnelles & Contact d'urgence
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Mettez à jour vos coordonnées et les coordonées du contact d'urgence.
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
                Adresse Email 
              </label>
              <input
                type="email"
                value={user?.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                disabled
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
                Adresse postale (Sénégal) 
              </label>
              <input
                type="text"
                value={user?.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                disabled
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Ville
              </label>
              <input
                type="text"
                value={user?.city}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold font-mono"
              />
            </div>

          </div>
            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-blue-950 mb-3">
                Contact en cas d'Urgence
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Prénom du Contact
                  </label>
                  <input
                    type="text"
                    value={user?.contactFirstName || ""}
                    onChange={(e) =>
                      setUser({ ...user, contactFirstName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nom du Contact
                  </label>
                  <input
                    type="text"
                    value={user?.contactLastName || ""}
                    onChange={(e) =>
                      setUser({ ...user, contactLastName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email d'urgence
                  </label>
                  <input
                    type="text"
                    value={user?.contactEmail || ""}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        contactEmail: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Téléphone d'urgence
                  </label>
                  <input
                    type="text"
                    value={user?.contactPhone || ""}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        contactPhone: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold font-mono"
                  />
                </div>
              </div>
            </div>
          {/* <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Sauvegarder les modifications</span>
            </button>
          </div> */}
        </form>
      )}

      {/* SUB TAB 2: PASSWORD */}
      {profileSubTab === "password" && (
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
        </div>
      )}
    </div>
  );
}

