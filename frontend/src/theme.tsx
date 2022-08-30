import { createTheme } from "@mui/material";
const primaryColor = "#8BD4DD";
const secondaryColor = "#011756";
const mainBlackColor = "#000000";

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
            boxShadow: "2px 2px 0px #000000",
            border: "2px solid #011756",
          },
        },
        {
          props: { variant: "outlined" },
          style: {
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
    subtitle1: {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "24px",
      textAlign: "center",
      color: secondaryColor,
    },
    body1: {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "26px",
      textAlign: "right",
      color: mainBlackColor,
    },
  },
});
