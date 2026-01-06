import { backdropClasses, createTheme } from "@mui/material";
export const AppLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      header: "#FFFF",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f0f5f7ff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#4f4f4f",
      tertiary: "#FFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#115293",
          },
        },
        outlinedPrimary: {
          borderColor: "#1976d2",
          color: "#1976d2",
        },
        textPrimary: {
          color: "#1976d2",
        },
      },
    },
  },
});

export const AppDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // soft blue, readable on dark
      contrastText: "#0d1117",
    },
    background: {
      default: "#0d1117", // dark gray-blue (GitHub style)
      paper: "#161b22", // slightly lifted surfaces
    },
    text: {
      primary: "#e6edf3",
      secondary: "#9ba3af",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: "#90caf9",
          color: "#0d1117",
          "&:hover": {
            backgroundColor: "#64b5f6",
          },
        },
        outlinedPrimary: {
          borderColor: "#90caf9",
          color: "#90caf9",
        },
        textPrimary: {
          color: "#90caf9",
        },
      },
    },
  },
});

export const MintGreenTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#618a63ff",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f1f8f4",
      paper: "#ffffff",
    },
    text: {
      primary: "#1f2d1f",
      secondary: "#4f6b4f",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: 15,
        },
        containedPrimary: {
          backgroundColor: "#618a63ff",
          "&:hover": {
            backgroundColor: "#1b5e20",
          },
        },
        outlinedPrimary: {
          borderColor: "#2e7d32",
          color: "#2e7d32",
        },
        textPrimary: {
          color: "#2e7d32",
        },
      },
    },
  },
});

export const SoftPinkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#d81b60",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fff0f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#2b1a1f",
      secondary: "#6b4f57",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: "#d81b60",
          "&:hover": {
            backgroundColor: "#ad1457",
          },
        },
        outlinedPrimary: {
          borderColor: "#d81b60",
          color: "#d81b60",
        },
        textPrimary: {
          color: "#d81b60",
        },
      },
    },
  },
});

export const WarmBeigeTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8d6e63",
      contrastText: "#ffffff",
    },
    background: {
      default: "#faf7f2",
      paper: "#ffffff",
    },
    text: {
      primary: "#2e2e2e",
      secondary: "#6b6b6b",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: "#8d6e63",
          "&:hover": {
            backgroundColor: "#6d4c41",
          },
        },
        outlinedPrimary: {
          borderColor: "#8d6e63",
          color: "#8d6e63",
        },
        textPrimary: {
          color: "#8d6e63",
        },
      },
    },
  },
});

export const SoftDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      contrastText: "#0f172a",
    },
    background: {
      default: "#121826",
      paper: "#22293aff",
    },
    text: {
      primary: "#eaeaea",
      secondary: "#b0b8c4",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: "#90caf9",
          color: "#3f4147ff",
          "&:hover": {
            backgroundColor: "#64b5f6",
          },
        },
        outlinedPrimary: {
          borderColor: "#90caf9",
          color: "#90caf9",
        },
        textPrimary: {
          color: "#90caf9",
        },
      },
    },
  },
});

export const LightYellowTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f9a825",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fffde7",
      paper: "#ffffff",
    },
    text: {
      primary: "#2f2f2f",
      secondary: "#6f6f6f",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: "#f9a825",
          "&:hover": {
            backgroundColor: "#f57f17",
          },
        },
        outlinedPrimary: {
          borderColor: "#f9a825",
          color: "#f9a825",
        },
        textPrimary: {
          color: "#f9a825",
        },
      },
    },
  },
});
