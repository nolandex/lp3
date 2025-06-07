"use client";

import { cn } from "@/functions";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from 'react';
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Icons.icon className="w-6 h-6" />
            Bisnovo
          </Link>
          <div className="hidden lg:flex">
            <Menu />
          </div>
        </div>

        {/* Center */}
        <div className="hidden lg:flex items-center justify-center gap-6 flex-1">
          <Button size="sm" variant="default">Get Started</Button>
        </div>

        {/* Right - Mobile */}
        <div className="flex items-center justify-end gap-4 lg:hidden flex-1">
          <Button size="sm" variant="default">Start</Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-2 w-8 h-8"
          >
            {isOpen ? (
              <XIcon className="w-4 h-4 duration-300" />
            ) : (
              <Icons.menu className="w-3.5 h-3.5 duration-300" />
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
