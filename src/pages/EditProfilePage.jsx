import React, { useContext, useState } from "react";
import { PopupContext } from "../context/PopupContext";
import { RegisterContext } from "../context/RegisterContext";
import { useNavigate } from "react-router";
import Joi from "joi";
import * as userService from "../services/user";
import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { Stack } from "@mui/system";
import FirebaseProfileUpload from "../components/FirebaseProfileUpload";

const EditProfilePage = ({ profileData }) => {
  console.log("Inside Edit Profile Page", profileData);
  const { onShowSuccess, onShowFail } = useContext(PopupContext);
  const { uploading, handleUpload, selectedFile, closePreview } =
    useContext(RegisterContext);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(
    profileData || {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    }
  );
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const schema = Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    username: Joi.string().min(5).max(15).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
    avatar: Joi.string().allow(null, ""),
    cover: Joi.string().allow(null, ""),
    bio: Joi.string().allow(null, ""),
    interest: Joi.string().allow(null, ""),
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    // handleToggle();
    setOpen(true);
    if (selectedFile) {
      const storageUrl = await handleUpload();
      form.avatar = storageUrl;
      form.cover = storageUrl;
    }
    userService
      .editProfile(form)
      .then(() => {
        setOpen(false);
        onShowSuccess("successfully Registerd");
        closePreview();
        navigate("/login");
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
        backgroundColor: "rgb(248, 250,252)",
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
      minWidth: "425px",
      maxWidth: "685px",
      margin: "70px auto",
    },
    mb20: {
      marginBottom: "20px",
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

  return (
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
        <FirebaseProfileUpload />
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={styles.mb20}
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
          sx={[styles.myTextField, styles.mb20]}
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
          sx={[styles.myTextField, styles.mb20]}
          fullWidth
        />
      </Tooltip>
      <Button
        disabled={isFormInvalid()}
        type="submit"
        variant="contained"
        fullWidth
      >
        Update
      </Button>
    </Paper>
  );
};

export default EditProfilePage;
