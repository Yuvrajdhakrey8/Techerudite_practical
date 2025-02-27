import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#10A08E",
      },
      secondary: {
        main: "#F2FFFD",
      },
      grey: {
        "400": "#D9D9D9",
      },
    },
  });
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
