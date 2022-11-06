import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  Stack,
  Typography,
  TextField,
  Button,
  Card,
} from "@mui/material";
import lock from "../assets/login-lock.svg";

import { Community } from "../types/entities";

interface LoginDialogProps {
  isOpen: boolean;
  setWhoIsOpen: (v: string) => void;
  selectedCommunity?: Community;
}

export const LoginDialog = ({
  isOpen,
  setWhoIsOpen,
  selectedCommunity,
}: LoginDialogProps) => {
  const handleClose = () => {
    setWhoIsOpen("none");
  };
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setError(false);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <Card sx={{}}>
        <Stack
          textAlign="center"
          paddingY={3}
          gap={1}
          paddingX={3}
          alignItems="center"
          height={400}
          width={440}
        >
          <img
            src={lock}
            alt="lock icon"
            style={{ width: "56px", height: "56px" }}
          />
          <Typography variant="h1">קהילה זו מוגנת בסיסמא</Typography>
          <Typography variant="body2">
            הכניסו את הסיסמא על מנת להמשיך
          </Typography>
          <TextField
            type="password"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
          />
          {error && (
            <Typography color="#C3356B" fontSize={14} lineHeight={"22px"}>
              הסיסמא שגויה
            </Typography>
          )}
          <Button
            fullWidth
            type="submit"
            color="primary"
            size="large"
            disabled={password === ""}
            style={{ height: "56px" }}
            onClick={() => {
              if (password === selectedCommunity?.password) {
                navigate(`community/${selectedCommunity.id}`);
              } else {
                setError(true);
              }
            }}
          >
            כניסה
          </Button>
          <Typography
            variant="body2"
            marginTop="8px"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              setWhoIsOpen("join");
            }}
          >
            אני רוצה להצטרף לקהילה
          </Typography>
        </Stack>
      </Card>
    </Dialog>
  );
};
