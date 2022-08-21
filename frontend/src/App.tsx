import React from "react";
import "./App.css";
import { ThemeProvider as StyledThemeProvider } from "@emotion/react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { CssBaseline, Typography } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#8BD4DD",
      },
      secondary: {
        main: "#011756",
      },
    },
    typography: {
      fontFamily: "'Noto Sans Hebrew', sans-serif",
      h1: {
        fontSize: "26px",
        fontWeight: "700",
      },
    },
  });
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <StyledThemeProvider theme={theme}>
          <Typography variant="h1">קהילה זו מוגנת בסיסמא</Typography>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
