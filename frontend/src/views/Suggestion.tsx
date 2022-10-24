import { useContext } from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { TopHeaderTitleNav } from "../components/TopHeaderTitleNav";
import { SuggestionsContext, CommunitiesContext } from "../contexts";
import uparrow from "../assets/arrow-up.svg";
import downarrow from "../assets/arrow-down.svg";
import {
  SuggestionVotingCenterContainer,
  SuggetsionVotingDownCell,
  SuggetsionVotingUpCell,
} from "../components/SuggestionVotingCell";
import { useParams } from "react-router-dom";
import { Suggestion as ISuggestion } from "../types/entities";

export const Suggestion = () => {
  const { suggestionsData, vote } = useContext(SuggestionsContext);
  const theme = useTheme();
  const { selectedCommunity } = useContext(CommunitiesContext);
  const { suggId } = useParams();

  const selectedSuggestion = suggestionsData.find(
    (sugg: ISuggestion) => sugg.id === suggId
  );

  if (!selectedSuggestion) {
    return <div>Not found</div>;
  }

  return (
    <Stack>
      <TopHeaderTitleNav
        bgImage={selectedSuggestion?.image}
        backTo={selectedCommunity ? "/community/" + selectedCommunity.id : "/"}
      />
      <Stack
        paddingX={3}
        marginTop={-4}
        borderRadius="32px 32px 0 0"
        bgcolor={theme.palette.background.paper}
      >
        <Typography align="center" variant="h2" marginTop={4} marginBottom={5}>
          {selectedSuggestion?.title}
        </Typography>
        <SuggestionVotingCenterContainer>
          <SuggetsionVotingDownCell
            isPicked={selectedSuggestion.existingVote === "down"}
            onClick={() => vote(selectedSuggestion, "down")}
          >
            {selectedSuggestion && selectedSuggestion.downvotes}

            <img src={downarrow} alt="down arrow" />
          </SuggetsionVotingDownCell>
          <SuggetsionVotingUpCell
            isPicked={selectedSuggestion.existingVote === "up"}
            onClick={() => vote(selectedSuggestion, "up")}
          >
            {selectedSuggestion && selectedSuggestion.upvotes}

            <img src={uparrow} alt="up arrow" />
          </SuggetsionVotingUpCell>
        </SuggestionVotingCenterContainer>

        <Typography align="right" variant="body1">
          {selectedSuggestion?.content}
        </Typography>
      </Stack>
    </Stack>
  );
};
