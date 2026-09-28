import Header from "@/components/navbar";
import React, { useState } from "react";
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

export default function Care({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Header />
      <div className="">{children}</div>
    </div>
  );
}
