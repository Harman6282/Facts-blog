'use client'

import Link from "next/link";
import Searchbar from "./Searchbar";
import RightSidebar from "./RightSidebar";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="w-full bg-white shadow px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-3xl font-bold cursor-pointer">
        Facts
      </Link>

      <Searchbar  />

      {user ? (
        <RightSidebar />
      ) : (
        <Link href="/signin">
          <Button className="cursor-pointer">Sign in</Button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
