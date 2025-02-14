"use client"; // This component must run on the client side

import { useState, useEffect } from "react";

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
  const handleChange = async (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage); // Update state immediately
    await setLanguageValue(newLanguage); // Update the cookie on the server
  };

  return (
    <div className="mt-1 flex items-start text-orange-500">
      <select
        className="cursor-pointer rounded border border-orange-500 bg-white text-base font-medium shadow-sm"
        value={language} // Set the current selected value
        onChange={handleChange}
      >
        <option value="en">English</option>
        <option value="id">Indonesian</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
