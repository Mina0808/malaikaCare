"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import logoCare from "@/images/logo_malaika_care.png";
import MalaikaCare from "@/images/malaika_care_brochure.jpeg";
import PackSerenite from "@/images/pack_serenite.jpeg";
import HeroBack from "@/images/background.jpg";
import { useRouter } from "next/navigation";
import { useEffect, useState, SetStateAction } from "react";
import {
  getUserFromSession,
  getToken,
  getClientFromSession,
} from "@/lib/session";
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
  Car,
  ShoppingBag,
  Baby,
  BookOpen,
  ChevronLeft,
} from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "Soins infirmiers & Garde malade 24h/7j au Sénégal",
    subtitle:
      "Des infirmiers diplômés d'État à votre chevet à Dakar et régions pour un accompagnement bienveillant.",
    tag: "Pôle Soins Médicaux",
    bgColor: "from-teal-900 via-cyan-900 to-slate-900",
    accentColor: "cyan",
    icon: Stethoscope,
    badge: "Intervention Rapide à Dakar",
    image: MalaikaCare,
  },
  {
    id: 2,
    title: "Service à la personne & Chauffeur privé",
    subtitle:
      "Ménage, livraison de repas, chauffeur avec véhicule et accompagnement sur-mesure au quotidien.",
    tag: "Pôle Logistique & Confort",
    bgColor: "from-rose-950 via-slate-900 to-rose-900",
    accentColor: "rose",
    icon: HomeIcon,
    badge: "Véhicules Récents & Sécurisés",
    image: PackSerenite,
  },
];

const SERVICES_CATEGORIES = [
  {
    id: "medical",
    title: "Formule Malaika Care",
    subtitle:
      "Un accompagnement humain et adapté à vos besoins ou à ceux d'un proche, de la première demande jusqu'au suivi.",
    badge: "Soignants Qualifiés IDE",
    icon: Stethoscope,
    theme: {
      bg: "bg-cyan-50/80",
      border: "border-cyan-200",
      accent: "bg-cyan-600 hover:bg-cyan-700",
      textAccent: "text-cyan-700",
      cardBg: "bg-white",
      hoverBorder: "hover:border-cyan-400",
      pill: "bg-cyan-100 text-cyan-800 border-cyan-300",
    },
  },
  {
    id: "logistics",
    title: "Soins à domicile",
    subtitle:
      "Une orientation vers les solutions et professionnels adaptés à vos besoins de soins et d'accompagnement à domicile.",
    badge: "Personnel de Confiance",
    theme: {
      bg: "bg-rose-50/80",
      border: "border-rose-200",
      accent: "bg-rose-600 hover:bg-rose-700",
      textAccent: "text-rose-700",
      cardBg: "bg-white",
      hoverBorder: "hover:border-rose-400",
      pill: "bg-rose-100 text-rose-800 border-rose-300",
    },
  },
  {
    id: "family",
    title: "Orientation médicale",
    subtitle:
      "Nous vous aidons à identifier la solution adaptée et à organiser votre parcours avec plus de simplicité.",
    badge: "Malaika Conseils",
    theme: {
      bg: "bg-slate-50/80",
      border: "border-slate-200",
      accent: "bg-slate-600 hover:bg-slate-700",
      textAccent: "text-slate-700",
      cardBg: "bg-white",
      hoverBorder: "hover:border-slate-400",
      pill: "bg-slate-100 text-slate-800 border-slate-300",
    },
  },
  {
    id: "help",
    title: "Préconsultation",
    subtitle:
      "Une première étape pour recueillir votre besoin et faciliter la préparation de votre prise en charge.",
    badge: "Malaika Conseils",
    theme: {
      bg: "bg-slate-50/80",
      border: "border-slate-200",
      accent: "bg-slate-600 hover:bg-slate-700",
      textAccent: "text-slate-700",
      cardBg: "bg-white",
      hoverBorder: "hover:border-slate-400",
      pill: "bg-slate-100 text-slate-800 border-slate-300",
    },
  },
  {
    id: "choice",
    title: "Prise de rendez-vous",
    subtitle:
      "Nous vous accompagnons dans l'organisation de vos rendez-vous afin de vous faire gagner du temps",
    badge: "Malaika Conseils",
    theme: {
      bg: "bg-slate-50/80",
      border: "border-slate-200",
      accent: "bg-slate-600 hover:bg-slate-700",
      textAccent: "text-slate-700",
      cardBg: "bg-white",
      hoverBorder: "hover:border-slate-400",
      pill: "bg-slate-100 text-slate-800 border-slate-300",
    },
  },
];

