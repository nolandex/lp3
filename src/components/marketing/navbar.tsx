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
        <nav className="flex items-center justify-between w-full h-12">
          {/* Left: Logo */}
          <div className="flex items-center flex-1">
            <Link href="/" className="text-lg font-bold text-foreground">
              Bisnovo
            </Link>
            <div className="items-center hidden ml-4 lg:flex">
              <Menu />
            </div>
          </div>

          {/* Right: Mobile Menu Toggle */}
          <div className="md:hidden flex items-center flex-1 justify-end">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-2 w-8 h-8 hover:bg-deep-purple-50 focus:bg-deep-purple-50 focus:outline-none"
            >
              {isOpen ? (
                <XIcon className="w-4 h-4 duration-300" />
              ) : (
                <Icons.menu className="w-3.5 h-3.5 duration-300" />
              )}
            </Button>
          </div>
        </nav>
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-b border-gray-200">
            <div className="flex items-center justify-between p-4">
              <Link href="/" className="text-lg font-bold text-foreground">
                Bisnovo
              </Link>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="p-2 w-8 h-8 hover:bg-deep-purple-50 focus:bg-deep-purple-50 focus:outline-none"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-4 pb-4">
              <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
        )}
      </Wrapper>
    </header>
  );
};

export default Navbar;
