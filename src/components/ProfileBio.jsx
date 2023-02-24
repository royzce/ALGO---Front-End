import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

const Bio = () => {
  return (
    <Card sx={{ borderRadius: "10px" }}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="fontWeightBold">
            Bio
          </Typography>
        }
      />
      <CardContent>
        <Typography>Bio Here</Typography>
      </CardContent>
    </Card>
  );
};

export default Bio;
