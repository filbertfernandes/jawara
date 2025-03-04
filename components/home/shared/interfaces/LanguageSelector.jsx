"use client";

import { useState, useEffect } from "react";

import { IconButton } from "./FreePhaseInterface";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import setLanguageValue from "@/lib/actions/set-language-action";

const LanguageSelector = () => {
  const [language, setLanguage] = useState("en"); // Default to English

  // Load the language from cookies when the component mounts
  useEffect(() => {
    const storedLanguage = document.cookie
      .split("; ")
      .find((row) => row.startsWith("language="))
      ?.split("=")[1];

    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  // Handle language change
  const handleChange = async (newLanguage) => {
    setLanguage(newLanguage); // Update state immediately
    await setLanguageValue(newLanguage); // Update the cookie on the server
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onFocus={(e) => e.target.blur()}>
        <IconButton>{language.toUpperCase()}</IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleChange("en")}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleChange("id")}
        >
          Indonesian
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
