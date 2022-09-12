import { Stack, Typography, Button } from "@mui/material";
import { NewSuggestionTopNav } from "../components/TopHeaderTitleNav";
import successV from "../assets/successV.svg";
export const SendNewSuggestionSucess = () => {
  return (
    <Stack>
      <NewSuggestionTopNav titleColor="dark" />
      <Stack
        paddingX={0}
        direction="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Stack marginY={5}>
          <img src={successV} alt="sucess v icon" width={"58.67px"} />
        </Stack>
        <Typography align="center" variant="h2" marginBottom={5}>
          הצעתך פורסמה בהצלחה!
        </Typography>

        <Button fullWidth variant="primary" style={{ margin: "16px 0" }}>
          לצפייה בהצעה
        </Button>

        <Button fullWidth variant="trans" href="/">
          חזרה לעמוד הבית
        </Button>
      </Stack>
    </Stack>
  );
};
