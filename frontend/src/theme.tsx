import { createTheme } from "@mui/material";
const primaryColor = "#8BD4DD";
const secondaryColor = "#011756";
const blackColor = "#000000";

export const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: "#FCFDFF",
      paper: "#FFF",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      variants: [
        {
          props: { variant: undefined },
          style: {
            margin: "1rem 0 ",
            width: "100%",
            boxSizing: "border-box",
            border: `2px solid ${secondaryColor}`,
          },
        },
      ],
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
    },
  },
  typography: {
    fontFamily: "'Noto Sans Hebrew', sans-serif",
    h1: {
      fontSize: "28px",
      fontWeight: "700",
      color: secondaryColor,
    },
    h2: {
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "24px",
      lineHeight: "30px",
      textAlign: "right",
      color: secondaryColor,
    },
    h3: {
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "20px",
      lineHeight: "27px",
      textAlign: "right",
      color: secondaryColor,
    },
    body1: {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "26px",
      textAlign: "right",
      color: blackColor,
    },
  },
});
