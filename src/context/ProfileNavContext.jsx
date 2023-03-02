import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { useMatch, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";

export const ProfileNavContext = createContext({
  profileTab: "",
  setProfileTab: () => {},
});
