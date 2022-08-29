import styled from "@emotion/styled";
import { Card, Typography } from "@mui/material";
import uparrow from "../assets/arrow-up.svg";
import downarrow from "../assets/arrow-down.svg";
import defaultcover from "../assets/defaultcardimage.svg";
import { useState, useContext } from "react";
import { SuggestionsContext } from "../contexts";
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

const SuggestionTextContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: right;
  height: 156px;
  width: 100%;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid #011756;
`;

const SuggestionTitle = styled.div`
  width: 100%;
`;

const SuggestionDescription = styled.div`
  width: 100%;
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
  title: string;
  content: string;
  score: number;
  upvotes: number;
  downvotes: number;
}
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
  const { setSelectedSuggestion } = useContext(SuggestionsContext);

  const handleUpVote = () => {
    setVotes({ up: !votes.up, down: false });
  };

  const handleDownVote = () => {
    setVotes({ down: !votes.down, up: false });
  };

  const handleClick = () => {
    setSelectedSuggestion({
      id,
      title,
      content,
      image,
      score,
      upvotes,
      downvotes,
    });
  };

  return (
    <Card key={"suggestion" + id}>
      <Link to={"/suggestion"} onClick={handleClick}>
        <SuggestioImage image={image} />
        <SuggestionTextContainer>
          <SuggestionTitle>
            <Typography variant="h1">{title}</Typography>
          </SuggestionTitle>
          <SuggestionDescription>
            <Typography variant="body1">{content}</Typography>
          </SuggestionDescription>
        </SuggestionTextContainer>
      </Link>
      <SuggestionVotingFooter>
        <SuggetsionVotingDownCell
          isPicked={votes.down}
          onClick={handleDownVote}
        >
          <>{downvotes}</>
          <>
            <img src={downarrow} alt="down arrow" />
          </>
        </SuggetsionVotingDownCell>
        <SuggetsionVotingUpCell isPicked={votes.up} onClick={handleUpVote}>
          <>{upvotes}</>
          <>
            <img src={uparrow} alt="up arrow" />
          </>
        </SuggetsionVotingUpCell>
      </SuggestionVotingFooter>
    </Card>
  );
};
