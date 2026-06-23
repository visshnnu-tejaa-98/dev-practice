import { UserButton } from "@clerk/nextjs";
import * as React from "react";

const Nav: React.FC = () => {
  return (
    <nav>
      <div className="p-4 flex justify-between items-center">
        <h1 className="font-semibold text-xl">Blog Application</h1>
        <UserButton />
      </div>
      <div></div>
    </nav>
  );
};

export default Nav;
