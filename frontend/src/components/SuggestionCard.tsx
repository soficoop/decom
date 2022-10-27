import styled from "@emotion/styled";
import { Card, Typography, Stack, useTheme } from "@mui/material";
import uparrow from "../assets/arrow-up.svg";
import downarrow from "../assets/arrow-down.svg";

import { useContext } from "react";
import { CleanLink, CardImage } from "./SmallComponents";
import {
  SuggetsionVotingUpCell,
  SuggetsionVotingDownCell,
} from "../components/SuggestionVotingCell";
import { truncateAfterWords } from "../utils/functions";
import { SuggestionsContext } from "../contexts";
import { Suggestion } from "../types/entities";

const SuggestionVotingFooter = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 42px;
  border-top: 1px solid #011756;
`;

interface SuggestionCardProps {
  suggestion: Suggestion;
}

export const SuggestionCard = ({ suggestion }: SuggestionCardProps) => {
  const { vote } = useContext(SuggestionsContext);

  const theme = useTheme();

  return (
    <Card variant="outlined">
      <CleanLink to={`suggestion/${suggestion.id}`}>
        <>
          <CardImage image={suggestion.image} />
          <Stack
            direction="column"
            textAlign="right"
            minHeight={156}
            padding="1rem 0.5rem"
            borderBottom={`1px solid ${theme.palette.secondary.main}`}
          >
            <Typography variant="h1">{suggestion.title}</Typography>
            <Typography variant="body1">
              {truncateAfterWords(suggestion.content ?? "", 20)}
            </Typography>
          </Stack>
        </>
      </CleanLink>
      <SuggestionVotingFooter>
        <SuggetsionVotingDownCell
          isPicked={suggestion.existingVote === "down"}
          onClick={() => vote(suggestion, "down")}
        >
          {suggestion.downvotes}
          <img src={downarrow} alt="down arrow" />
        </SuggetsionVotingDownCell>
        <SuggetsionVotingUpCell
          isPicked={suggestion.existingVote === "up"}
          onClick={() => vote(suggestion, "up")}
        >
          {suggestion.upvotes}
          <img src={uparrow} alt="up arrow" />
        </SuggetsionVotingUpCell>
      </SuggestionVotingFooter>
    </Card>
  );
};
