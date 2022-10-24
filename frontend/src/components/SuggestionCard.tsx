import styled from "@emotion/styled";
import { Card, Typography, Stack, useTheme } from "@mui/material";
import uparrow from "../assets/arrow-up.svg";
import downarrow from "../assets/arrow-down.svg";
import defaultcover from "../assets/defaultcardimage.svg";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SuggetsionVotingUpCell,
  SuggetsionVotingDownCell,
} from "../components/SuggestionVotingCell";
import { truncateAfterWords } from "../utils/functions";
import { SuggestionsContext, CommunitiesContext } from "../contexts";

interface SuggestioImageProps {
  image?: string;
}
const SuggestioImage = styled.div`
  box-sizing: border-box;
  height: 160px;
  width: 100%;

  ${(props: SuggestioImageProps) =>
    props.image
      ? "background-image:url(" + props.image + ");"
      : "background-image:url(" + defaultcover + ");"}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

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
  id: number;
  image?: string;
  title?: string;
  content?: string;
  score?: number;
  upvotes?: number;
  downvotes?: number;
  pick: string;
}

const CleanLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const SuggestionCard = ({
  id,
  image,
  title,
  content,
  score,
  upvotes,
  downvotes,
  pick,
}: SuggestionCardProps) => {
  const { updateSuggestion } = useContext(SuggestionsContext);
  const { selectedCommunity } = useContext(CommunitiesContext);

  const [existingVote, setExistingVote] = useState<"up" | "down" | "">("");

  useEffect(() => {
    if (pick === "up") setExistingVote("up");
    if (pick === "") setExistingVote("");
    if (pick === "down") setExistingVote("down");
  }, [pick]);

  const theme = useTheme();
  const selectedCommunityId = selectedCommunity?.id;

  function setLocalVote(vt: string) {
    if (!selectedCommunityId) {
      return;
    }
    let localVotes = JSON.parse(
      window.localStorage.getItem("localVotes") || "{}"
    );
    localVotes[selectedCommunityId] = {
      ...localVotes[selectedCommunityId],
      [id]: vt,
    };
    window.localStorage.setItem("localVotes", JSON.stringify(localVotes));
  }

  async function handleVote(type: "up" | "down") {
    const existingVsNew = {
      "up.up": { up: -1, down: 0 },
      "up.down": { up: -1, down: 1 },
      "down.up": { up: 1, down: -1 },
      "down.down": { up: 0, down: -1 },
      ".up": { up: 1, down: 0 },
      ".down": { up: 0, down: 1 },
    };
    const existingUpvotes = upvotes || 0;
    const existingDownvotes = downvotes || 0;

    await updateSuggestion(
      Number(id),
      existingUpvotes + existingVsNew[`${existingVote}.${type}`].up,
      existingDownvotes + existingVsNew[`${existingVote}.${type}`].down
    );
    setExistingVote(type === existingVote ? "" : type);
    setLocalVote(type === existingVote ? "" : type);
  }

  return (
    <Card variant="outlined">
      <CleanLink to={`suggestion/${id}`}>
        <>
          <SuggestioImage image={image} />
          <Stack
            direction="column"
            textAlign="right"
            height="156px"
            padding="1rem 0.5rem"
            borderBottom={`1px solid ${theme.palette.secondary.main}`}
          >
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body1">
              {truncateAfterWords(content ?? "", 20)}
            </Typography>
          </Stack>
        </>
      </CleanLink>
      <SuggestionVotingFooter>
        <SuggetsionVotingDownCell
          isPicked={existingVote === "down"}
          onClick={() => handleVote(`down`)}
        >
          {downvotes}
          <img src={downarrow} alt="down arrow" />
        </SuggetsionVotingDownCell>
        <SuggetsionVotingUpCell
          isPicked={existingVote === "up"}
          onClick={() => handleVote(`up`)}
        >
          {upvotes}
          <img src={uparrow} alt="up arrow" />
        </SuggetsionVotingUpCell>
      </SuggestionVotingFooter>
    </Card>
  );
};
