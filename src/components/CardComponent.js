import React from "react";
import Box from "@mui/material/Box";
import "./cardComponent.css";

const CardComponent = ({ title, children }) => (
  <Box className="box" component="main">
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
