import { THEMES } from "../constants/theme";

interface ThemeProps {
    theme: typeof THEMES;
}

export const setThemeCookie = (theme:ThemeProps) => {
    document.cookie = `theme=${theme}; path=/; SameSite=Lax;`;
};
  