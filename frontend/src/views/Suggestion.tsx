import { useContext, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { ViewWrapper } from "../components/ViewWrapper";
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
    <ViewWrapper>
      <TopHeaderTitleNav
        bg_image={selectedSuggestion?.image}
        backTo={selectedCommunity ? "/community/" + selectedCommunity.id : "/"}
      />
      <Stack paddingX={1}>
        <SuggestionVotingCenterContainer>
          <SuggetsionVotingDownCell
            isPicked={votes.down}
            onClick={handleDownVote}
          >
            <>{selectedSuggestion && selectedSuggestion.downvotes}</>
            <>
              <img src={downarrow} alt="down arrow" />
            </>
          </SuggetsionVotingDownCell>
          <SuggetsionVotingUpCell isPicked={votes.up} onClick={handleUpVote}>
            <>{selectedSuggestion && selectedSuggestion.upvotes}</>
            <>
              <img src={uparrow} alt="up arrow" />
            </>
          </SuggetsionVotingUpCell>
        </SuggestionVotingCenterContainer>
        <Typography align="center" variant="h2">
          {selectedSuggestion?.title}
        </Typography>
        <Typography align="right" variant="body1">
          {selectedSuggestion?.content}
        </Typography>
      </Stack>
    </ViewWrapper>
  );
};
