"use client";
import NextTopLoader from "nextjs-toploader";
import React, { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import NavBar from "./care/navbarHorritzontal";
import { getToken, requireProfessional } from "@/lib/session";
import Loader from "./loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    console.log("layout");
    const user = await requireProfessional(await getToken());
    setUser(user);
    setLoading(false);
  }
  const isActive = true;

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col antialiased selection:bg-amber-100 selection:text-amber-900">
      <NextTopLoader
        color="#1190ba"
        showSpinner={true}
        zIndex={1600}
        height={10}
      />

      {/* <NavBar
        withLogo={!isActive}
        user={user}
        url={url}
        setUrl={setUrl}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      /> */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavBar user={user} isOpen={isOpen} url={url} setUrl={setUrl} />
        <div className="mt-32 mb-32">{children}</div>
      </main>
      <Footer isOpen={isOpen} />
    </div>
  );
};

export default Layout;
