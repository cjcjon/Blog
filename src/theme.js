import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#6c757d",
    },
    success: {
      main: "#28a745",
    },
    error: {
      main: "#dc3545",
    },
    warning: {
      main: "#ffc107",
    },
    info: {
      main: "#17a2b8",
    },
    background: {
      default: "#fff",
    },
  },
  overrides: {
    MuiToolbar: {
      regular: {
        minHeight: "64px",
        "@media(min-width:600px)": {
          minHeight: "64px",
        },
      },
    },
  },
});

export default theme;
