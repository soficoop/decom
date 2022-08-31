import { Stack, Typography } from "@mui/material";
import { NewSuggestionTopNav } from "../components/TopHeaderTitleNav";
import { InputLabel, TextField, Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import addImage from "../assets/add-image.svg";

const TXTAREA = styled.textarea`
  font-family: Noto Sans Hebrew, sans-serif;
  width: 100%;
  height: 248px;
  background: #ffffff;
  border-radius: 8px;
  text-align: right;
  color: #000000;
  border: 2px solid #011756;
  padding: 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  white-space: pre-line;
`;

const StyledAddImageBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 12px;
  height: 110px;
  background: #ffffff;
  border: 1px dashed #011756;
  border-radius: 8px;
`;

const InputBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 100%;
`;

export const NewSuggestion = () => {
  return (
    <Stack paddingX={0}>
      <NewSuggestionTopNav />
      <Typography align="center" variant="h2">
        הצעה חדשה
      </Typography>
      <Stack>
        <InputBox marginY={1.5}>
          <InputLabel>כותרת</InputLabel>
          <TextField placeholder="תנו שם ברור" fullWidth />
        </InputBox>
        <StyledAddImageBox marginY={1.5}>
          <img src={addImage} alt="add icon" />
          <Typography variant="subtitle1">הוספת תמונה</Typography>
        </StyledAddImageBox>
        <InputBox marginY={1.5}>
          <InputLabel>פירוט ההצעה</InputLabel>
          {/* {isTextField ? ( */}
          <TXTAREA
            autoFocus
            placeholder={`נסו להתייחס לנקודות הבאות:

            סקירה מעמיקה ומקיפה של הסוגיה
            הנחות מוצא שהסוגיה מבתבססת עליהן
            פירוט הקריטריונים החשובים בבחירת פתרון`}
          />
        </InputBox>
        <Button>פרסום סוגיה</Button>
      </Stack>
    </Stack>
  );
};
