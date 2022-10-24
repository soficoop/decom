import { useContext } from "react";
import { CommunitiesContext, SuggestionsContext } from "../contexts";

import { TopHeaderTitleNav } from "../components/TopHeaderTitleNav";
import { SuggestionCard } from "../components/SuggestionCard";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { NewSuggestionFloatingButton } from "../components/NewSuggestionFloatingButton";
import { numberColor } from "../theme";

export const Community = () => {
  const theme = useTheme();
  const { selectedCommunity } = useContext(CommunitiesContext);
  const { suggestionsData } = useContext(SuggestionsContext);

  if (!selectedCommunity) {
    return null;
  }

  return (
    <Stack minHeight="100vh">
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
            {suggestionsData.length}
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
