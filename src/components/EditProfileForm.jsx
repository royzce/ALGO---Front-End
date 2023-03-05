import React, { useContext, useEffect, useState } from "react";
import { PopupContext } from "../context/PopupContext";
import { RegisterContext } from "../context/RegisterContext";
import { useNavigate } from "react-router";
import Joi from "joi";
import * as userService from "../services/user";
import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { Stack } from "@mui/system";
import FirebaseCoverUpload from "./FirebaseCoverUpload";
import { UserContext } from "../context/UserContext";
import FirebaseAvatarUpload from "./FirebaseAvatarUpload";
import { uploadImage } from "../services/firebase";

const EditProfileForm = ({ profileData }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    bio: "",
    interest: [],
  });
  const { setCurrentUser } = useContext(UserContext);
  const [files, setFiles] = useState({
    coverFile: "",
    avatarFile: "",
  });
  const [previewProfile, setPreviewProfile] = useState({
    urlCover: "",
    urlAvatar: "",
  });
  useEffect(() => {
    if (profileData) {
      setForm({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        username: profileData.username,
        email: profileData.email,
        bio: profileData.bio,
        interest: profileData.interest,
      });
      setPreviewProfile({
        urlCover: profileData.cover,
        urlAvatar: profileData.avatar,
      });
    }
  }, [profileData]);
  function handleCloseCoverPreview() {
    setPreviewProfile({ ...previewProfile, urlCover: "" });
  }
  const handleCoverFileSelect = (e) => {
    const file = e.target.files[0];
    setFiles({ ...files, coverFile: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewProfile({ ...previewProfile, urlCover: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  function handleCloseAvatarPreview() {
    setPreviewProfile({ ...previewProfile, urlAvatar: "" });
  }
  const handleAvatarFileSelect = (e) => {
    const file = e.target.files[0];
    setFiles({ ...files, avatarFile: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewProfile({ ...previewProfile, urlAvatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const { onShowSuccess, onShowFail } = useContext(PopupContext);
  const { uploading, closePreview } = useContext(RegisterContext);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const schema = Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    username: Joi.string().min(5).max(15).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
    bio: Joi.string().allow(null, "").optional(),
    interest: Joi.array().items(Joi.string().allow(null, "")).optional(),
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    let avatar = "";
    if (files && files.avatarFile) {
      const storageUrl = await uploadImage(files.avatarFile);
      avatar = storageUrl;
    } else {
      avatar = previewProfile.urlAvatar;
    }
    let cover = "";
    if (files && files.coverFile) {
      const storageUrl = await uploadImage(files.coverFile);
      cover = storageUrl;
    } else {
      cover = previewProfile.urlCover;
    }
    userService
      .editProfile({ ...form, avatar: avatar, cover: cover })
      .then((res) => {
        setOpen(false);
        onShowSuccess("Profile Updated");
        closePreview();
        setCurrentUser(res.data);
        navigate(`/${form.username}`);
      })
      .catch((err) => {
        setOpen(false);
        onShowFail(err.response.data.message);
      });
  };
  const handleChange = ({ currentTarget: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setErrors({
        ...errors,
        [input.name]: error.details[0].message,
      });
    } else {
      delete errors[input.name];
      setErrors(errors);
    }
  };
  const isFormInvalid = () => {
    const result = schema.validate(form);

    return !!result.error;
  };

  const styles = {
    myTextField: {
      "& .MuiFilledInput-root": {
        border: "1px solid #e2e2e1",
        overflow: "hidden",
        borderRadius: "10px",
        "&:hover": {
          backgroundColor: "transparent",
        },
        "&.Mui-focused": {
          backgroundColor: "transparent",
        },
      },
    },
    paper: {
      borderRadius: "10px",
      padding: "30px",
      maxWidth: "685px",
      margin: "0px auto",
    },
    marginBottom: {
      marginBottom: "8px",
    },
  };

  function Spinner() {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  const interestList = ["Java", "Python", "C++", "Angular", "React", "C#"];
  function handleTagSel(selected) {
    const interest = selected;
    setForm({ ...form, interest });
  }
  return (
    // <Container sx={styles.container} disableGutters>
    <Paper
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
      elevation={3}
      style={styles.paper}
    >
      {uploading && <Spinner />}
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        padding={2}
        spacing={5}
      >
        <div>
          <Typography variant="h5">
            <strong>Edit Profile</strong>
          </Typography>
        </div>
      </Stack>
      <hr />
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        my={3}
      >
        <FirebaseCoverUpload
          previewProfile={previewProfile.urlCover}
          onFileSelect={handleCoverFileSelect}
          closePreview={handleCloseCoverPreview}
        />
      </Stack>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        my={3}
      >
        <FirebaseAvatarUpload
          previewProfile={previewProfile.urlAvatar}
          onFileSelect={handleAvatarFileSelect}
          closePreview={handleCloseAvatarPreview}
        />
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={styles.marginBottom}
      >
        <Tooltip
          title={errors.firstName}
          open={!!errors.firstName}
          placement="top-end"
          TransitionComponent={Zoom}
          arrow={true}
        >
          <TextField
            name="firstName"
            error={!!errors.firstName}
            onChange={handleChange}
            value={form.firstName}
            label="First Name"
            variant="filled"
            InputProps={{ disableUnderline: true }}
            sx={styles.myTextField}
            fullWidth
          />
        </Tooltip>
        <Tooltip
          title={errors.lastName}
          open={!!errors.lastName}
          placement="top-end"
          TransitionComponent={Zoom}
          arrow={true}
        >
          <TextField
            name="lastName"
            error={!!errors.lastName}
            onChange={handleChange}
            value={form.lastName}
            label="Last Name"
            variant="filled"
            InputProps={{ disableUnderline: true }}
            sx={styles.myTextField}
            fullWidth
          />
        </Tooltip>
      </Stack>
      <Tooltip
        title={errors.username}
        open={!!errors.username}
        placement="top-end"
        TransitionComponent={Zoom}
        arrow={true}
      >
        <TextField
          name="username"
          error={!!errors.username}
          onChange={handleChange}
          value={form.username}
          label="Username"
          variant="filled"
          InputProps={{ disableUnderline: true }}
          sx={[styles.myTextField, styles.marginBottom]}
          fullWidth
        />
      </Tooltip>
      <Tooltip
        title={errors.email}
        open={!!errors.email}
        placement="top-end"
        TransitionComponent={Zoom}
        arrow={true}
      >
        <TextField
          name="email"
          error={!!errors.email}
          onChange={handleChange}
          value={form.email}
          label="Email"
          variant="filled"
          InputProps={{ disableUnderline: true }}
          sx={[styles.myTextField, styles.marginBottom]}
          fullWidth
        />
      </Tooltip>
      <Tooltip
        title={errors.bio}
        open={!!errors.bio}
        placement="top-end"
        TransitionComponent={Zoom}
        arrow={true}
      >
        <TextField
          name="bio"
          error={!!errors.bio}
          onChange={handleChange}
          value={form.bio}
          label="Bio"
          variant="filled"
          InputProps={{ disableUnderline: true }}
          sx={[styles.myTextField, styles.marginBottom]}
          multiline
          rows={3}
          fullWidth
        />
      </Tooltip>
      <Autocomplete
        sx={styles.paddingRight}
        multiple
        options={interestList}
        onChange={(event, value) => handleTagSel(value)}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Interest"
            sx={[styles.myTextField, styles.marginBottom]}
            variant="filled"
            fullWidth
          />
        )}
        size="small"
        fullWidth
      />
      <Button
        disabled={isFormInvalid()}
        type="submit"
        variant="contained"
        fullWidth
      >
        Update
      </Button>
    </Paper>
    // </Container>
  );
};

export default EditProfileForm;
