import { Card, CardHeader, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Link, Outlet, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { ProfileNavContext } from "../context/ProfileNavContext";

const About = () => {
  const [value, setValue] = useState("Details");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let { username } = useParams();

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card sx={{ borderRadius: "10px" }}>
          <CardHeader
            title={
              <Typography variant="h5" fontWeight="fontWeightBold">
                About
              </Typography>
            }
          />
          <Tabs value={value} onChange={handleChange} orientation="vertical">
            <Tab
              value="Details"
              label="Details"
              LinkComponent={Link}
              to={`/${username}/about`}
            />
            <Tab
              value="Interest"
              label="Interest"
              LinkComponent={Link}
              to={`/${username}/interest`}
            />
          </Tabs>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default About;
