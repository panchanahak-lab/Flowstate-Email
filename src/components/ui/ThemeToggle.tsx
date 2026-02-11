import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    // Initialize theme from local storage or default to dark
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');


        if (savedTheme === 'day') {
            setIsDark(false);
            document.documentElement.classList.add('day');
        } else {
            setIsDark(true);
            document.documentElement.classList.remove('day');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (newIsDark) {
            document.documentElement.classList.remove('day');
            localStorage.setItem('theme', 'night');
        } else {
            document.documentElement.classList.add('day');
            localStorage.setItem('theme', 'day');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className={`
        fixed top-6 right-6 z-50 p-2 rounded-full transition-all duration-300
        ${isDark
                    ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    : 'bg-black/5 text-gray-500 hover:text-black hover:bg-black/10'
                }
      `}
            aria-label="Toggle Theme"
        >
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}
