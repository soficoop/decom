import { useContext, useEffect, useState } from "react";
import { CommunitiesContext, SuggestionsContext } from "../contexts";

import { TopHeaderTitleNav } from "../components/TopHeaderTitleNav";
import { SuggestionCard } from "../components/SuggestionCard";
import { Stack, Typography, useTheme } from "@mui/material";
import { NewSuggestionFloatingButton } from "../components/NewSuggestionFloatingButton";
import { numberColor } from "../theme";

export const Community = () => {
  const theme = useTheme();
  const { selectedCommunity } = useContext(CommunitiesContext);
  const { suggestionsData } = useContext(SuggestionsContext);
  const [votes, setVotes] = useState<any>({});
  const selectedCommunityId = selectedCommunity?.id;

  useEffect(() => {
    let localVotes = localStorage.getItem("localVotes");
    if (localVotes) {
      let localVotesOBJ = JSON.parse(localVotes);
      if (selectedCommunityId && localVotesOBJ) {
        setVotes(localVotesOBJ[selectedCommunityId] || {});
      }
    }
  }, [selectedCommunityId]);

  const isPicked = (suggId: number) => {
    if (suggId && votes) return votes[suggId.toString()];
  };

  return (
    <Stack paddingX={0}>
      {selectedCommunity && (
        <>
          <TopHeaderTitleNav bgImage={selectedCommunity?.image} backTo={"/"} />
          <Stack
            paddingX={3}
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
              <Typography
                variant="subtitle2"
                color={numberColor}
                display="inline"
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
                  pick={v?.id && isPicked(v?.id)}
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
