import penIcon from "../assets/penIcon.svg";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NewSuggestionFloatingButton = () => {
  const navigate = useNavigate();

  return (
    <Fab
      color="primary"
      size="large"
      onClick={() => {
        navigate(`new-suggestion`);
      }}
      sx={{
        position: "fixed",
        bottom: 2,
        left: 2,
        width: "96px",
        height: "96px",
      }}
    >
      <img src={penIcon} alt="pen icon" />
    </Fab>
  );
};
