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
          <Box
            marginTop={-4}
            borderRadius="32px 32px 0 0"
            bgcolor={theme.palette.background.paper}
          >
            <Typography
              variant="h2"
              textAlign="center"
              marginTop={3}
              marginBottom={2}
            >
              {selectedCommunity?.name}
            </Typography>
            <Typography marginBottom={7}>
              {selectedCommunity?.description}
            </Typography>
            <Stack paddingX={1}>
              <Stack direction={"row"} marginBottom={3} alignItems="flex-end">
                <Typography variant="h2" display={"inline"} marginLeft="1rem">
                  הצעות:
                </Typography>

                <Typography
                  variant="h3"
                  color={"rgba(1, 23, 86, 0.66)"}
                  display={"inline"}
                >
                  {suggestionsData.length}
                </Typography>
              </Stack>

              {suggestionsData.map((v) => {
                return (
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
                );
              })}
              <NewSuggestionFloatingButton />
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
};
