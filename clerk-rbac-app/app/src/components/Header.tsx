"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Show,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Q&A platform
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/">
                  <Button variant="ghost">Home</Button>
                </Link>
              </li>
              <li>
                <Link href="/qa">
                  <Button variant="ghost">Q&A</Button>
                </Link>
              </li>

              <li>
                <Link href="/admin">
                  <Button variant="ghost">Admin</Button>
                </Link>
              </li>

              <Show when="signed-in">
                <li className="flex items-center">
                  <UserButton />
                </li>
              </Show>
              <Show when="signed-out">
                <li className="flex items-center rounded bg-black px-2 font-bold text-white">
                  <SignInButton mode="modal" />
                </li>
              </Show>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
