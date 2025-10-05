"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navlink from "@/components/navbar/navlink";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-20 transition-colors duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-black/5 backdrop-blur-sm shadow-md"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link href={"/"}>
          <Image src="/logo.png" width={200} height={100} alt="logo" priority />
        </Link>
        <Navlink scrolled={scrolled} />
      </div>
    </div>
  );
};

export default Navbar;
