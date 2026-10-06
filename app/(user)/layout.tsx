"use client";
import { useState } from "react";
import Header from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getToken, getClientFromSession } from "@/lib/session";
import React from "react";

export default function Care({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [url, setUrl] = useState("");

  async function fetchData() {
    const user = await getClientFromSession(await getToken());
    setUser(user);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Header user={user} setUser={setUser} url={url} setUrl={setUrl} />
      <div className="">{children}</div>
      <Footer isOpen={isOpen} />
    </div>
  );
}
