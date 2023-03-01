import React, { useEffect, useState } from "react";
import * as userService from "../services/user";
import DiscoverFriends from "./DiscoverFriends";
import { useParams } from "react-router-dom";

const SearchPeople = () => {
  const { q } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getUsersBy(q).then((res) => {
      setUsers(res.data);
    });
  }, [q]);

  return <DiscoverFriends users={users} />;
};

export default SearchPeople;
