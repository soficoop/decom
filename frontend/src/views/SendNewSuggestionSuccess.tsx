import { Stack, Typography, Button, Box } from "@mui/material";
import { NewSuggestionTopNav } from "../components/TopHeaderTitleNav";
import successV from "../assets/successV.svg";
import { useContext } from "react";
import { CommunitiesContext } from "../contexts";

export const SendNewSuggestionSucess = () => {
  const { selectedCommunity } = useContext(CommunitiesContext);
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
        <Box padding={1}>
          <Button fullWidth variant="primary" sx={{ marginY: 2 }}>
            לצפייה בהצעה
          </Button>
          <Button
            fullWidth
            variant="trans"
            href={`/community/${selectedCommunity?.id}`}
          >
            חזרה לעמוד הבית
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};
