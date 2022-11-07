import { useState } from "react";
import { InputBox } from "./SmallComponents";
import {
  Typography,
  Dialog,
  Stack,
  TextField,
  Card,
  InputLabel,
  Button,
  TextareaAutosize,
  styled,
} from "@mui/material";

import rightArrow from "../assets/chevron-right.svg";
interface CreateCommunityDialogProps {
  isOpen: boolean;
  setWhoIsOpen: (v: string) => void;
}

const StyledTextArea = styled(TextareaAutosize)`
  ::-webkit-input-placeholder {
    font-family: "Noto Sans Hebrew";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    text-align: right;
    color: rgba(1, 23, 86, 0.5);
  }
  ::-moz-placeholder {
    font-family: "Noto Sans Hebrew";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    text-align: right;
    color: rgba(1, 23, 86, 0.5);
  }
`;

const defaultInfo = {
  fullname: "",
  email: "",
  phone: "",
  details: "",
};

export const CreateCommunityDialog = ({
  isOpen,
  setWhoIsOpen,
}: CreateCommunityDialogProps) => {
  const [formInfo, setFormInfo] = useState(defaultInfo);

  const handleClose = () => {
    setWhoIsOpen("none");
  };

  const handleChange = (e: any) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <img
        src={rightArrow}
        alt="right arrow"
        style={{
          position: "relative",
          width: "24px",
          height: "24px",
          top: "16px",
          right: "16px",
          cursor: "pointer",
        }}
        onClick={() => {
          setWhoIsOpen("");
        }}
      />
      <Stack
        textAlign="center"
        gap={1}
        paddingX={3}
        paddingTop={1}
        paddingBottom={3}
        alignItems="center"
        width={380}
        maxWidth="100%"
      >
        <Typography variant="h2">בקשה להקמת קהילה</Typography>
        <Typography fontSize={"12px"}>
          אנא מלאו את הפרטים ונצור אתכם קשר בהקדם
        </Typography>

        <InputBox>
          <InputLabel>
            <b>שם מלא</b>
          </InputLabel>
          <TextField
            placeholder="ישראל ישראלי"
            name="fullname"
            value={formInfo.fullname}
            onChange={handleChange}
            fullWidth
          />
        </InputBox>
        <InputBox>
          <InputLabel>
            <b>אימייל</b>
          </InputLabel>
          <TextField
            placeholder="israel@israeli.com"
            name="email"
            value={formInfo.email}
            onChange={handleChange}
            fullWidth
          />
        </InputBox>
        <InputBox>
          <InputLabel>
            <b>טלפון</b>
          </InputLabel>
          <TextField
            placeholder="050-1234567"
            name="phone"
            value={formInfo.phone}
            onChange={handleChange}
            fullWidth
          />
        </InputBox>
        <InputBox>
          <InputLabel>
            <b>פירוט הבקשה</b>
          </InputLabel>
          <StyledTextArea
            placeholder="זה המקום לפרט על הקהילה אותה תרצו להקים"
            name="details"
            value={formInfo.details}
            onChange={handleChange}
            style={{
              width: "100%",
              height: "120px",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #000000",
              fontSize: "16px",
            }}
          />
        </InputBox>
        <Button
          fullWidth
          type="submit"
          color="primary"
          size="large"
          disabled={
            formInfo.fullname === "" ||
            formInfo.email === "" ||
            formInfo.phone === "" ||
            formInfo.details === ""
          }
          onClick={() => {
            setFormInfo(defaultInfo);
            setWhoIsOpen("create-community-success");
          }}
        >
          שליחת בקשה
        </Button>
      </Stack>
    </Dialog>
  );
};
