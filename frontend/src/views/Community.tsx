import { useContext } from "react";
import { CommunitiesContext, SuggestionsContext } from "../contexts";

import { TopHeaderTitleNav } from "../components/TopHeaderTitleNav";
import { SuggestionCard } from "../components/SuggestionCard";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { NewSuggestionFloatingButton } from "../components/NewSuggestionFloatingButton";

export const Community = () => {
  const theme = useTheme();
  const { loading, data, selectedCommunity } = useContext(CommunitiesContext);
  const { suggestionsLoading, suggestionsData } =
    useContext(SuggestionsContext);

  return (
    <Stack paddingX={0}>
      {selectedCommunity && (
        <>
          <TopHeaderTitleNav bgImage={selectedCommunity?.image} backTo={"/"} />
          <Stack
            paddingX={4}
            marginTop={-4}
            borderRadius="32px 32px 0 0"
            bgcolor={theme.palette.background.paper}
            direction="column"
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
              <Typography variant="subtitle2" color="info" display="inline">
                {suggestionsData.length}
              </Typography>
              <Typography
                variant="h3"
                color={"rgba(1, 23, 86, 0.66)"}
                display={"inline"}
              >
                {suggestionsData.length}
              </Typography>
            </Stack>
            <Stack spacing={3}>
              {suggestionsData.map((v) => (
                <SuggestionCard
                  key={v.id}
                  id={v.id}
                  title={v.title}
                  content={v.content}
                  image={v?.image}
                  score={v.score}
                  upvotes={v.upvotes}
                  downvotes={v.downvotes}
                />
              ))}
            </Stack>
            <NewSuggestionFloatingButton />
          </Stack>
        </>
      )}
    </Stack>
  );
};
