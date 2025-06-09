"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import emotionCache from "./emotionCache";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a0a0a",
      paper: "#171717",
    },
    text: {
      primary: "#ededed",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

export default function ThemeRegistry({ children }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
} 