import { useState, useContext } from "react";
import { InputBox } from "./SmallComponents";
import { Typography, Dialog, Stack, TextField, Button } from "@mui/material";
import { CommunitiesContext } from "../contexts";
import { checkIfEmailIsValid } from "../utils/functions";

import rightArrow from "../assets/chevron-right.svg";

interface CreateCommunityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const defaultInfo = {
  fullname: "",
  email: "",
  phone: "",
  details: "",
};

export const CreateCommunityDialog = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateCommunityDialogProps) => {
  const [formInfo, setFormInfo] = useState(defaultInfo);
  const { createCommunityIdea } = useContext(CommunitiesContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  //
  const handleChange = (e: any) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    if (
      formInfo.fullname !== "" &&
      formInfo.email !== "" &&
      formInfo.phone !== "" &&
      formInfo.details !== "" &&
      checkIfEmailIsValid(formInfo.email)
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return (
    <Dialog onClose={onClose} open={isOpen}>
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
        onClick={onClose}
      />
      <Stack
        textAlign="center"
        gap={2}
        paddingX={3}
        paddingTop={1}
        paddingBottom={3}
        alignItems="center"
      >
        <Stack alignItems="center">
          <Typography variant="h2">בקשה להקמת קהילה</Typography>
          <Typography fontSize="12px">
            אנא מלאו את הפרטים ונצור אתכם קשר בהקדם
          </Typography>
        </Stack>

        <InputBox display="flex" gap={1}>
          <Typography variant="subtitle1">שם מלא</Typography>
          <TextField
            placeholder="ישראל ישראלי"
            name="fullname"
            value={formInfo.fullname}
            onChange={handleChange}
            fullWidth
          />
        </InputBox>
        <InputBox display="flex" gap={1}>
          <Typography variant="subtitle1">אימייל</Typography>
          <TextField
            placeholder="israel@israeli.com"
            name="email"
            value={formInfo.email}
            onChange={handleChange}
            fullWidth
          />
        </InputBox>
        <InputBox display="flex" gap={1}>
          <Typography variant="subtitle1">טלפון</Typography>
          <TextField
            placeholder="050-1234567"
            name="phone"
            value={formInfo.phone}
            onChange={handleChange}
            fullWidth
          />
        </InputBox>
        <InputBox display="flex" gap={1}>
          <Typography variant="subtitle1">פירוט הבקשה</Typography>
          <TextField
            placeholder="זה המקום לפרט על הקהילה אותה תרצו להקים"
            name="details"
            value={formInfo.details}
            onChange={handleChange}
            fullWidth
            rows={5}
            multiline
          />
        </InputBox>
        <Button
          fullWidth
          type="submit"
          color="primary"
          size="large"
          disabled={isButtonDisabled}
          onClick={async () => {
            await createCommunityIdea(
              formInfo.fullname,
              formInfo.email,
              formInfo.phone,
              formInfo.details
            );

            onSubmit();
            setFormInfo(defaultInfo);
          }}
        >
          שליחת בקשה
        </Button>
      </Stack>
    </Dialog>
  );
};
