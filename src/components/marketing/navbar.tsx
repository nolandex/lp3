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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Bagian Header Utama */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300", // Ubah z-index menjadi 50
          isScrolled
            ? "py-2 shadow-md bg-background/90 backdrop-blur-sm"
            : "py-4 bg-background/90 backdrop-blur-sm"
        )}
      >
        <Wrapper className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between w-full h-12">
            {/* Kiri: Logo & Menu Desktop */}
            <div className="flex items-center flex-1">
              <Link 
                href="/" 
                className="text-lg font-bold text-foreground z-50" // Tambahkan z-index
              >
                Bisnovo
              </Link>
              <div className="items-center hidden ml-4 lg:flex">
                <Menu />
              </div>
            </div>

            {/* Kanan: Tombol HANYA untuk MEMBUKA Menu Mobile */}
            <div className="flex items-center lg:hidden">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(true)}
                className="p-2 w-8 h-8 hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                aria-label="Buka Menu"
              >
                <Icons.menu className="w-5 h-5 transition-all duration-300" />
              </Button>
            </div>
          </nav>
        </Wrapper>
      </header>

      {/* Overlay Menu Mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 h-screen w-full lg:hidden", // Turunkan z-index sedikit di bawah navbar
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
          "bg-gradient-to-b from-slate-900 to-black" // Gunakan kelas Tailwind untuk gradient
        )}
      >
        {/* Tombol TUTUP (X) di dalam overlay */}
        <div className="absolute top-4 right-4 z-50"> {/* Tambahkan z-index */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="p-2 w-8 h-8 text-white hover:bg-white/10 focus:bg-white/10"
            aria-label="Tutup Menu"
          >
            <XIcon className="w-5 h-5" />
          </Button>
        </div>

        {/* Konten menu */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
