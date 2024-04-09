import React from "react";
import Box from "@mui/material/Box";

const CardComponent = ({ title, children }) => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      p: 3,
      marginLeft: "33vh",
      marginRight: "12vh",
      marginTop: "6vh",
      height: "74vh",
      borderRadius: "1.5vh",
      display: "flex",
      flexDirection: "column",
      border: "3px solid rgb(221, 221, 221)",
      backgroundColor: "rgb(255, 255, 255)",
    }}
  >
    {title && (
      <>
        <h3 style={{ color: "grey", fontSize: "2.8vh", marginTop: "0" }}>
          {title}
        </h3>
        <hr
          style={{
            borderTop: "1px solid rgb(221, 221, 221)",
            margin: "0.5vh 0",
          }}
        />
      </>
    )}
    {children}
  </Box>
);

export default CardComponent;
