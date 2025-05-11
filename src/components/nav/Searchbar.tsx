import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
const Searchbar = () => {
  return (
    <div className="hidden md:flex items-center space-x-2 w-1/2">
      <input
        type="text"
        placeholder="Search..."
        className="w-1/2 px-4 py-2 border border-black rounded-full focus:outline-none "
      />
      <Button className="p-5 text-white rounded-full cursor-pointer">
        <SearchIcon size={24} />
      </Button>
    </div>
  );
};

export default Searchbar;
