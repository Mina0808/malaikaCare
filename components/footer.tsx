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
                  MALAIKA CS
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Malaika Conseils & Services est votre réseau d'excellence pour
                les soins infirmiers, la garde à domicile et le conseil
                organisationnel.
              </p>
            </div>

            <div>
              <h4 className="font-extrabold text-cyan-500 text-sm uppercase tracking-wider mb-4">
                Malaika Care
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <a
                    href="#care-section"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Soins infirmiers à domicile
                  </a>
                </li>
                <li>
                  <a
                    href="#care-section"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Garde malade & Nursing 7j/7
                  </a>
                </li>
                <li>
                  <a
                    href="#care-section"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Accompagnement hospitalier
                  </a>
                </li>
                <li>
                  <a
                    href="#care-section"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Aide aux personnes âgées
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold text-cyan-500 text-sm uppercase tracking-wider mb-4">
                Malaika Consulting
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <a
                    href="#consulting-section"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Audits performance & qualité
                  </a>
                </li>
                <li>
                  <a
                    href="#consulting-section"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Accompagnement au changement
                  </a>
                </li>
                <li>
                  <a
                    href="#consulting-section"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Formations professionnelles
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
                  <span>Siège social : Keur Massar, Sénégal</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 mt-12 border-t border-blue-900/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
            <p>© 2026 Malaika Conseils & Services. Tous droits réservés.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Crédit d'impôt
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
