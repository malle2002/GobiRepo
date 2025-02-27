import React, { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react';

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'pink' | 'blue'>('blue');

  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'pink' | 'blue';
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme === 'pink' ? 'cupcake-pink' : 'cupcake-blue');
    }
  }, []);


  const toggleTheme = () => {
    const newTheme = theme === 'pink' ? 'blue' : 'pink';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme === 'pink' ? 'cupcake-pink' : 'cupcake-blue');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
