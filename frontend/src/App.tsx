import React from "react";
import "./App.css";
import { ThemeProvider as StyledThemeProvider } from "@emotion/react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { Button, Container, CssBaseline, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#8BD4DD",
      },
      secondary: {
        main: "#011756",
      },
      background: {
        default: "#FCFDFF",
        paper: "#FFF",
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
        },
      },
    },
    direction: "rtl",
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
          <Container maxWidth="xs">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </Container>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
