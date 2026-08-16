'use client';

import { useEffect, useState } from 'react';

// Dark is the app default. The toggle adds/removes the `.light` class and
// remembers the choice. Starts in an indeterminate state until mounted to
// avoid a hydration mismatch.
export function ThemeToggle() {
  const [isLight, setIsLight] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light'));
  }, []);

  const toggle = () => {
    const nextLight = !document.documentElement.classList.contains('light');
    document.documentElement.classList.toggle('light', nextLight);
    try {
      localStorage.setItem('theme', nextLight ? 'light' : 'dark');
    } catch {}
    setIsLight(nextLight);
  };

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="ml-1 p-2 rounded-md hover:text-[rgb(var(--volt))] hover:bg-[rgb(var(--card-2))] text-lg leading-none"
    >
      {isLight === null ? '○' : isLight ? '☾' : '☀'}
    </button>
  );
}
