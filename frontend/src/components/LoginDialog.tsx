import { useState, useContext } from "react";
import { CommunitiesContext } from "../contexts/communities";
import { Dialog, Stack, Typography, TextField, Button } from "@mui/material";
import lock from "../assets/login-lock.svg";
import { JoinCommunityDialog } from "./JoinCommunityDialog";
import { Community } from "../types/entities";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
  onLogin: () => void;
  selectedCommunity?: Community;
}

export const LoginDialog = ({
  isOpen,
  onClose,
  onJoin,
  onLogin,
  selectedCommunity,
}: LoginDialogProps) => {
  const [isJoin, setIsJoin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { validatePassword } = useContext(CommunitiesContext);
  // use community context
  // isPasswordValid - function inside comm context
  // if ok run onLoginSuccess

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setError(false);
  };

  if (isJoin)
    return (
      <JoinCommunityDialog
        isOpen={isOpen}
        selectedCommunity={selectedCommunity}
        onClose={onClose}
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
        width={380}
        maxWidth="100%"
      >
        <img
          src={lock}
          alt="lock icon"
          style={{ width: "56px", height: "56px" }}
        />
        <Typography variant="h2">קהילה זו מוגנת בסיסמא</Typography>
        <Typography variant="body2">הכניסו את הסיסמא על מנת להמשיך</Typography>
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
            validatePassword(password);
            onLogin();
          }}
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
