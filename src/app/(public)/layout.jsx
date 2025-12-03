"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function PublicLayout({ children }) {
  const pathname = usePathname();
  
  const isHomePage = pathname === "/";

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 relative">
        {children}
      </main>
      
      {/* Footer - Only render for non-home pages */}
      {!isHomePage && <Footer />}
    </div>
  );
}