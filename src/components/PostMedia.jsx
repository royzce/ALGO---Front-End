import { ImageList, ImageListItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function PostMedia() {
  return (
    <ImageList>
      <Link to="/posts/1/1">
        <ImageListItem>
          <img
            alt="post-pic"
            src="https://i.guim.co.uk/img/media/2ac7a901163b8dbb376b37742fbe2ed6939dd1b5/0_0_3902_3377/master/3902.jpg?width=1140&quality=45&dpr=2&s=none"
          />
        </ImageListItem>
      </Link>
    </ImageList>
  );
}
