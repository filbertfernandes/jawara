"use client";

import { FaSearch } from "react-icons/fa";

import { useLaptop } from "../stores/useLaptop";

import { Input } from "@/components/ui/input";

const SearchBar = ({ text }) => {
  const { search, setSearch } = useLaptop((state) => ({
    search: state.search,
    setSearch: state.setSearch,
  }));

  return (
    <div className="flex h-auto w-full flex-wrap items-start justify-center overflow-scroll">
      <div className="relative mt-1 flex w-4/5 items-center text-gray-400">
        <FaSearch className="pointer-events-none absolute ml-1 size-1" />
        <Input
          type="text"
          placeholder={`${text}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="laptop-search-input h-1 focus:border-gray-400 focus:ring-0"
        />
      </div>
    </div>
  );
};

export default SearchBar;
