import { ReactComponent as PenIcon } from "../assets/penIcon.svg";
import { Fab, SvgIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";

export const NewSuggestionFloatingButton = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="xs"
      disableGutters
      sx={{
        contain: "content",
        position: "fixed",
        bottom: 0,
        padding: 2,
        textAlign: "left",
      }}
    >
      <Fab
        color="primary"
        size="large"
        onClick={() => {
          navigate(`new-suggestion`);
        }}
      >
        <SvgIcon>
          <PenIcon />
        </SvgIcon>
      </Fab>
    </Container>
  );
};
