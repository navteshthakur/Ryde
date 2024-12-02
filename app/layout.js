'use client';

import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation"; // Import usePathname
import "./globals.css";
import HeaderHome from "@/components/HeaderHome";
import Header from "@/components/Header";
import Footer from "@/components/Footer"

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path

  // Render HeaderHome for the homepage and Header for other pages
  const HeaderComponent = pathname === "/" ? HeaderHome : Header;

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="font-Parkinsans">
          <HeaderComponent /> {/* Dynamically render the header */}
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
