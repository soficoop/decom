import { Link } from "react-router-dom";
import penIcon from "../assets/penIcon.svg";
import { Fab } from "@mui/material";

export const NewSuggestionFloatingButton = () => {
  return (
    <Link to="/new-suggestion">
      <Fab>
        <img src={penIcon} alt={"pen icon"} width="30%" />
      </Fab>
    </Link>
  );
};