export const dynamic = "force-dynamic";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [activeFaq, setActiveFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [slides, setSlides] = useState([] as any[]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Soins infirmiers");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetchData();
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenQuote = (serviceName: SetStateAction<string>) => {
    if (serviceName) setSelectedService(serviceName);
    setFormSubmitted(false);
    setQuoteModalOpen(true);
  };

  async function fetchData() {
    const user = await getClientFromSession(await getToken());
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
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const toggleFaq = (index: any) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
  return (
    <>
      <section
        id="hero"
        className="relative bg-sky-300 text-white pt-16 pb-24 overflow-hidden min-h-[90vh] flex flex-col justify-center items-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url(${HeroBack.src})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/50 to-slate-950/70" />

        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl text-slate-800 sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-6 drop-shadow-md">
              Un accompagnement global pour votre{" "}
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-500 via-cyan-700 to-cyan-800 bg-clip-text text-transparent">
                santé et votre bien-être
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed mb-8 drop-shadow">
              <strong className="text-white font-bold">Malaika Care </strong>
              vous accompagne avec une approche humaine et personnalisée :
              assistance, soins à domicile, orientation et organisation de vos
              rendez-vous.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-t border-slate-700/60 pt-6 text-slate-200">
              <div className="flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/50">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/40">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight">
                  Une équipe à l'écoute
                </span>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/50">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/40">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight">
                  Parcours simple et rapide
                </span>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/50">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/40">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight">
                  Des informations vérifiées
                </span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-3xl mx-auto">
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden ring-1 ring-white/15">
              <div className="flex items-center justify-between mb-5">
                <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-cyan-500/40 flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  MALAIKA CARE
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white text-center sm:text-left mb-5">
                Soins médicaux et aides à domicile pour toute la famille,
                partout au Sénégal
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-950/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-cyan-500 text-slate-950 rounded-xl font-bold shrink-0">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-white text-sm">
                      Suivi Médical
                    </span>
                  </div>
                  <span className="text-slate-300 text-xs">
                    Injections, garde malade, visites médicales
                  </span>
                </div>

                <div className="bg-slate-950/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-rose-500 text-slate-950 rounded-xl font-bold shrink-0">
                      <HomeIcon className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-white text-sm">
                      Logistique & Entretien
                    </span>
                  </div>
                  <span className="text-slate-300 text-xs">
                    Ménage, repas, chauffeur avec véhicule
                  </span>
                </div>

                <div className="bg-slate-950/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-slate-500 text-white rounded-xl font-bold shrink-0">
                      <Baby className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-white text-sm">
                      Famille & Événements
                    </span>
                  </div>
                  <span className="text-slate-300 text-xs">
                    Garde d'enfants (baptêmes), soutien scolaire
                  </span>
                </div>
              </div>

              <div className="bg-cyan-950/40 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-4 text-center">
                <p className="text-xs text-cyan-600 font-semibold mb-3">
                  📍 Interventions régulières sur{" "}
                  <strong className="text-white">
                    Dakar (Almadies, Plateau, Mermoz, Maristes...) & Petite Côte
                  </strong>
                  .
                </p>
                <button
                  onClick={() => router.push("/care/quote")}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Demander un devis rapide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CAROUSEL */}
      <section
        id="carousel"
        className="py-16 bg-sky-50 border-b border-sky-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-400/15 px-3 py-1 rounded-full inline-block mb-3 border border-cyan-400/30">
                Nos Domaines d'Intervention
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
                Malaïka Care en images
              </h2>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`text-xs font-bold px-3.5 py-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isAutoPlay
                    ? "bg-[#18A6B8]/20 text-[#18A6B8] border-[#18A6B8]/40"
                    : "bg-slate-900 text-slate-400 border-slate-700"
                }`}
              >
                {isAutoPlay ? "⏸ Pause Défilé" : "▶ Défilé Auto"}
              </button>
              <button
                onClick={() =>
                  setActiveSlide((prev) =>
                    prev === 0 ? SLIDES.length - 1 : prev - 1,
                  )
                }
                className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-700 text-white transition-colors cursor-pointer"
                aria-label="Slide précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setActiveSlide((prev) => (prev + 1) % SLIDES.length)
                }
                className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-700 text-white transition-colors cursor-pointer"
                aria-label="Slide suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 min-h-[420px] sm:min-h-[480px] flex items-center border border-white/10">
            {SLIDES.map((slide, index) => {
              const isActive = index === activeSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center ${
                    isActive
                      ? "opacity-100 z-10 pointer-events-auto"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-90 backdrop-blur-xs`}
                  ></div>

                  <div className="relative z-20 max-w-3xl px-8 sm:px-14 text-white">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 border border-white/20 mb-4">
                      <Sparkles className="w-4 h-4 text-[#18A6B8]" />
                      <span>{slide.tag}</span>
                      <span className="mx-1">•</span>
                      <span className="text-white">{slide.badge}</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-black mb-3 leading-tight text-white drop-shadow">
                      {slide.title}
                    </h3>

                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                      {slide.subtitle}
                    </p>

                    <button
                      onClick={() => handleOpenQuoteForService(slide.title)}
                      className="bg-[#18A6B8] hover:bg-[#1593A3] text-[#0F2D5B] font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                    >
                      <span>Solliciter ce service</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="absolute bottom-6 right-8 z-30 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === activeSlide
                      ? "w-8 bg-[#18A6B8]"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* SERVICES */}
      <section id="services" className="py-20 bg-white border-t border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-cyan-500/30">
              Nos Services
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-blue-950 tracking-tight">
              Ce que nous faisons pour vous
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-4">
              Des solutions pensées pour simplifier votre parcours et vous
              apporter un accompagnement adapté à chaque situation.
            </p>
          </div>

          {/* Categories Row (3 columns on lg screen) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-stretch">
            {SERVICES_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className={`${category.theme.bg} rounded-3xl p-6 border ${category.theme.border} shadow-lg backdrop-blur-md flex flex-col justify-between hover:border-slate-600 transition-all`}
              >
                <div>
                  {/* Category Header */}
                  <div className="mb-6 pb-5 border-b border-slate-700/60">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${category.theme.pill} inline-block mb-2`}
                    >
                      <Heart className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-blue-950">
                      {category.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1">
                      {category.subtitle}
                    </p>
                  </div>

                  {/* List of items */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handleOpenQuote(item.name)}
                      className={`px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all ${category.theme.btnHover}`}
                    >
                      <span>En savoir plus</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SECTION: HOW IT WORKS */}
      <section
        id="how-it-works"
        className="py-20 bg-red-50 border-t border-red-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-cyan-600 uppercase tracking-widest bg-cyan-50 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-cyan-200">
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
                <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md">
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
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md">
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
                <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md">
                  3
                </div>
                <h3 className="font-extrabold text-lg text-blue-950 mb-2">
                  Intervention Sur-Mesure
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Nous étudions votre situation et vous proposons une solution
                  adaptée.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md">
                  4
                </div>
                <h3 className="font-extrabold text-lg text-blue-950 mb-2">
                  Suivi & Ajustements
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Nous organisons la suite du parcours avec vous, en toute
                  simplicité.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-12 bg-gradient-to-r from-cyan-800 via-cyan-700 to-cyan-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
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
              className="bg-rose-500 hover:bg-rose-400 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition-colors whitespace-nowrap"
            >
              Contactez-nous immédiatement
            </button>
          </div>
        </div>
      </section>
      {/* SECTION: VALEURS */}
      <section className="py-16 bg-white border-y border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-950 text-cyan-500 rounded-2xl shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-blue-950 text-base mb-1">
                  Humaine
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Une relation de proximité, à l'écoute de vos besoins.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-950 text-cyan-500 rounded-2xl shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-blue-950 text-base mb-1">
                  Fiable
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Des informations claires et un accompagnement sérieux.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-950 text-cyan-500 rounded-2xl shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-blue-950 text-base mb-1">
                  Premium
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Une attention portée aux détails et à la qualité de service.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-950 text-cyan-500 rounded-2xl shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-blue-950 text-base mb-1">
                  Moderne
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Des outils simples pour rendre votre parcours plus fluide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section id="faq" className="py-20 bg-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-extrabold text-cyan-700 uppercase tracking-widest bg-cyan-100 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-cyan-200">
              Réponses à vos questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Foire Aux Questions (FAQ)
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Comment s'effectue la mise en place d'un infirmier ou garde malade à domicile ?",
                a: "Après un premier contact téléphonique ou physique, nous effectuons une évaluation rapide des besoins du patient. Un soignant qualifié est affecté sous 24h à 48h selon la formule retenue.",
              },
              {
                q: "Puis-je commander des services depuis l'étranger pour un parent au Sénégal ?",
                a: "Oui, tout à fait ! De nombreux clients de la diaspora font appel à Malaika Care pour assurer les soins ou le chauffeur de leurs parents restés au Sénégal. Les paiements peuvent s'effectuer à distance.",
              },
              {
                q: "Quels sont les moyens de paiement acceptés au Sénégal ?",
                a: "Nous acceptons les règlements par Wave, Orange Money, virement bancaire ou chèque bancaire local.",
              },
              {
                q: "Proposez-vous la garde d'enfants pour les événements (baptêmes, mariages) ?",
                a: "Oui, notre pôle familial propose un encadrement sécurisé des enfants lors de vos cérémonies familiales (baptêmes, mariages, réceptions) par des animatrices et gardiennes expérimentées.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-5 font-bold text-slate-900 flex justify-between items-center text-sm sm:text-base gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-600 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
                    {faq.a}
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
