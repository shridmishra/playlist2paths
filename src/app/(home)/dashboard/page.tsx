import React from "react";
import HeroSection from "@/components/HeroSection";
import LinkToEachLink from "@/components/VideoLinkExtractor";
import SideBar from "@/components/SideBar";
import Navbar from "@/components/NavBar";

export default function Page() {
  return (
    <div className="bg-zinc-900 h-screen">
    

   
        <Navbar />
        <HeroSection />
        <LinkToEachLink />
     
    </div>
  );
}
