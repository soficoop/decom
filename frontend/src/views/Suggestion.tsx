import { useContext, useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { Suggestion as ISuggestion } from "../types/entities";

export const Suggestion = () => {
  const { suggestionsData } = useContext(SuggestionsContext);
  const { selectedCommunity } = useContext(CommunitiesContext);
  const [vote, setVote] = useState<string | undefined>();
  const { suggId } = useParams();

  const selectedCommunityId = selectedCommunity?.id;

  useEffect(() => {
    let localVotes = localStorage.getItem("localVotes");
    if (localVotes) {
      let localVotesOBJ = JSON.parse(localVotes);
      if (selectedCommunityId && localVotesOBJ && suggId) {
        setVote(localVotesOBJ[selectedCommunityId][suggId] || "");
      }
    }
  });

  const updateLocalVote = (vt: string) => {
    let localVotes = window.localStorage.getItem("localVotes");

    if (localVotes) {
      let localVotesOBJ = JSON.parse(localVotes);

      if (selectedCommunityId && localVotesOBJ && suggId) {
        localVotesOBJ[selectedCommunityId][suggId] = vt;

        window.localStorage.setItem(
          "localVotes",
          JSON.stringify(localVotesOBJ)
        );
      }
    } else {
      if (selectedCommunityId && suggId) {
        const newObj = {
          [selectedCommunityId]: { [suggId]: vt },
        };
        const stringifiedOBJ = JSON.stringify(newObj);
        window.localStorage.setItem("localVotes", stringifiedOBJ);
      }
    }
  };

  const handleUpVote = () => {
    setVote("up");
    updateLocalVote("up");
  };

  const selectedSuggestion = suggestionsData.find(
    (sugg: ISuggestion) => sugg.id === suggId
  );

  const handleDownVote = () => {
    setVote("down");
    updateLocalVote("down");
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
            isPicked={vote === "down"}
            onClick={handleDownVote}
          >
            {selectedSuggestion && selectedSuggestion.downvotes}

            <img src={downarrow} alt="down arrow" />
          </SuggetsionVotingDownCell>
          <SuggetsionVotingUpCell
            isPicked={vote === "up"}
            onClick={handleUpVote}
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
