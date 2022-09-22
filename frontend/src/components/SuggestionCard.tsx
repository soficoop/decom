import styled from "@emotion/styled";
import { Card, Typography, Stack, useTheme } from "@mui/material";
import uparrow from "../assets/arrow-up.svg";
import downarrow from "../assets/arrow-down.svg";
import defaultcover from "../assets/defaultcardimage.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  SuggetsionVotingUpCell,
  SuggetsionVotingDownCell,
} from "../components/SuggestionVotingCell";

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
  id?: number;
  image?: string;
  title?: string;
  content?: string;
  score?: number;
  upvotes?: number;
  downvotes?: number;
}

const truncateAfterWords = (text: string, maxNumOfWords: number): string => {
  const words = text.split(" ");
  if (words.length <= maxNumOfWords) return text;
  return `${words.slice(0, maxNumOfWords).join(" ")}...`;
};

const CleanLink = styled(Link)`
  text-decoration: none;
`;

export const SuggestionCard = ({
  id,
  image,
  title,
  content,
  score,
  upvotes,
  downvotes,
}: SuggestionCardProps) => {
  const [votes, setVotes] = useState({ up: false, down: false });

  const theme = useTheme();
  const handleUpVote = () => {
    setVotes({ up: !votes.up, down: false });
  };

  const handleDownVote = () => {
    setVotes({ down: !votes.down, up: false });
  };

  return (
    <Card variant="outlined">
      <CleanLink to={`suggestion/${id}`}>
        <SuggestioImage image={image} />
        <Stack
          direction={"column"}
          textAlign={"right"}
          height={"156px"}
          padding={"1rem 0.5rem"}
          borderBottom={`1px solid ${theme.palette.secondary.main}`}
        >
          <Typography variant="h1">{title}</Typography>
          <Typography variant="body1">
            {content && truncateAfterWords(content, 20)}
          </Typography>
        </Stack>
      </CleanLink>
      <SuggestionVotingFooter>
        <SuggetsionVotingDownCell
          isPicked={votes.down}
          onClick={handleDownVote}
        >
          {downvotes}
          <img src={downarrow} alt="down arrow" />
        </SuggetsionVotingDownCell>
        <SuggetsionVotingUpCell isPicked={votes.up} onClick={handleUpVote}>
          {upvotes}
          <img src={uparrow} alt="up arrow" />
        </SuggetsionVotingUpCell>
      </SuggestionVotingFooter>
    </Card>
  );
};
