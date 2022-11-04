import { useState } from "react";

import { Dialog, Stack, Typography, TextField, Button } from "@mui/material";
import lock from "../assets/login-lock.svg";
interface LoginDialogProps {
  isOpen: boolean;
  setIsOpen: (o: boolean) => void;
}

export const LoginDialog = ({ isOpen, setIsOpen }: LoginDialogProps) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <Stack
        textAlign="center"
        paddingY={8}
        gap={3}
        paddingX={3}
        alignItems="center"
      >
        <img
          src={lock}
          alt="lock icon"
          style={{ width: "56px", height: "56px" }}
        />
        <Typography variant="h1" marginTop="24px">
          קהילה זו מוגנת בסיסמא
        </Typography>
        <Typography variant="body2" marginTop="8px">
          הכניסו את הסיסמא על מנת להמשיך
        </Typography>
        <TextField
          type="password"
          fullWidth
          style={{ margin: "24px 0", height: "48px" }}
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          fullWidth
          type="submit"
          color="primary"
          size="large"
          disabled={password === ""}
          style={{ height: "56px" }}
        >
          כניסה
        </Button>
        <Typography
          variant="body2"
          marginTop="8px"
          sx={{ textDecoration: "underline" }}
        >
          אני רוצה להצטרף לקהילה
        </Typography>
      </Stack>
    </Dialog>
  );
};
