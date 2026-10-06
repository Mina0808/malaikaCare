"use client"
import Header from "@/components/navbar";
import { getClientFromSession, getToken } from "@/lib/session";
import React, { useState, useEffect } from "react";

export default function Care({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const user = await getClientFromSession(await getToken());
    setUser(user);
    setLoading(false);
  }
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Header user={user} setUser={setUser} url={url} setUrl={setUrl} />
      <div className="">{children}</div>
    </div>
  );
}
