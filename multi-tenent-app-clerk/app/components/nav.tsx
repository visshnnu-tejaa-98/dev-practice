import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import * as React from "react";

const Nav: React.FC = () => {
  return (
    <nav>
      <div className="p-4 flex justify-between items-center bg-[#eeeeee]">
        <div>
          <h1 className="font-semibold text-xl">Blog Application</h1>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </div>
      <div></div>
    </nav>
  );
};

export default Nav;
