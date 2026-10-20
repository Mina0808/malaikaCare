"use client";
import NextTopLoader from "nextjs-toploader";
import React, { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { getToken, getClientFromSession } from "@/lib/session";
import Loader from "../loading";
import NavBar from "./navbarHorritzontal";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
  const isActive = true;
  if (loading) return <Loader />;
  return (
    <div>
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

      <main>
        {/* <NavBar user={user} setUser={setUser} setUrl={setUrl} url={url} /> */}

        <div>{children}</div>
        <Footer isOpen={isOpen} />
      </main>
    </div>
  );
};

export default Layout;
