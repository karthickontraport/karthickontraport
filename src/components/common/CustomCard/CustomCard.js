import React from "react";
import { Card, CardContent } from "@mui/material";

const CustomCard = ({ children }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        transition: "0.3s ease-in-out",
        "&:hover": {
          background: "#ecf5ff",
          borderColor: "rgb(0, 114, 229)",
          cursor: "pointer",
        },
      }}
    >
      <CardContent sx={{ padding: "10px !important" }}>{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
