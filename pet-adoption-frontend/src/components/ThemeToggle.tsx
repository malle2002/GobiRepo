import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();
  
  return (
    <button className="block px-4 py-2 hover:bg-base-300 rounded" onClick={toggleTheme}>
      Change Theme
    </button>
  );
};

export default ThemeToggle;
