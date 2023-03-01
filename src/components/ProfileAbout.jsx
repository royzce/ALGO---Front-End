import { Card, CardHeader, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Link, Outlet, useParams } from "react-router-dom";
import React, { useState } from "react";

const About = () => {
  const [value, setValue] = useState("Details");
  let { id } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              to={`/profile/${id}/about`}
            />
            <Tab
              value="Interest"
              label="Interest"
              LinkComponent={Link}
              to={`/profile/${id}/interest`}
            />
          </Tabs>
          {/* <List>
            <ListItem>
              <ListItemButton LinkComponent={Link} to={"/profile/about"}>
                <ListItemText>Details</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton LinkComponent={Link} to={"/profile/interest"}>
                <ListItemText>Interest</ListItemText>
              </ListItemButton>
            </ListItem>
          </List> */}
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default About;
