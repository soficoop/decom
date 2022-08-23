import React from "react";
import "./App.css";
import { ThemeProvider as StyledThemeProvider } from "@emotion/react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views";
import { ApiProvider, CommunitiesProvider } from "./contexts";

function App() {
  const secondaryColor = "#011756";
  let theme = createTheme({
    direction: "rtl",
    palette: {
      primary: {
        main: "#8BD4DD",
      },
      secondary: {
        main: secondaryColor,
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
      MuiCard: {
        variants: [
          {
            props: { variant: undefined },
            style: {
              boxShadow: "2px 2px 0px #000000",
              border: "2px solid #011756",
            },
          },
        ],
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
        },
      },
    },
    typography: {
      fontFamily: "'Noto Sans Hebrew', sans-serif",
      h1: {
        fontSize: "28px",
        fontWeight: "700",
        color: secondaryColor,
      },
      h2: {
        fontSize: "24px",
        fontWeight: "700",
        color: secondaryColor,
      },
    },
  });
  return (
    <div className="App">
      <ApiProvider>
        <CommunitiesProvider>
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
        </CommunitiesProvider>
      </ApiProvider>
    </div>
  );
}

export default App;
