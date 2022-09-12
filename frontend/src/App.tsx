import "./App.css";
import { ThemeProvider as StyledThemeProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Community,
  Suggestion,
  NewSuggestion,
  SendNewSuggestionSucess,
} from "./views";
import {
  ApiProvider,
  CommunitiesProvider,
  SuggestionsProvider,
} from "./contexts";
import { theme } from "./theme";
function App() {
  return (
    <ApiProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <StyledThemeProvider theme={theme}>
          <Container maxWidth="xs" disableGutters>
            <BrowserRouter>
              <Routes>
                <Route element={<CommunitiesProvider />}>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="community/:communityId"
                    element={<SuggestionsProvider />}
                  >
                    <Route path="" element={<Community />} />
                    <Route path="suggestion/:suggId" element={<Suggestion />} />
                  </Route>
                  <Route path="new-suggestion/" element={<NewSuggestion />} />
                  <Route
                    path="new-suggestion/success"
                    element={<SendNewSuggestionSucess />}
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </Container>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </ApiProvider>
  );
}

export default App;
