"use client";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle-wrapper">
      <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
