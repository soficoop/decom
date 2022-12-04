import { useState, useContext } from "react";
import { InputBox } from "./SmallComponents";
import {
  Typography,
  Dialog,
  Stack,
  TextField,
  InputLabel,
  Button,
  TextareaAutosize,
  styled,
} from "@mui/material";
import { CommunitiesContext } from "../contexts";
import { Community } from "../types/entities";
import rightArrow from "../assets/chevron-right.svg";
interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
  onBack: () => void;
  selectedCommunity?: Community;
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

  const handleChange = (e: any) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
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
        gap={1}
        paddingX={3}
        paddingTop={3}
        paddingBottom={3}
        alignItems="center"
        width={380}
        maxWidth="100%"
      >
        <Typography variant="body2" textAlign="center">
          בקשת הצטרפות לקהילה
        </Typography>
        <Typography variant="h2">{selectedCommunity?.name}</Typography>

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
            <b>פירוט הבקשה</b>
          </InputLabel>
          <StyledTextArea
            placeholder="זה המקום לספר על עצמך ועל הקשר שלך לקהילה"
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
            formInfo.details === ""
          }
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
