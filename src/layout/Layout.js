import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import Navigation from "../components/Navigation/Navigation";

const Layout = ({ children, darkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Navigation darkMode={darkMode} />
      <Box
        sx={
          darkMode
            ? { backgroundColor: "#040404"}
            : { backgroundColor: "#ffffff" }
        }
      >
          {children}
      </Box>
    </>
  );
};

export default Layout;
