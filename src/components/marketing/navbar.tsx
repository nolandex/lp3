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

  // Efek untuk mendeteksi scroll dan mengubah tampilan navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efek untuk mencegah scroll pada body saat menu mobile terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Bagian Header Utama */}
      <header
        className={cn(
          // Z-index 50 agar selalu di atas, termasuk di atas overlay menu
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "py-2 shadow-md bg-background/80 backdrop-blur-sm"
            : "py-4 bg-transparent" // Dibuat transparan saat di atas
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

      {/* Overlay untuk Menu Mobile */}
      <div
        className={cn(
          // Posisi fixed untuk menutupi seluruh layar
          "fixed inset-0 z-40 h-screen w-full bg-background lg:hidden",
          // Animasi transisi slide-in dari kanan
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Kontainer untuk meletakkan menu di tengah */}
        <div className="flex flex-col items-center justify-center h-full pt-16">
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
