"use client";

import {
  faLocationPin,
  faMailBulk,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { CiLinkedin } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "@/images/malaika_logo_transparent.png";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Clock,
  Heart,
  Building2,
  X,
  Menu,
  Mail,
  MapPin,
} from "lucide-react";

export function Footer({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      <footer className="bg-slate-800 text-white mt-auto border-t border-sky-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-24 h-24 rounded-xl flex items-center justify-center">
                  <Image
                    src={logo}
                    alt="Malaika Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                  MALAIKA
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Un accompagnement global pour votre santé et votre bien-être.
              </p>
            </div>

            <div>
              <h4 className="font-extrabold text-cyan-500 text-sm uppercase tracking-wider mb-4">
                NAVIGATION
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <a
                    href="#hero"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Accueil
                  </a>
                </li>
                <li>
                  <a
                    href="#carousel"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    À Propos
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Devis
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-cyan-500 text-sm uppercase tracking-wider mb-4">
                INFORMATIONS
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <a
                    href="#faq"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Interventions selon disponibilité
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Accompagnement non médical
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Mentions légales
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-cyan-500 text-sm uppercase tracking-wider mb-4">
                Contact & Agence
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>+221 78 256 70 70</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>contact@malaika-cs.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>Keur Massar, Sénégal</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 mt-12 border-t border-blue-900/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
            <p>© 2026 Malaika Care. Tous droits réservés.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                Votre bien être, notre priorité
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
