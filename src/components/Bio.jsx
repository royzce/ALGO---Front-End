import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

const Bio = () => {
  return (
    <Card>
      <CardHeader title="Bio" />
      <CardContent>
        <Typography>Bio Here</Typography>
      </CardContent>
    </Card>
  );
};

export default Bio;
