import React from "react";
import "./App.css";
import { ThemeProvider as StyledThemeProvider } from "@emotion/react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { Button, Container, CssBaseline, Typography } from "@mui/material";

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
            <Typography variant="h1">קהילה זו מוגנת בסיסמא</Typography>
            <Button variant="contained" color="primary">
              דוגמה
            </Button>
          </Container>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
