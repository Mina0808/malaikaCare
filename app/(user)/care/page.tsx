"use client";
import { useState, useEffect } from "react";
import Loader from "../loading";
import Image from "next/image";
import logo from "@/images/logo_malaika_care.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getDocumentsByPageFront } from "@/Services/ServicesFront/documents";
import { useRouter } from "next/navigation";
import {
  Heart,
  Stethoscope,
  Activity,
  UserCheck,
  Clock,
  ShieldCheck,
  Home as HomeIcon,
  Car,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
  Check,
  X,
  Calculator,
  Calendar,
  FileText,
  Users,
  Award,
  Baby,
  Menu,
  ArrowRight,
  Smile,
  Shield,
  CheckCircle2,
  PhoneCall,
  BookOpen,
  Send,
  Building,
  Dog,
  ShoppingBag,
  HelpCircle,
} from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "Soins infirmiers & Garde malade 24h/7j au Sénégal",
    subtitle:
      "Des infirmiers diplômés d'État à votre chevet à Dakar et régions pour un accompagnement bienveillant.",
    tag: "Pôle Soins Médicaux",
    bgColor: "from-teal-900 via-emerald-900 to-slate-900",
    accentColor: "emerald",
    icon: Stethoscope,
    badge: "Intervention Rapide à Dakar",
    image: "../../images/malaika_care_brochure.jpeg",
  },
  {
    id: 2,
    title: "Service à la personne & Chauffeur privé",
    subtitle:
      "Ménage, livraison de repas, chauffeur avec véhicule et accompagnement sur-mesure au quotidien.",
    tag: "Pôle Logistique & Confort",
    bgColor: "from-amber-950 via-slate-900 to-amber-900",
    accentColor: "amber",
    icon: HomeIcon,
    badge: "Véhicules Récents & Sécurisés",
    image: "../../images/pack_serenite.jpeg",
  },
];

