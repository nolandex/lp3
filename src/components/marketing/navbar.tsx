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

const links = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/second-page" },
];

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
              className="flex items-center gap-2 text-lg font-bold text-foreground"
            >
              <Icons.icon className="w-6 h-6" />
              Bisnifly
            </Link>
          </div>

          {/* Center: Desktop Menu */}
          <div className="hidden md:flex items-center justify-center gap-6 flex-1">
            <Menu /> {/* Assuming Menu renders links similarly to the ul below */}
            {/* Fallback if Menu component doesn't match desired links */}
            {/* <ul className="flex items-center gap-6">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="tracking-wide transition-colors duration-200 font-normal text-sm hover:text-deep-purple-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul> */}
            <Button variant="default" size="sm">
              Themed Button
            </Button>{" "}
            {/* Placeholder for ThemedButton */}
          </div>

          {/* Right: Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-x-4 flex-1 justify-end">
            <Button variant="default" size="sm">
              Themed Button
            </Button>{" "}
            {/* Placeholder for ThemedButton */}
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
          {isOpen && (
            <div className="absolute top-0 left-0 w-full z-50 md:hidden">
              <div className="p-5 bg-background border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-bold text-foreground"
                  >
                    <Icons.icon className="w-6 h-6" />
                    Bisnifly
                  </Link>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="p-2 w-10 h-10"
                  >
                    <XIcon className="w-6 h-6" />
                  </Button>
                </div>
                <nav>
                  <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
                  {/* Fallback if MobileMenu doesn't match desired links */}
                  {/* <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="font-medium tracking-wide transition-colors duration-200 text-sm hover:text-deep-purple-accent-400"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul> */}
                </nav>
              </div>
            </div>
          )}
        </nav>
      </Wrapper>
    </header>
  );
};

export default Navbar;
