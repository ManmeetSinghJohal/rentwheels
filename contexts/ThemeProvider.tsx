"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  mode: string;

  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
  theme,
  children,
}: {
  children: React.ReactNode;
  theme: string;
}) => {
  const [mode, setMode] = useState(theme);

  const handleThemeChange = () => {
    if (
      localStorage.mode === "dark" ||
      (!("mode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
      document.cookie = "theme=dark";
      document.body.classList.add("dark");
    } else {
      setMode("light");
      document.cookie = "theme=light";
      document.body.classList.remove("dark");
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
