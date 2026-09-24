"use client"
import NextTopLoader from "nextjs-toploader";
import React, { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import NavBar from "./navbarHorritzontal";
import { getToken, getUserFromSession } from "@/lib/session";
import Loader from "../loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [url, setUrl] = useState("")
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])
  async function fetchData() {
    const user = await getUserFromSession(getToken());
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

      <main className="flex-1 flex-auto justify-center bg-emerald-100 h-screen w-screen overflow-y-auto">
        <NavBar
          user={user}
          setUser={setUser}
          setUrl={setUrl}
          url={url}
        />

        <div className=" mt-24 mb-10">
          {children}</div>
        <Footer isOpen={isOpen} />
      </main>
    </div>
  );
};

export default Layout;
