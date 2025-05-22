"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="hidden md:flex items-center space-x-2 w-1/2">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-1/2 px-4 py-2 border border-black rounded-full focus:outline-none"
      />
      <Button
        className="p-5 text-white rounded-full cursor-pointer"
        onClick={handleSearch}
      >
        <SearchIcon size={24} />
      </Button>
    </div>
  );
};

export default Searchbar;