const SERVICES_CATEGORIES = [
  {
    id: "medical",
    title: "1. Soins et Suivis Médicaux à Domicile",
    subtitle:
      "Prise en charge médicale et nursing professionnelle directement chez vous sans le stress du déplacement.",
    badge: "Soignants Qualifiés IDE",
    theme: {
      bg: "bg-emerald-50/80",
      border: "border-emerald-200",
      accent: "bg-emerald-600 hover:bg-emerald-700",
      textAccent: "text-emerald-700",
      cardBg: "bg-white",
      hoverBorder: "hover:border-emerald-400",
      pill: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    items: [
      {
        icon: Stethoscope,
        name: "Soins infirmiers",
        desc: "Injections, pansements complexes, soins de plaies et suivis post-opératoires réalisés à domicile par des infirmiers qualifiés.",
        highlight: "Sur prescription",
      },
      {
        icon: Activity,
        name: "Garde malade & nursing",
        desc: "Accompagnement continu pour les personnes dépendantes ou fragilisées, garantissant une présence attentive et rassurante.",
        highlight: "Présence 24h/24",
      },
      {
        icon: Heart,
        name: "Accompagnement hospitalier",
        desc: "Présence chaleureuse pendant l'hospitalisation et coordination rigoureuse du retour à domicile en toute sérénité.",
        highlight: "Suivi coordonné",
      },
      {
        icon: UserCheck,
        name: "Médecins à domicile",
        desc: "Consultations et visites médicales à votre domicile pour éviter les déplacements pénibles dans les centres de santé.",
        highlight: "Sur rendez-vous",
      },
    ],
  },
  {
    id: "logistics",
    title: "2. Service à la Personne - Entretien & Logistique",
    subtitle:
      "Une gestion simplifiée de votre intérieur et un quotidien facilité pour toute la famille.",
    badge: "Personnel de Confiance",
    theme: {
      bg: "bg-amber-50/80",
      border: "border-amber-200",
      accent: "bg-amber-600 hover:bg-amber-700",
      textAccent: "text-amber-700",
      cardBg: "bg-white",
      hoverBorder: "hover:border-amber-400",
      pill: "bg-amber-100 text-amber-800 border-amber-300",
    },
    items: [
      {
        icon: HomeIcon,
        name: "Entretien du logement & Jardinage",
        desc: "Ménage approfondi, repassage de qualité, entretien du linge et travaux de jardinage pour un cadre de vie impeccable.",
        highlight: "Régulier ou Ponctuel",
      },
      {
        icon: ShoppingBag,
        name: "Livraison de courses & Repas",
        desc: "Achat de vos fournitures, gestion du marché frais, préparation de repas équilibrés ou livraison à domicile.",
        highlight: "Gagnez du temps",
      },
      {
        icon: Car,
        name: "Chauffeur & Véhicule dédié",
        desc: "Mise à disposition de chauffeurs expérimentés avec location de véhicule inclus pour vos déplacements et rendez-vous.",
        highlight: "Voitures climatisées",
      },
      {
        icon: Sparkles,
        name: "Soins esthétiques & Massages",
        desc: "Prestations de bien-être, soins de beauté et massages relaxants dispensés chez vous par des praticiennes qualifiées.",
        highlight: "Détente garantie",
      },
    ],
  },
  {
    id: "family",
    title: "3. Bien-être, Services Familiaux & Administratifs",
    subtitle:
      "Accompagnement humain et assistance complète pour vos démarches et la vie de famille.",
    badge: "Malaika Conseils",
    theme: {
      bg: "bg-indigo-50/80",
      border: "border-indigo-200",
      accent: "bg-indigo-600 hover:bg-indigo-700",
      textAccent: "text-indigo-700",
      cardBg: "bg-white",
      hoverBorder: "hover:border-indigo-400",
      pill: "bg-indigo-100 text-indigo-800 border-indigo-300",
    },
    items: [
      {
        icon: Users,
        name: "Dame de compagnie & Garde d'animaux",
        desc: "Présence bienveillante pour personnes âgées, promenades, stimulation intellectuelle et prise en charge de vos animaux.",
        highlight: "Lien social",
      },
      {
        icon: Baby,
        name: "Garde d'enfants & Événements",
        desc: "Garde au quotidien à la maison ou encadrement des enfants lors de vos cérémonies (baptêmes, mariages, réceptions).",
        highlight: "Sécurité & Éveil",
      },
      {
        icon: BookOpen,
        name: "Cours & Soutien à domicile",
        desc: "Encadrement scolaire personnalisé et aide aux devoirs pour faire progresser vos enfants dans les meilleures conditions.",
        highlight: "Tous niveaux",
      },
      {
        icon: FileText,
        name: "Assistance administrative & Juridique",
        desc: "Aide dans la rédaction de documents, démarches administratives locales et conseils juridiques par nos spécialistes.",
        highlight: "Expertise Malaika",
      },
    ],
  },
];

export const dynamic = "force-dynamic";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState([] as any[]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Soins infirmiers");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const scrollToSection = (id) => {
    setMobileMenu(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenQuote = (serviceName) => {
    if (serviceName) setSelectedService(serviceName);
    setFormSubmitted(false);
    setQuoteModalOpen(true);
  };

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
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  if (loading) return <Loader />;
  return (
    <>
      <section
        id="hero"
        className="relative bg-slate-900 text-white pt-12 pb-20 overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-full text-xs font-extrabold mb-6">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Pôle Santé & Services</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] mb-6">
                Des soins & services à domicile{" "}
                <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                  en toute confiance au Sénégal.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                <strong>Malaika Care</strong> est le pôle spécialisé de Malaika
                Conseils & Services. Nous mettons à votre disposition des
                équipes qualifiées (infirmiers, gardes malades, chauffeurs et
                aides) disponibles 7j/7 pour prendre soin de vous et de vos
                proches.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <button
                  onClick={() => router.push("/care/contact")}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 group"
                >
                  <Heart className="w-5 h-5 fill-white/20" />
                  <span>Organiser une intervention</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-6 text-slate-300 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold leading-tight">
                    Soignants Diplômés d'État
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold leading-tight">
                    Disponibilité 7j/7 - 24h/24
                  </span>
                </div>

                <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold leading-tight">
                    Malaika Conseils & Services
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="bg-gradient-to-b from-slate-800 to-slate-850 rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/30">
                      Service Sur-Mesure
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-4">
                    Une offre globale pensée pour la famille sénégalaise
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/60 flex items-center gap-3">
                      <div className="p-2 bg-emerald-500 text-white rounded-xl">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-extrabold text-white block">
                          Suivi Médical & Nursing
                        </span>
                        <span className="text-slate-400">
                          Injections, garde malade, visites médicales
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/60 flex items-center gap-3">
                      <div className="p-2 bg-amber-500 text-white rounded-xl">
                        <HomeIcon className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-extrabold text-white block">
                          Logistique & Entretien
                        </span>
                        <span className="text-slate-400">
                          Ménage, repas, chauffeur avec véhicule
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/60 flex items-center gap-3">
                      <div className="p-2 bg-indigo-500 text-white rounded-xl">
                        <Baby className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-extrabold text-white block">
                          Famille & Événements
                        </span>
                        <span className="text-slate-400">
                          Garde d'enfants (baptêmes), soutien scolaire
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-950/60 border border-emerald-800/60 rounded-2xl p-4 text-center">
                    <p className="text-xs text-emerald-200 font-semibold mb-2">
                      📍 Interventions régulières sur{" "}
                      <strong>
                        Dakar (Almadies, Plateau, Mermoz, Maristes...) & Petite
                        Côte
                      </strong>
                      .
                    </p>
                    <button
                      onClick={() => router.push("/care/quote")}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
                    >
                      Demander un devis rapide
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CAROUSEL */}
      <section
        id="carousel"
        className="py-16 bg-slate-100 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-3 border border-emerald-200">
                Nos Domaines d'Intervention
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Malaika Care en images
              </h2>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`text-xs font-bold px-3 py-2 rounded-xl border transition-colors ${isAutoPlay ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-white text-slate-600 border-slate-300"}`}
              >
                {isAutoPlay ? "⏸ Pause Défilé" : "▶ Défilé Auto"}
              </button>
              <button
                onClick={() =>
                  setActiveSlide((prev) =>
                    prev === 0 ? SLIDES.length - 1 : prev - 1,
                  )
                }
                className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-300 shadow-sm text-slate-700 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setActiveSlide((prev) => (prev + 1) % SLIDES.length)
                }
                className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-300 shadow-sm text-slate-700 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-[16/10] sm:aspect-[21/9] max-h-[500px]">
            {SLIDES.map((slide, index) => {
              const IconComp = slide.icon;
              const isActive = index === activeSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center ${isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"}`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="absolute inset-0 w-full h-full object-cover"
                    unoptimized
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-85 backdrop-blur-xs`}
                  ></div>

                  <div className="relative z-20 max-w-3xl px-8 sm:px-14 text-white">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 border border-white/20 mb-4">
                      <IconComp className="w-4 h-4 text-emerald-400" />
                      <span>{slide.tag}</span>
                      <span className="mx-1">•</span>
                      <span className="text-white">{slide.badge}</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-black mb-3 leading-tight">
                      {slide.title}
                    </h3>

                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                      {slide.subtitle}
                    </p>

                    <button
                      onClick={() => handleOpenQuote(slide.title)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
                    >
                      <span>Solliciter ce service</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="absolute bottom-6 right-8 z-30 flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 rounded-full transition-all ${idx === activeSlide ? "w-8 bg-emerald-400" : "w-2.5 bg-white/40 hover:bg-white/70"}`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* SERVICES */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-emerald-200">
              Offre Complète & Intégrée
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Nos Pôles de Services au Sénégal
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-4">
              Malaika Care combine expertise médicale et accompagnement
              logistique quotidien pour garantir le bien-être de votre famille.
            </p>
          </div>

          <div className="space-y-12">
            {SERVICES_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className={`${category.theme.bg} rounded-3xl p-6 sm:p-10 border ${category.theme.border} shadow-sm transition-all`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
                  <div>
                    <span
                      className={`text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${category.theme.pill} inline-block mb-2`}
                    >
                      {category.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {category.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base mt-1">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.items.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={idx}
                        className={`${category.theme.cardBg} rounded-2xl p-6 border border-slate-200 ${category.theme.hoverBorder} shadow-xs hover:shadow-md transition-all flex flex-col justify-between group`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`p-3 rounded-xl text-white ${category.theme.accent} shadow-sm group-hover:scale-110 transition-transform`}
                            >
                              <ItemIcon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                              {item.highlight}
                            </span>
                          </div>

                          <h4 className="font-extrabold text-lg text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                            {item.name}
                          </h4>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ZONES */}
      <section
        id="zones"
        className="py-20 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block mb-4 border border-emerald-200">
                Proximité Sénégal
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-6">
                Zones d'intervention & Engagements
              </h2>

              <p className="text-slate-600 text-base leading-relaxed mb-6">
                <strong>Malaika Care</strong> déploie ses agents qualifiés dans
                l'ensemble de la région de Dakar ainsi que dans les grandes
                villes du Sénégal.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 mb-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Région de Dakar</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Almadies, Plateau, Mermoz, Fann, Point E, Ngor, Ouakam,
                    Yoff, Hann Maristes, Sicap, Parcelles Assainies, Keur
                    Massar, Rufisque, Diamniadio.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 mb-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Petite Côte & Régions</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Saly Portudal, Mbour, Somone, Ngaparou, Popenguine, Thiès et
                    interventions à la demande sur les autres régions.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Personnel sélectionné et contrôlé par Malaika Conseils
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                  <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Remplacement garanti en cas d'absence sous 24h</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-2xl">
                  MC
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900">
                    Malaika Conseils & Services
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Votre partenaire santé & logistique de confiance
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6 italic bg-slate-50 p-4 rounded-2xl border border-slate-100">
                « Notre mission est d’apporter aux familles vivant au Sénégal et
                à la diaspora un service fiable, professionnel et profondément
                humain pour prendre soin de leurs proches restés au pays. »
              </p>

              <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs text-slate-400 font-bold block">
                    CONTACT
                  </span>
                  <span className="text-sm font-extrabold text-slate-900">
                    +221 78 256 70 70
                  </span>
                </div>
                <button
                  onClick={() => router.push("/care/contact")}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors"
                >
                  Prendre rendez-vous
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-emerald-200">
              Réponses à vos questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
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
                    className={`w-5 h-5 text-emerald-600 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`}
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
