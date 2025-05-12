import Link from "next/link";
import Searchbar from "./Searchbar";
import RightSidebar from "./RightSidebar";
import { getServerSession } from "next-auth";
import { Button } from "../ui/button";

const Navbar = async () => {
  const session = await getServerSession();
  const user = session?.user;
  return (
    <nav className="w-full bg-white shadow px-4 py-3 flex items-center justify-between ">
      {/* Logo */}
      <Link href="/">
        <div className="text-2xl font-bold cursor-pointer md:text-3xl">
          Facts
        </div>
      </Link>

      {/* Search Bar */}
      <Searchbar />

      {/* nav profile */}

      {user ? (
        <RightSidebar />
      ) : (
        <Link
          href={"/signin"}
          className="text-2xl font-bold cursor-pointer md:text-3xl"
        >
          <Button className="cursor-pointer">Sign in</Button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
