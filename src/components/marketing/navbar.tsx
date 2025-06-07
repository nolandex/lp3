"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";
import { Button } from "../ui/button";
import { cn } from "@/functions";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-background/90 border-b border-border",
        isScrolled ? "py-2 shadow-sm" : "py-4"
      )}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Left - Brand & Menu */}
        <div className="flex items-center gap-6 flex-1">
          <Link
            href="/"
            className="text-lg font-semibold text-foreground tracking-tight"
          >
            Bisnovo
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            <Menu />
          </div>
        </div>

        {/* Right - Hamburger */}
        <div className="flex items-center justify-end lg:hidden flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="p-2 w-9 h-9"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XIcon className="w-5 h-5 transition-all duration-300" />
            ) : (
              <svg
                className="w-5 h-5 transition-all duration-300"
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

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Navbar;
