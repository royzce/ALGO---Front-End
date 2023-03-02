import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
const UserActionButtons = () => {
  return (
    <ButtonGroup size="small">
      <Button variant="contained">
        <PersonAddIcon />
        &nbsp;Add friend
      </Button>
      &nbsp;
      <Button variant="contained">
        <PersonAddIcon />
        &nbsp;Add friend
      </Button>
    </ButtonGroup>
  );
};

export default UserActionButtons;
