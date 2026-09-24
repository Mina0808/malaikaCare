"use client"
import NextTopLoader from "nextjs-toploader";
import React, { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import NavBar from "./care/navbarHorritzontal";
import { getToken, requireUser } from "@/lib/session";
import Loader from "./loading";


const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [url, setUrl] = useState("")
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])
  async function fetchData() {
    console.log("layout")
    const user = await requireUser(getToken());
    setUser(user)
    setLoading(false)
  }
  const isActive = true;

  if (loading)
    return (
      <Loader />)

  return (
    <div className="w-full flex h-screen">
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
      <main className="flex-1 flex-auto justify-center bg-emerald-100 rounded-lg h-screen w-screen overflow-y-auto">
        <NavBar
          user={user}
          isOpen={isOpen}
          url={url}
          setUrl={setUrl}
        />
        <div className="mt-32 mb-32">
          {children}
        </div>
        <Footer isOpen={isOpen} />
      </main>
    </div>
  );
};

export default Layout;
