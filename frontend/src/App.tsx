import React from "react";
import "./App.css";
import { ThemeProvider as StyledThemeProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Community, Suggestion, NewSuggestion } from "./views";
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
              <Container maxWidth="xs" disableGutters>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="community/:id" element={<Community />} />
                    <Route path="suggestion/" element={<Suggestion />} />
                    <Route path="new-suggestion/" element={<NewSuggestion />} />
                  </Routes>
                </BrowserRouter>
              </Container>
            </StyledThemeProvider>
          </MuiThemeProvider>
        </SuggestionsProvider>
      </CommunitiesProvider>
    </ApiProvider>
  );
}

export default App;
