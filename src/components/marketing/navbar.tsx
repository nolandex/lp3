"use client";

import { cn } from "@/functions";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";

// URL untuk gambar latar belakang. Anda bisa menggantinya dengan gambar lain.
const mobileMenuBackgroundUrl = "https://images.unsplash.com/photo-1538401633537-54832587047d?q=80&w=1920";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Efek untuk mendeteksi scroll dan mengubah tampilan navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- EFEK UNTUK MENGUNCI SCROLL TELAH DIHAPUS ---
  // Berdasarkan permintaan, useEffect yang mengatur `document.body.style.overflow`
  // telah dihapus agar halaman tetap bisa di-scroll saat menu terbuka.

  return (
    <>
      {/* Bagian Header Utama */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          // Background semi-transparan diterapkan sejak awal agar terlihat bagus
          // saat konten di belakangnya bisa di-scroll.
          isScrolled
            ? "py-2 shadow-md bg-background/80 backdrop-blur-sm"
            : "py-4 bg-background/80 backdrop-blur-sm"
        )}
      >
        <Wrapper className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between w-full h-12">
            {/* Kiri: Logo & Menu Desktop */}
            <div className="flex items-center flex-1">
              <Link href="/" className="text-lg font-bold text-foreground">
                Bisnovo
              </Link>
              <div className="items-center hidden ml-4 lg:flex">
                <Menu />
              </div>
            </div>

            {/* Kanan: Tombol Buka/Tutup Menu Mobile */}
            <div className="flex items-center lg:hidden">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2 w-8 h-8 hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <XIcon className="w-5 h-5 transition-all duration-300" />
                ) : (
                  <Icons.menu className="w-5 h-5 transition-all duration-300" />
                )}
              </Button>
            </div>
          </nav>
        </Wrapper>
      </header>

      {/* Overlay untuk Menu Mobile dengan Background */}
      <div
        className={cn(
          "fixed inset-0 z-40 h-screen w-full lg:hidden",
          // Kelas untuk mengatur gambar latar belakang
          "bg-cover bg-center",
          // Animasi transisi slide-in dari kanan
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ backgroundImage: `url(${mobileMenuBackgroundUrl})` }}
      >
        {/* Lapisan gelap transparan di atas background agar teks mudah dibaca */}
        <div className="absolute inset-0 w-full h-full bg-black/70 backdrop-blur-sm" />

        {/* Konten menu diletakkan di atas lapisan background */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-16">
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
