import Header from "@/components/navbar";
import React from "react";

export default function Care({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Header />
      <div className="">{children}</div>
    </div>
  );
}
