import { Dialog, Stack, Typography, Button } from "@mui/material";
import successV from "../assets/successV.svg";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessDialog = ({ isOpen, onClose }: SuccessDialogProps) => {
  return (
    <Dialog onClose={onClose} open={isOpen}>
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
          onClick={onClose}
        >
          <Typography color="#011756" fontWeight={600}>
            חזרה לעמוד הראשי
          </Typography>
        </Button>
      </Stack>
    </Dialog>
  );
};
