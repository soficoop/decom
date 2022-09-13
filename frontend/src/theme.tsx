import { createTheme } from "@mui/material";
const primaryColor = "#8BD4DD";
const secondaryColor = "#011756";
const mainBlackColor = "#000000";
const disabledColor = "#D3D6E0";
const whiteColor = "#FFFFFF";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    trans: true;
  }
}

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
            boxShadow: `2px 2px 0px ${mainBlackColor}`,
            border: `2px solid ${secondaryColor}`,
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
      variants: [
        {
          props: { variant: "primary" },
          style: {
            disableElevation: true,
            height: "56px",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "24px",
            color: secondaryColor,
            borderRadius: "16px",
            background: primaryColor,
          },
        },
        {
          props: { variant: "trans" },
          style: {
            disableElevation: true,
            height: "56px",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "24px",
            color: secondaryColor,
            borderRadius: "16px",
            background: whiteColor,
            border: "1px solid " + secondaryColor,
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            disableElevation: true,
            height: "56px",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "24px",
            color: whiteColor,
            borderRadius: "16px",
            background: disabledColor,
            border: "1px solid " + secondaryColor,
          },
        },
      ],
    },
    MuiFab: {
      variants: [
        {
          props: { variant: "extended" },
          style: {
            boxShadow: "0px 4px 8px 3px rgba(0, 0, 0, 0.15);",
            filter: "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.3))",
            position: "fixed",
            bottom: "10px",
            left: "10px",
            width: "96px",
            height: "96px",
            backgroundColor: primaryColor,
            zIndex: "9",
          },
        },
      ],
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
