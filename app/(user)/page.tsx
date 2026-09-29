"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import logoCare from "@/images/logo_malaika_care.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserFromSession, getToken } from "@/lib/session";
import {
  HeartHandshake,
  Building2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  Home as HomeIcon,
  Users,
  BarChart3,
  GraduationCap,
  Sparkles,
  Menu,
  X,
  ArrowRight,
  UserCheck,
  Calendar,
  Activity,
  Heart,
  ChevronDown,
  Check,
  FileText,
  Award,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [activeFaq, setActiveFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const user = await getUserFromSession(getToken());
    setUser(user);
    setLoading(false);
  }

  async function getCare() {
    if (!user) {
      router.push("/care");
      return;
    }
    router.push(user?.role === "ADMIN" ? "/backoffice/care" : "/care");
  }
  function getConsulting() {
    router.push("/consulting");
  }

  // Smooth scroll helper
  const scrollToSection = (id:string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const toggleFaq = (index:any) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
  return (
    <>
      <section
        id="hero"
        className="relative bg-gradient-to-b from-amber-50/60 via-white to-slate-50 pt-12 pb-20 overflow-hidden"
      >
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-200/20 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-100/80 border border-amber-300 text-amber-900 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-6 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Réseau d'excellence en soins & accompagnement</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-700 tracking-tight leading-[1.15] mb-6">
                Prendre soin de vous <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  & booster votre performance.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                <strong>Malaika Conseils & Services</strong> allie le soin
                médical personnalisé à domicile et le conseil stratégique aux
                entreprises. Une approche humaine, réactive et hautement
                qualifiée.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <button
                  onClick={() => router.push("/care/quote")}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 transition-all flex items-center justify-center gap-3 group"
                >
                  <span>Demander une estimation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection("portals")}
                  className="w-full sm:w-auto bg-white hover:bg-slate-100 text-blue-950 border-2 border-slate-200 font-bold text-base px-8 py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Découvrir nos 2 pôles
                </button>
              </div>

              {/* Key Quick Advantages */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/80 pt-6 text-slate-700 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">
                    Equipe professionnelle & qualifiée
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">
                    Réponse sous 24h
                  </span>
                </div>
                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">
                    Agrément & Conformité
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Frame */}
                <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-blue-800">
                  <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl"></div>

                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-extrabold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                      Nos Engagements
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 leading-snug">
                    Un seul partenaire pour vos besoins de santé et de conseil.
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-start gap-4 border border-white/10 hover:bg-white/15 transition-all">
                      <div className="p-2.5 bg-amber-500 rounded-xl text-white shrink-0">
                        <Heart className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-amber-300">
                          Malaika Care
                        </h4>
                        <p className="text-xs text-slate-200 mt-0.5">
                          Soins infirmiers, aide aux personnes vulnérables &
                          garde malade à domicile 7j/7.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-start gap-4 border border-white/10 hover:bg-white/15 transition-all">
                      <div className="p-2.5 bg-blue-600 rounded-xl text-white shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-blue-300">
                          Malaika Consulting
                        </h4>
                        <p className="text-xs text-slate-200 mt-0.5">
                          Audits de performance, accompagnement au changement &
                          formations RH.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Reassurance Badge Floating */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 font-medium">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-emerald-400" /> +1 200
                      familles & pros suivis
                    </span>
                    <span className="text-amber-400 font-bold">
                      En savoir plus →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION: POLE */}
      <section
        id="portals"
        className="py-20 bg-slate-100/70 border-y border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest bg-amber-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Deux grands domaines d'intervention
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
              Choisissez le pôle adapté à vos besoins
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              Que vous cherchiez des soins de santé à domicile ou un
              accompagnement professionnel pour votre entreprise, Malaika
              déploie ses experts.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* PORTAL 1: MALAIKA CARE */}
            <div
              id="care-section"
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border-2 border-amber-200/80 hover:border-amber-400 transition-all flex flex-col justify-between relative group"
            >
              <div className="absolute top-6 right-6 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full">
                Pôle Santé & Domicile
              </div>

              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center mb-6 shadow-md shadow-amber-500/20">
                  <Image src={logoCare} alt="Logo Malaika Care" />
                </div>

                <h3 className="text-3xl font-black text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                  Malaika Care
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                  Le pôle de soins et de services à domicile. Nos équipes
                  qualifiées interviennent directement chez vous pour préserver
                  la santé, le confort et l'autonomie de vos proches 7j/7.
                </p>

                <div className="space-y-6 mb-8">
                  {/* Category 1 */}
                  <div>
                    <h4 className="text-sm font-extrabold text-blue-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-amber-600" />
                      Soins médicaux à domicile
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700 font-medium">
                      <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                        Soins infirmiers sur ordonnance
                      </li>
                      <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                        Garde malade & nursing
                      </li>
                      <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                        Accompagnement hospitalier
                      </li>
                      <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                        Visites de médecins à domicile
                      </li>
                    </ul>
                  </div>

                  {/* Category 2 */}
                  <div>
                    <h4 className="text-sm font-extrabold text-blue-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <HomeIcon className="w-4 h-4 text-amber-600" />
                      Services à la personne & confort
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700 font-medium">
                      <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                        Entretien & hygiène du logement
                      </li>
                      <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                        Bien-être & promenade seniors
                      </li>
                      <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                        Aide aux repas & courses
                      </li>
                      <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />{" "}
                        Assistance administrative familiale
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={getCare}
                  disabled={loading}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-md text-center transition-colors flex items-center justify-center gap-2"
                >
                  <span>Accéder à Care</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* PORTAL 2: MALAIKA CONSULTING */}
            <div
              id="consulting-section"
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border-2 border-blue-200 hover:border-blue-500 transition-all flex flex-col justify-between relative group"
            >
              <div className="absolute top-6 right-6 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full">
                Pôle Entreprises & ORG
              </div>

              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-950/20">
                  <Image src={logoCare} alt="Logo Malaika Consulting" />
                </div>

                <h3 className="text-3xl font-black text-blue-950 mb-3 group-hover:text-blue-700 transition-colors">
                  Malaika Consulting
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                  Le cabinet de conseil spécialisé dans le développement humain
                  et organisationnel. Nous accompagnons les entreprises,
                  institutions et ONG vers l'excellence opérationnelle.
                </p>

                <div className="space-y-4 mb-8">
                  {/* Service 1 */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                    <h4 className="text-base font-extrabold text-blue-950 flex items-center gap-2 mb-1">
                      <BarChart3 className="w-5 h-5 text-blue-600 shrink-0" />
                      Audits de Performance & Qualité
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Diagnostic approfondi de vos processus internes,
                      optimisation des flux de travail et feuille de route
                      pragmatique.
                    </p>
                  </div>

                  {/* Service 2 */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                    <h4 className="text-base font-extrabold text-blue-950 flex items-center gap-2 mb-1">
                      <Users className="w-5 h-5 text-blue-600 shrink-0" />
                      Accompagnement au Changement
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Pilotage des transformations organisationnelles et
                      managériales tout en renforçant l'engagement de vos
                      équipes.
                    </p>
                  </div>

                  {/* Service 3 */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                    <h4 className="text-base font-extrabold text-blue-950 flex items-center gap-2 mb-1">
                      <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                      Formations Professionnelles Sur-Mesure
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Programmes de montée en compétences en management,
                      sécurité au travail et qualité de service.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={getConsulting}
                  disabled={loading}
                  className="flex-1 bg-blue-950 hover:bg-blue-900 text-white font-bold py-3.5 px-6 rounded-xl shadow-md text-center transition-colors flex items-center justify-center gap-2"
                >
                  <span>Contacter le pôle Consulting</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION: HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest bg-amber-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
              Un accompagnement simple & structuré
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
              Comment ça marche chez Malaika ?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              De votre premier appel jusqu'au suivi régulier, nous garantissons
              un parcours sans stress.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md">
                  1
                </div>
                <h3 className="font-extrabold text-lg text-blue-950 mb-2">
                  Devis ou Évaluation rapide
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Vous remplissez une demande en ligne ou nous contactez par
                  téléphone en moins de 3 minutes.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-900 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md">
                  2
                </div>
                <h3 className="font-extrabold text-lg text-blue-950 mb-2">
                  Échanges & Évaluation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Nos responsables de secteur analysent vos besoins médicaux ou
                  vos enjeux d'entreprise.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md">
                  3
                </div>
                <h3 className="font-extrabold text-lg text-blue-950 mb-2">
                  Intervention Sur-Mesure
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Mise en place rapide d'un professionnel qualifié (infirmier,
                  auxiliaire, consultant).
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-900 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md">
                  4
                </div>
                <h3 className="font-extrabold text-lg text-blue-950 mb-2">
                  Suivi & Ajustements
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Bilan de satisfaction régulier pour adapter continuellement
                  les prestations.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-12 bg-gradient-to-r from-blue-950 via-blue-900 to-amber-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-2xl font-bold mb-1">
                Besoin d'un accompagnement en urgence ?
              </h3>
              <p className="text-sm text-slate-200">
                Nos équipes de garde Malaika Care réagissent sous 24h.
              </p>
            </div>
            <button
              onClick={() => router.push("/care/contact")}
              className="bg-amber-500 hover:bg-amber-400 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition-colors whitespace-nowrap"
            >
              Contactez-nous immédiatement
            </button>
          </div>
        </div>
      </section>
      {/* SECTION: VALEURS */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-blue-950 text-base mb-1">
                  Professionnels qualifiés
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Intervenants diplômés d'État, rigoureusement sélectionnés pour
                  leur savoir-faire et savoir-être.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-blue-950 text-base mb-1">
                  Démarche Qualité Garantie
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conformité aux normes sanitaires et méthodologies de conseil
                  certifiées.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-blue-950 text-base mb-1">
                  Zéro tracas administratif
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Malaika prend en charge l'ensemble de la gestion RH,
                  facturation et démarches d'aide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION: FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest bg-amber-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
              Des réponses claires
            </span>
            <h2 className="text-3xl font-black text-blue-950 tracking-tight">
              Foire aux questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Comment sont définies les prestations et les tarifs ?",
                a: "Chaque prestation est définie en fonction des besoins du bénéficiaire, de la nature des services demandés et de la fréquence des interventions. Après étude de votre demande, nous vous proposons une solution adaptée accompagnée d'une estimation personnalisée.",
              },
              {
                q: "Comment sont recrutés vos soignants et intervenants ?",
                a: "Tous nos intervenants Malaika Care font l'objet d'un processus strict de sélection : vérification des diplômes d'État, contrôles des références, casier judiciaire et entretiens de mise en situation.",
              },
              {
                q: "Comment se déroule une mission Malaika Consulting ?",
                a: "Nous débutons par une phase de cadrage et de diagnostic (audit) offerte ou intégrée, suivie d'une proposition d'intervention sur-mesure avec des jalons de performance précis.",
              },
              {
                q: "Puis-je modifier ou suspendre les prestations de soin ?",
                a: "Oui, nos contrats d'accompagnement sont souples et s'adaptent à l'évolution de la santé de vos proches ou à votre planning d'entreprise.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 font-bold text-blue-950 flex justify-between items-center bg-slate-50 hover:bg-amber-50/50 transition-colors"
                >
                  <span className="text-base sm:text-lg">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-600 transform transition-transform ${activeFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="p-5 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
