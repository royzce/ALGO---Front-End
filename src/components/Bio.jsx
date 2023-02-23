import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

const Bio = () => {
  return (
    <Card sx={{ borderRadius: "10px" }}>
      <Typography
        variant="h5"
        fontWeight="fontWeightBold"
        sx={{ padding: "20px" }}
      >
        Bio
      </Typography>
      <CardContent>
        <Typography>Bio Here</Typography>
      </CardContent>
    </Card>
  );
};

export default Bio;
