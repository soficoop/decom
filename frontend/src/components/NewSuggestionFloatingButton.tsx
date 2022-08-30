import { Link } from "react-router-dom";
import penIcon from "../assets/penIcon.svg";
import { Stack, useTheme } from "@mui/material";
import styled from "@emotion/styled";

export const NewSuggestionFloatingButton = () => {
  const theme = useTheme();

  const FloatingButton = styled(Stack)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.palette.primary.main};
    border-radius: 28px;
    box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.3));
    position: fixed;
    bottom: 1%;
    left: 30%;
    width: 96px;
    height: 96px;
    z-index: 9;
  `;

  return (
    <Link to="/new-suggestion">
      <FloatingButton>
        <img src={penIcon} alt={"pen icon"} width="30%" />
      </FloatingButton>
    </Link>
  );
};
