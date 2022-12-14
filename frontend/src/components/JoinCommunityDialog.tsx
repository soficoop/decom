import { useState, useContext } from "react";
import { InputBox } from "./SmallComponents";
import { Typography, Dialog, Stack, TextField, Button } from "@mui/material";
import { CommunitiesContext } from "../contexts";
import { Community } from "../types/entities";
import rightArrow from "../assets/chevron-right.svg";
import { checkIfEmailIsValid } from "../utils/functions";
interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
  onBack: () => void;
  selectedCommunity?: Community;
}

export const JoinCommunityDialog = ({
  isOpen,
  onClose,
  selectedCommunity,
  onJoin,
  onBack,
}: LoginDialogProps) => {
  const [formInfo, setFormInfo] = useState({
    fullname: "",
    email: "",
    details: "",
  });

  const { joinCommunity } = useContext(CommunitiesContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleChange = (e: any) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    if (
      formInfo.fullname !== "" &&
      formInfo.email !== "" &&
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
        onClick={onBack}
      />
      <Stack
        textAlign="center"
        gap={2}
        paddingX={3}
        paddingTop={3}
        paddingBottom={3}
        alignItems="center"
        width="100%"
      >
        <Stack alignItems="center">
          <Typography variant="body2" textAlign="center">
            בקשת הצטרפות לקהילה
          </Typography>
          <Typography variant="h2">{selectedCommunity?.name}</Typography>
        </Stack>

        <InputBox>
          <Typography variant="subtitle1">שם מלא</Typography>
          <TextField
            placeholder="ישראל ישראלי"
            name="fullname"
            value={formInfo.fullname}
            onChange={handleChange}
            fullWidth
          />
        </InputBox>
        <InputBox>
          <Typography variant="subtitle1">אימייל</Typography>
          <TextField
            placeholder="israel@israeli.com"
            name="email"
            value={formInfo.email}
            onChange={handleChange}
            fullWidth
          />
        </InputBox>
        <InputBox>
          <Typography variant="subtitle1">פירוט הבקשה</Typography>
          <TextField
            multiline
            rows={5}
            placeholder="זה המקום לספר על עצמך ועל הקשר שלך לקהילה"
            name="details"
            value={formInfo.details}
            onChange={handleChange}
            fullWidth
          />
        </InputBox>
        <Button
          fullWidth
          type="submit"
          color="primary"
          size="large"
          disabled={isButtonDisabled}
          style={{ height: "56px" }}
          onClick={async () => {
            await joinCommunity(
              formInfo.fullname,
              formInfo.email,
              formInfo.details
            );
            onJoin();
          }}
        >
          שלח בקשה
        </Button>
      </Stack>
    </Dialog>
  );
};
