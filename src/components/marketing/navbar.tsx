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
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm",
        isScrolled ? "py-2 shadow-md" : "py-4"
      )}
    >
      <Wrapper className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center flex-1">
            <Link
              href="/"
              className="text-lg font-bold text-foreground"
            >
              Bisnovo
            </Link>
          </div>

          {/* Center: Desktop Menu */}
          <div className="hidden md:flex items-center justify-center gap-6 flex-1">
            <Menu />
          </div>

          {/* Right: Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-x-4 flex-1 justify-end">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(true)}
              className="p-2 w-10 h-10 hover:bg-deep-purple-50 focus:bg-deep-purple-50 focus:outline-none"
            >
              <Icons.menu className="w-6 h-6" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </nav>
      </Wrapper>
    </header>
  );
};

export default Navbar;
