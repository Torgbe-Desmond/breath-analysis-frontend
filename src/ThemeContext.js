// src/context/ThemeContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMediaQuery, createTheme } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppLightTheme, LightYellowTheme, MintGreenTheme, SoftDarkTheme } from "./Theme";

const ThemeMode = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

const ThemeContext = createContext();
export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
  const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const systemTheme = systemPrefersDark ? ThemeMode.DARK : ThemeMode.LIGHT;

  const [themeMode, setThemeMode] = useState(ThemeMode.SYSTEM);

  const theme = useMemo(() => {
    // For now, always light theme
    return AppLightTheme;
  }, [themeMode, systemPrefersDark]);

  useEffect(() => {
    const themeColorMeta = document.querySelector("meta[name='theme-color']");
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", "#ffff");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, ThemeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
