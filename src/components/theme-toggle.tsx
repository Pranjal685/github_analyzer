"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check localStorage first, then system preference
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored) {
            setTheme(stored);
            applyTheme(stored);
        } else {
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const initial = systemDark ? "dark" : "dark"; // Default to dark
            setTheme(initial);
            applyTheme(initial);
        }
    }, []);

    function applyTheme(t: Theme) {
        const html = document.documentElement;
        if (t === "dark") {
            html.classList.add("dark");
            html.classList.remove("light");
        } else {
            html.classList.remove("dark");
            html.classList.add("light");
        }
    }

    function toggle() {
        const next: Theme = theme === "dark" ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
        localStorage.setItem("theme", next);
    }

    if (!mounted) return null;

    return (
        <button
            onClick={toggle}
            className="fixed top-4 right-4 z-50 p-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md hover:bg-white dark:hover:bg-white/10 transition-all duration-200 shadow-sm hover:shadow-md group"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-400 group-hover:rotate-45 transition-transform duration-300" />
            ) : (
                <Moon className="h-4 w-4 text-slate-700 group-hover:-rotate-12 transition-transform duration-300" />
            )}
        </button>
    );
}
