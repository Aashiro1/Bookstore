import FetchBook from "@/components/FetchBook";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="bg-[#DCC7AA] py-8">
        <HeroSection />
      </div>
      <div className="bg-[#c7ac87] py-8 px-6">
        <h1 className="text-4xl font-bold text-[#edeae6] pb-2">Check our Books </h1>
        <FetchBook />
      </div>


    </div>
  );
}