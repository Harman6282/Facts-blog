import Link from "next/link";
import Searchbar from "./Searchbar";
import RightSidebar from "./RightSidebar";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link href="/">
        <div className="text-2xl font-bold cursor-pointer md:text-3xl">
          Facts
        </div>
      </Link>


      {/* Search Bar */}
      <Searchbar />

      {/* nav profile */}
      <RightSidebar />
    </nav>
  );
};

export default Navbar;
