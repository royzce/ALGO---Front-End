import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as userService from "../services/user";

const interestList = [
  {
    name: "Java",
    img: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo.png",
  },
  {
    name: "Python",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png",
  },
  {
    name: "C++",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png",
  },
  {
    name: "Angular",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png",
  },
  {
    name: "React",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
  },
  {
    name: "C#",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png",
  },
];

const Interest = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState({});
  const [filteredInterest, setFilteredInterest] = useState([]);
  const { interest } = profileData;
  useEffect(() => {
    if (username) {
      userService
        .getProfileData(username)
        .then((res) => setProfileData(res.data));
    }
    if (interest) {
      setFilteredInterest(
        interestList.filter((item) => {
          const result = interest.find(
            (interest) => interest.interest === item.name
          );
          if (result) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [username, interest]);

  const styles = {
    borderRadius: {
      borderRadius: "10px",
    },
  };
  return (
    <Card sx={styles.borderRadius}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="fontWeightBold">
            Interests
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={6} textAlign="center">
          {filteredInterest &&
            filteredInterest.map((item, index) => {
              return (
                <Grid item key={index} xs={4}>
                  <Typography>{item.name}</Typography>
                  <img
                    src={item.img}
                    alt={item.name}
                    width="auto"
                    height="165"
                  />
                </Grid>
              );
            })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Interest;
