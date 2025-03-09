"use client";

import { useTranslations } from "next-intl";
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
  const t = useTranslations("Home");

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
        <DropdownMenuLabel>{t("select_language_title")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleChange("en")}
        >
          {t("select_language_english")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleChange("id")}
        >
          {t("select_language_indonesian")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
