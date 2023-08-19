import { createTheme } from "@mui/material";

const useCustomTheme = (darkMode) => {
  const customTheme = createTheme(
    darkMode
      ? {
          breakpoints: {
            values: {
              xs: 0,
              sm: 576,
              md: 768,
              lg: 992,
              xl: 1200,
            }
          },
          palette: {
            primary: {
              main: "#121212",
            },
            secondary: {
              main: "#ffffff",
            },
            accent: {
              main: "#171C26",
            },
            pink: {
              main: "#E552FF",
            },
            blue: {
              main: "#01D4FA",
            },
            black: {
              main: "#040404",
            },
          },
          typography: {
            fontFamily: "'Brutal Type', sans-serif",
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
          },
          components: {
            MuiOutlinedInput: {
              styleOverrides: {
                root: {
                  borderRadius: '12px',
                  fontFamily: "'Brutal Type', sans-serif",
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: "0000001A",
                  },
                },
                input: {
                  padding: '12px',
                  borderRadius: '12px',
                  '&.MuiInputBase-inputSizeSmall': {
                    padding: '10px 14px',
                    '&.MuiInputBase-inputAdornedStart': {
                      paddingLeft: 0
                    }
                  },
                  minWidth: '150px'
                },
                notchedOutline: {
                  borderRadius: '12px'
                }
              }
            }
          }
        }
      : {
          breakpoints: {
            values: {
              xs: 0,
              sm: 576,
              md: 768,
              lg: 992,
              xl: 1200,
            }
          },
          palette: {
            background: {
              default: "#ffffff",
            },
            primary: {
              main: "#ffffff",
            },
            secondary: {
              main: "#121212",
            },
            accent: {
              main: "#fff2f8",
            },
            pink: {
              main: "#E552FF",
            },
            blue: {
              main: "#01D4FA",
            },
            black: {
              main: "#FFFFFF",
            },
          },
          typography: {
            fontFamily: "'Brutal Type', sans-serif",
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
          },
          components: {
            MuiOutlinedInput: {
              styleOverrides: {
                root: {
                  borderRadius: '12px',
                  fontFamily: "'Brutal Type', sans-serif",
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: "0000001A",
                  },
                },
                input: {
                  padding: '12px',
                  borderRadius: '12px',
                  '&.MuiInputBase-inputSizeSmall': {
                    padding: '10px 14px',
                    '&.MuiInputBase-inputAdornedStart': {
                      paddingLeft: 0
                    }
                  },
                  minWidth: '150px'
                },
                notchedOutline: {
                  borderRadius: '12px'
                }
              }
            }
          }
        }
  );

  return { customTheme };
};

export default useCustomTheme;
