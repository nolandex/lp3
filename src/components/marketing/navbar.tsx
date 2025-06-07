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
      {/* Main Header */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "py-2 shadow-md bg-background/95 backdrop-blur-md"
            : "py-4 bg-background/95 backdrop-blur-md"
        )}
      >
        <Wrapper className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between w-full h-12">
            {/* Logo & Desktop Menu */}
            <div className="flex items-center flex-1">
              <Link 
                href="/" 
                className="text-lg font-bold text-foreground z-50 hover:opacity-80 transition-opacity"
              >
                Bisnovo
              </Link>
              <div className="items-center hidden ml-8 lg:flex">
                <Menu />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(true)}
                className="p-2 w-10 h-10 hover:bg-accent focus:bg-accent"
                aria-label="Open Menu"
              >
                <Icons.menu className="w-6 h-6 transition-all duration-300" />
              </Button>
            </div>
          </nav>
        </Wrapper>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 z-40 h-screen w-full lg:hidden",
            "bg-gradient-to-b from-slate-900 via-slate-800 to-black",
            "transition-all duration-300 ease-in-out",
            "flex flex-col items-center justify-center"
          )}
        >
          {/* Close Button */}
          <div className="absolute top-6 right-6">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="p-2 w-10 h-10 text-white hover:bg-white/20 focus:bg-white/20"
              aria-label="Close Menu"
            >
              <XIcon className="w-6 h-6" />
            </Button>
          </div>

          {/* Menu Content */}
          <div className="w-full h-full flex flex-col items-center justify-center px-4">
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
