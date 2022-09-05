import { useContext, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { TopHeaderTitleNav } from "../components/TopHeaderTitleNav";
import { SuggestionsContext, CommunitiesContext } from "../contexts";
import uparrow from "../assets/arrow-up.svg";
import downarrow from "../assets/arrow-down.svg";
import {
  SuggestionVotingCenterContainer,
  SuggetsionVotingDownCell,
  SuggetsionVotingUpCell,
} from "../components/SuggestionVotingCell";

export const Suggestion = () => {
  const { selectedSuggestion } = useContext(SuggestionsContext);
  const { selectedCommunity } = useContext(CommunitiesContext);
  const [votes, setVotes] = useState({ up: false, down: false });
  const handleUpVote = () => {
    setVotes({ up: !votes.up, down: false });
  };

  const handleDownVote = () => {
    setVotes({ down: !votes.down, up: false });
  };
  return (
    <Stack>
      <TopHeaderTitleNav
        bgImage={selectedSuggestion?.image}
        backTo={selectedCommunity ? "/community/" + selectedCommunity.id : "/"}
      />
      <Stack paddingX={1}>
        <Typography align="center" variant="h2" marginTop={2}>
          {selectedSuggestion?.title}
        </Typography>
        <SuggestionVotingCenterContainer>
          <SuggetsionVotingDownCell
            isPicked={votes.down}
            onClick={handleDownVote}
          >
            {selectedSuggestion && selectedSuggestion.downvotes}

            <img src={downarrow} alt="down arrow" />
          </SuggetsionVotingDownCell>
          <SuggetsionVotingUpCell isPicked={votes.up} onClick={handleUpVote}>
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
