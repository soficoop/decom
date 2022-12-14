import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import defaultcover from "../assets/defaultcardimage.svg";
import lightbulb from "../assets/lightbulb.svg";

import { secondaryColor } from "../theme";
import { Typography, Box, Stack } from "@mui/material";
export const CleanLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

interface CardImageProps {
  image?: string;
}
export const CardImage = styled.div`
  height: 160px;
  width: 100%;

  ${(props: CardImageProps) =>
    props.image
      ? "background-image:url(" + props.image + ");"
      : "background-image:url(" + defaultcover + ");"}
  background-color: ${secondaryColor};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SuggestionCounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 8px 6px 12px;
  gap: 6px;
  height: 36px;
  background: rgba(139, 212, 221, 0.25);
  border-radius: 8px;
  margin: 12px 0;
`;

interface SuggestionCounterProps {
  count?: number;
}
export const SuggestionCounter = ({ count }: SuggestionCounterProps) => {
  return (
    <Stack direction="row">
      <SuggestionCounterContainer>
        <img src={lightbulb} alt="lightbulb icon" />
        <Typography
          fontSize={14}
          color="#247079"
          fontWeight={400}
          lineHeight={2.75}
        >
          {count} הצעות
        </Typography>
      </SuggestionCounterContainer>
    </Stack>
  );
};

export const InputBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 100%;
`;
