import { useState } from "react";
import { Stack, Typography, useTheme, Collapse } from "@mui/material";
import HomeTitle from "../assets/HomeTitle.svg";
import downArrow from "../assets/chevron-down.svg";
import upArrow from "../assets/chevron-up.svg";

interface TopDrawerProps {
  drawerText: string;
}

export const TopDrawer = ({ drawerText }: TopDrawerProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  return (
    <Stack
      bgcolor={theme.palette.secondary.main}
      paddingTop={2}
      justifyContent="center"
      alignItems="center"
      minHeight="141.11px"
      borderRadius={"0 0 32px 32px"}
      zIndex="9"
      marginBottom={3}
      boxShadow="0px 4px 24px rgba(0, 0, 0, 0.16);"
    >
      <img src={HomeTitle} alt="home title icon" width="148.84px" />
      <Typography fontSize={"13px"} color={theme.palette.primary.main}>
        קהילות מקבלות החלטות
      </Typography>
      <Collapse in={open}>
        <Typography
          variant="body1"
          width={"347px"}
          color={"#FFFFFF"}
          marginY={5}
        >
          {drawerText}
        </Typography>
      </Collapse>

      <img
        src={open ? upArrow : downArrow}
        alt="down arrow"
        style={{
          position: "relative",
          bottom: `${open ? "-10px" : "-30px"}`,
          cursor: "pointer",
        }}
        onClick={() => {
          setOpen(!open);
        }}
      />
    </Stack>
  );
};
