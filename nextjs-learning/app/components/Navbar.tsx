import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-[#212121] p-4">
      <ul className="flex justify-around items-center">
        <li>
          <Link href={"/products"}>Products</Link>
        </li>
        <li>
          <Link href={"/docs"}>Docs</Link>
        </li>
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <Link href={"/contact"}>Contact</Link>
        </li>
        <li>
          <Link href={"/sign-up"}>Signup</Link>
        </li>
        <li>
          <Link href={"/login"}>login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
