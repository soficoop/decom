import { Stack, Typography, Button, Box } from "@mui/material";
import { NewSuggestionTopNav } from "../components/TopHeaderTitleNav";
import successV from "../assets/successV.svg";
import { useContext } from "react";
import { CommunitiesContext } from "../contexts";
import { useParams } from "react-router-dom";
export const SendNewSuggestionSucess = () => {
  const { selectedCommunity } = useContext(CommunitiesContext);
  const { successID } = useParams();
  return (
    <Stack>
      <NewSuggestionTopNav titleColor="dark" />
      <Stack
        paddingX={0}
        direction="column"
        justifyContent={"center"}
        alignItems="center"
        spacing={5}
      >
        <img src={successV} alt="sucess v icon" />
        <Typography align="center" variant="h2" marginBottom={5}>
          הצעתך פורסמה בהצלחה!
        </Typography>
        <Box paddingX={5} width="100%">
          <Button
            fullWidth
            size="large"
            sx={{ marginY: 2 }}
            href={`/community/${selectedCommunity?.id}/suggestion/${successID}`}
          >
            לצפייה בהצעה
          </Button>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="secondary"
            href={`/community/${selectedCommunity?.id}`}
          >
            חזרה לעמוד הבית
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};
