import { useState } from "react";
import { Stack, Typography, Collapse, Box } from "@mui/material";
import HomeTitle from "../assets/HomeTitle.svg";
import downArrow from "../assets/chevron-down.svg";
import upArrow from "../assets/chevron-up.svg";

export const TopDrawer = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Stack
      bgcolor="secondary.main"
      padding={5}
      alignItems="center"
      position="relative"
      borderRadius="0 0 32px 32px"
      marginBottom={3}
      boxShadow="0px 4px 24px rgba(0, 0, 0, 0.16);"
    >
      <Box>
        <img src={HomeTitle} alt="home title icon" width="148.84px" />
        <Typography variant="subtitle1" color="primary">
          קהילות מקבלות החלטות
        </Typography>
      </Box>
      <Collapse in={open}>
        <Box padding={2.5} />
        <Typography variant="body1" color="white">
          היום יותר מתמיד, הבחירה היא בידיים שלנו. כל אחת ואחד מאיתנו יכולים
          וצריכים להוביל.
        </Typography>
        <Typography variant="body1" color="white">
          decom היא פלטפורמה עבור קבוצות וארגונים שבהם כולם יכולים להציע, להצביע
          ולהחליט - ביחד.
        </Typography>
      </Collapse>

      <img
        src={open ? upArrow : downArrow}
        alt="down arrow"
        style={{
          position: "absolute",
          bottom: -10,
          cursor: "pointer",
        }}
        onClick={() => {
          setOpen(!open);
        }}
      />
    </Stack>
  );
};
