import { createTheme } from "@mui/material";
const primaryColor = "#8BD4DD";
export const secondaryColor = "#011756";
const mainBlackColor = "#000000";
export const numberColor = "rgba(1, 23, 86, 0.66)";
export const lightGreyColor = "#e2e7f4";

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
    info: {
      main: numberColor,
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
    MuiDialog: {
      defaultProps: {
        maxWidth: "xs",
        fullWidth: true,
      },
      styleOverrides: {
        paper: {
          boxShadow: `2px 2px 0px ${mainBlackColor}`,
          border: `2px solid ${secondaryColor}`,
        },
      },
    },
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
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "600",
        },
      },
      defaultProps: {
        disableElevation: true,
        variant: "contained",
      },
      variants: [
        {
          props: { size: "large" },
          style: {
            height: "56px",
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& input": {
              padding: "12px 8px",
            },
            "& fieldset": {
              border: "2px solid black",
              borderRadius: 8,
            },
            "&.Mui-focused fieldset": {
              border: "2px solid black",
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "'Noto Sans Hebrew', sans-serif",
    h1: {
      fontSize: "28px",
      fontWeight: "700",
      lineHeight: "38px",
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
    subtitle2: {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "20px",
      lineHeight: "27px",
    },
    body1: {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "26px",
    },
    body2: {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",
    },
  },
});
