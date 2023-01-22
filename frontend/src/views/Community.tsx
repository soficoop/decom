import { useContext, useState } from "react";
import {
  ApiContext,
  CommunitiesContext,
  SuggestionsContext,
} from "../contexts";

import { TopHeaderTitleNav } from "../components/TopHeaderTitleNav";
import { SuggestionCard } from "../components/SuggestionCard";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { NewSuggestionFloatingButton } from "../components/NewSuggestionFloatingButton";
import { numberColor } from "../theme";
import { LoginDialog } from "../components/LoginDialog";
import { useNavigate } from "react-router-dom";
import { SuccessDialog } from "../components/SuccessDialog";

export const Community = () => {
  const theme = useTheme();
  const { selectedCommunity } = useContext(CommunitiesContext);
  const { suggestionsData } = useContext(SuggestionsContext);
  const { password, setPassword } = useContext(ApiContext);
  const [hadSentJoinRequest, setHadSentJoinRequest] = useState(false);
  const navigate = useNavigate();

  if (!selectedCommunity) {
    return null;
  }

  return (
    <Stack minHeight="100vh">
      <LoginDialog
        isOpen={!!selectedCommunity.requiresPassword && !password}
        selectedCommunity={selectedCommunity}
        onClose={() => navigate("/")}
        onJoin={() => setHadSentJoinRequest(true)}
        onLoginSuccess={setPassword}
      />
      <SuccessDialog
        isOpen={hadSentJoinRequest}
        onClose={() => navigate("/")}
      />
      <TopHeaderTitleNav bgImage={selectedCommunity?.image} backTo={"/"} />
      <Stack
        paddingX={3}
        marginTop={-4}
        borderRadius="32px 32px 0 0"
        bgcolor={theme.palette.background.paper}
        direction="column"
        flexGrow={1}
      >
        <Typography
          variant="h1"
          textAlign="center"
          marginTop={3}
          marginBottom={2}
        >
          {selectedCommunity?.name}
        </Typography>
        <Typography variant="body2" marginBottom={7} textAlign="center">
          {selectedCommunity?.description}
        </Typography>

        <Stack direction={"row"} marginBottom={3} alignItems="flex-end">
          <Typography variant="h3" display={"inline"} marginLeft={1.5}>
            הצעות:
          </Typography>
          <Typography variant="subtitle2" color={numberColor} display="inline">
            {selectedCommunity.suggestionCount}
          </Typography>
        </Stack>
        <Stack spacing={3}>
          {suggestionsData.map(
            (v) => v.id && <SuggestionCard key={v.id} suggestion={v} />
          )}
        </Stack>
        <Box flexGrow={1} />
        <NewSuggestionFloatingButton />
      </Stack>
    </Stack>
  );
};
