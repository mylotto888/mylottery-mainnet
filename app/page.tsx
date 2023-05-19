'use client';

import Header from "@/components/layouts/Header";
import NavBar from "@/components/layouts/NavBar";
import Footer from "@/components/layouts/Footer";
import Mint from "@/components/layouts/Mint";

export default function Home() {
  return (
    <main className="bg-white">
      <NavBar
        rightButton={(<a href="/mint" className="btn text-white border-none bg-red-500 hover:bg-red-600">Mint Now</a>)}
      />
      <Header />
      <Mint />
      <Footer />
    </main>
  )
}
