import { Card, CardHeader, Grid, Tab, Tabs } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";

const About = () => {
  const [value, setValue] = useState("Details");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card>
          <CardHeader title="About" />
          <Tabs value={value} onChange={handleChange} orientation="vertical">
            <Tab
              value="Details"
              label="Details"
              LinkComponent={Link}
              to={"/profile/about"}
            />
            <Tab
              value="Interest"
              label="Interest"
              LinkComponent={Link}
              to={"/profile/interest"}
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
