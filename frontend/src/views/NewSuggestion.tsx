import { Stack, Typography } from "@mui/material";
import { NewSuggestionTopNav } from "../components/TopHeaderTitleNav";
import { InputLabel, TextField, Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import addImage from "../assets/add-image.svg";

const StyledPlaceholderBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 248px;
  background: #ffffff;
  border-radius: 8px;
  text-align: right;
  color: rgba(128, 135, 156, 1);
  border: 2px solid #011756;
`;

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
  const [isTextField, setIsTextField] = useState(false);

  const handleClick = () => {
    setIsTextField(true);
  };

  const TextFieldPlaceHolder = () => {
    return (
      <StyledPlaceholderBox padding={2} onClick={handleClick}>
        <div>נסו להתייחס לנקודות הבאות:</div>
        <br />
        <div>סקירה מעמיקה ומקיפה של הסוגיה</div>
        <div>הנחות מוצא שהסוגיה מבתבססת עליהן</div>
        <div>פירוט הקריטריונים החשובים בבחירת פתרון</div>
      </StyledPlaceholderBox>
    );
  };

  const handleOnBlur = (e: any) => {
    if (e.target.value === "") {
      setIsTextField(false);
    }
  };

  return (
    <Stack paddingX={0}>
      <NewSuggestionTopNav titleColor="dark" />
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
          {isTextField ? (
            <TXTAREA onBlur={handleOnBlur} autoFocus />
          ) : (
            <TextFieldPlaceHolder />
          )}
        </InputBox>
        <Button variant="primary">פרסום סוגיה</Button>
      </Stack>
    </Stack>
  );
};
