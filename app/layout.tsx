import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import "./translation-fix";
import "./globals.css";


export const metadata: Metadata = {
  title: "MALAIKA",
  description: "Plateforme d'envoi colis",
};

const stolzl = localFont({
  src: [

    {
      path: "./fonts/Stolzl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    
    {
      path: "./fonts/Stolzl-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,

}: {
  children: React.ReactNode;

}) {
  return (
    <html lang="en" className={stolzl.className}>
      <body>
        {children}
    
        <ToastContainer theme="colored" />
      </body>
    </html>
  );
}
