"use client";

import { useEffect, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if dark mode is preferred
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    // Function to handle theme changes
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
      updateTheme(e.matches);
    };

    // Function to update PrimeReact theme
    const updateTheme = (isDarkMode: boolean) => {
      // Remove existing theme links
      const existingThemeLinks = document.querySelectorAll('link[href*="lara-"]');
      existingThemeLinks.forEach(link => link.remove());

      // Create new theme link
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = isDarkMode
        ? "https://cdn.jsdelivr.net/npm/primereact@10.9.7/resources/themes/lara-dark-blue/theme.css"
        : "https://cdn.jsdelivr.net/npm/primereact@10.9.7/resources/themes/lara-light-blue/theme.css";

      // Add to head
      document.head.appendChild(link);

      // Update CSS custom properties and classes for better integration
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', isDarkMode);
    };

    // Load initial theme
    updateTheme(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener("change", handleThemeChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div 
      data-theme={isDark ? 'dark' : 'light'} 
      className={isDark ? 'dark' : 'light'}
    >
      {children}
    </div>
  );
}