import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dialog, Stack, Typography, TextField, Button } from "@mui/material";
import successV from "../assets/successV.svg";

interface CreateCommunitySuccessDialogProps {
  isOpen: boolean;
  setWhoIsOpen: (v: string) => void;
}

export const CreateCommunitySuccessDialog = ({
  isOpen,
  setWhoIsOpen,
}: CreateCommunitySuccessDialogProps) => {
  const handleClose = () => {
    setWhoIsOpen("none");
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <Stack
        textAlign="center"
        gap={2}
        paddingX={3}
        paddingTop={3}
        paddingBottom={3}
        alignItems="center"
        width={380}
        maxWidth="100%"
      >
        <img
          src={successV}
          alt="sucess v icon"
          style={{ width: "59.67px", height: "59.67px" }}
        />

        <Typography variant="h2">בקשתך התקבלה</Typography>
        <Typography fontSize="14px">
          אנו נעבור על פרטי הבקשה ונצור אתכם קשר
        </Typography>
        <Typography variant="body2">תודה על פנייתכם</Typography>

        <Button
          fullWidth
          sx={{
            border: "2px solid #011756",
            backgroundColor: "white",
            height: "54px",
          }}
          onClick={() => {
            setWhoIsOpen("");
          }}
        >
          <Typography color="#011756" fontWeight={600}>
            חזרה לעמוד הראשי
          </Typography>
        </Button>
      </Stack>
    </Dialog>
  );
};
