"use client";

import { cn } from "@/functions";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from 'react';
import Menu from "./menu";
import MobileMenu from "./mobile-menu";
import { Button } from "../ui/button";

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
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-sm bg-background/90",
        isScrolled ? "py-2 shadow-md" : "py-4"
      )}
    >
      <nav className="w-full flex items-center justify-between mx-auto max-w-7xl px-4">
        {/* Left section */}
        <div className="flex items-center gap-4 flex-1">
          <Link href="/" className="text-lg font-semibold text-foreground">
            Bisnovo
          </Link>
          <div className="hidden lg:flex">
            <Menu />
          </div>
        </div>

        {/* Right - Mobile only */}
        <div className="flex items-center justify-end lg:hidden flex-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsOpen(prev => !prev)}
            className="p-2 w-8 h-8"
          >
            {isOpen ? (
              <XIcon className="w-4 h-4 duration-300" />
            ) : (
              <svg
                className="w-4 h-4 duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Navbar;
