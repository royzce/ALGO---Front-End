import React from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { q } = useParams();

  return <div>My Component with query {q} </div>;
};

export default SearchPage;

//searchParams
