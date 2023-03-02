import { useParams } from "react-router";
import EditProfileForm from "../components/EditProfileForm";
import { useEffect, useState } from "react";
import * as userService from "../services/user";

const EditProfilePage = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    if (username) {
      userService
        .getProfileData(username)
        .then((res) => setProfileData(res.data));
    }
  }, [username]);
  return <EditProfileForm profileData={profileData} />;
};

export default EditProfilePage;
