import React from "react";
import "./App.css";
import { ThemeProvider as StyledThemeProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Suggestion } from "./views";
import { Community } from "./views";
import {
  ApiProvider,
  CommunitiesProvider,
  SuggestionsProvider,
} from "./contexts";
import { theme } from "./theme";
function App() {
  return (
    <ApiProvider>
      <CommunitiesProvider>
        <SuggestionsProvider>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <StyledThemeProvider theme={theme}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="community/:id"
                    element={
                      // <RequireAuth>
                      <Community />
                      // </RequireAuth>
                    }
                  />
                  <Route
                    path="suggestion/"
                    element={
                      // <RequireAuth>
                      <Suggestion />
                      // </RequireAuth>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </StyledThemeProvider>
          </MuiThemeProvider>
        </SuggestionsProvider>
      </CommunitiesProvider>
    </ApiProvider>
  );
}

export default App;
