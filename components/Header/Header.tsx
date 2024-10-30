import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MainMenu from "./MainMenu";

const Header = () => {
  return (
    <header className="header py-6 sticky top-0 z-50 bg-rose-600">
      <div className="container flex">
        <div className="logo">
          <Link href="/" aria-label="Go to the homepage">
            <Image src="/logo.svg" alt="Logo" width={200} height={24} />
          </Link>
        </div>
        <MainMenu />
      </div>
    </header>
  );
};

export default Header;
