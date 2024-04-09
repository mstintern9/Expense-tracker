import React from "react";
import Box from "@mui/material/Box";

const CardComponent = ({ children }) => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      p: 3,
      marginLeft: "33vh",
      marginRight: "12vh",
      marginTop: "6vh",
      height: "68vh",
      borderRadius:"1.5vh",
      display: "flex",
      flexDirection: "row",
      border: "3px solid rgb(221, 221, 221)",
      backgroundColor: "rgb(255, 255, 255)",
    }}
  >
    {children}
  </Box>
);

export default CardComponent;
