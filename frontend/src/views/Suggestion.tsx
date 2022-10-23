import { useContext, useState, useEffect } from "react";
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
  const { suggestionsData, updateSuggestion } = useContext(SuggestionsContext);
  const theme = useTheme();
  const { selectedCommunity } = useContext(CommunitiesContext);
  const [existingVote, setExistingVote] = useState<"up" | "down" | "">("");
  const { suggId } = useParams();

  const selectedCommunityId = selectedCommunity?.id;

  useEffect(() => {
    let localVotes = localStorage.getItem("localVotes");
    if (localVotes) {
      let localVotesOBJ = JSON.parse(localVotes);
      if (selectedCommunityId && localVotesOBJ && suggId) {
        setExistingVote(localVotesOBJ[selectedCommunityId][suggId] || "");
      }
    }
  }, [selectedCommunityId, suggId]);

  function setLocalVote(vt: string) {
    let localVotes = JSON.parse(
      window.localStorage.getItem("localVotes") || "{}"
    );

    if (localVotes) {
      if (selectedCommunityId && localVotes && suggId) {
        localVotes[selectedCommunityId][suggId] = vt;

        window.localStorage.setItem("localVotes", JSON.stringify(localVotes));
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
  }

  function handleVote(type: "up" | "down") {
    const voteMatrix = {
      "up.up": { up: -1, down: 0 },
      "up.down": { up: -1, down: 1 },
      "down.up": { up: 1, down: -1 },
      "down.down": { up: 0, down: -1 },
      ".up": { up: 1, down: 0 },
      ".down": { up: 0, down: 1 },
    };
    const existingUpvotes = selectedSuggestion?.upvotes || 0;
    const existingDownvotes = selectedSuggestion?.downvotes || 0;

    updateSuggestion(
      Number(selectedSuggestion?.id) || 0,
      existingUpvotes + voteMatrix[`${existingVote}.${type}`].up,
      existingDownvotes + voteMatrix[`${existingVote}.${type}`].down
    );
    setExistingVote(type === existingVote ? "" : type);
    setLocalVote(type === existingVote ? "" : type);
  }

  const selectedSuggestion = suggestionsData.find(
    (sugg: ISuggestion) => sugg.id === suggId
  );

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
            isPicked={existingVote === "down"}
            onClick={() => handleVote("down")}
          >
            {selectedSuggestion && selectedSuggestion.downvotes}

            <img src={downarrow} alt="down arrow" />
          </SuggetsionVotingDownCell>
          <SuggetsionVotingUpCell
            isPicked={existingVote === "up"}
            onClick={() => handleVote("up")}
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
