import { useState, useContext } from "react";
import { Dialog, Stack, Typography, TextField, Button } from "@mui/material";
import lock from "../assets/login-lock.svg";
import { JoinCommunityDialog } from "./JoinCommunityDialog";
import { Community } from "../types/entities";
import { ApiContext } from "../contexts";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
  onLoginSuccess: (password: string) => void;
  selectedCommunity: Community;
}

export const LoginDialog = ({
  isOpen,
  onClose,
  onJoin,
  onLoginSuccess,
  selectedCommunity,
}: LoginDialogProps) => {
  const [isJoin, setIsJoin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { isPasswordValid } = useContext(ApiContext);

  function handleClose() {
    setIsJoin(false);
    setPassword("");
    setError(false);
    onClose();
  }

  async function handleLoginClick() {
    const isValid = await isPasswordValid(password, selectedCommunity.id);
    if (isValid) {
      onLoginSuccess(password);
    } else {
      setError(true);
    }
  }

  function handlePasswordChange(e: any) {
    setPassword(e.target.value);
    setError(false);
  }

  if (isJoin)
    return (
      <JoinCommunityDialog
        isOpen={isOpen}
        selectedCommunity={selectedCommunity}
        onClose={handleClose}
        onJoin={onJoin}
        onBack={() => setIsJoin(false)}
      />
    );

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <Stack
        textAlign="center"
        gap={1}
        paddingX={3}
        paddingTop={3}
        paddingBottom={3}
        alignItems="center"
        maxWidth="100%"
      >
        <img
          src={lock}
          alt="lock icon"
          style={{ width: "56px", height: "56px" }}
        />
        <Typography variant="h2">קהילה זו מוגנת בסיסמא</Typography>
        <Typography variant="subtitle1" color="secondary.main">
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
          onClick={handleLoginClick}
        >
          כניסה
        </Button>
        <Typography
          variant="body2"
          marginTop="8px"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => setIsJoin(true)}
        >
          אני רוצה להצטרף לקהילה
        </Typography>
      </Stack>
    </Dialog>
  );
};
