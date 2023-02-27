import {
  Backdrop,
  Button,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import FirebaseProfileUpload from "../components/FirebaseProfileUpload";
import { RegisterContext } from "../context/RegisterContext";
import appLogo from "../assets/logo.png";
import GlobalCSS from "../components/GlobalCSS";
import * as userService from "../services/user";
import { PopupContext } from "../context/PopupContext";

const joiPassword = Joi.extend(joiPasswordExtendCore);
const RegisterPage = () => {
  const { onShowSuccess, onShowFail } = useContext(PopupContext);
  const { uploading, handleUpload, selectedFile, closePreview } =
    useContext(RegisterContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const schema = Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    username: Joi.string().min(5).max(15).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(2)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .minOfSpecialCharacters(1)
      .noWhiteSpaces()
      .min(8)
      .required(),
    avatar: Joi.string().allow(null, ""),
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    // handleToggle();
    setOpen(true);
    if (selectedFile) {
      const storageUrl = await handleUpload();
      form.avatar = storageUrl;
    }

    userService
      .register(form)
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
      if (input.name === "password") {
        if (
          error.details[0].message ===
            `"password" is not allowed to be empty` ||
          error.details[0].message.includes("should contain at least")
        ) {
          setErrors({
            ...errors,
            [input.name]:
              "Password requires lowercase, uppercase, number, and special character.",
          });
        } else {
          setErrors({ ...errors, [input.name]: error.details[0].message });
        }
      } else if (
        error.details[0].message === `"${input.name}" must be a valid email`
      ) {
        setErrors({
          ...errors,
          [input.name]:
            "Invalid email format. Please provide a valid email address.",
        });
      } else if (
        error.details[0].message ===
        `"${input.name}" is not allowed to be empty`
      ) {
        switch (input.name) {
          case "firstName":
            setErrors({
              ...errors,
              [input.name]: "Please input your First Name",
            });
            break;
          case "lastName":
            setErrors({
              ...errors,
              [input.name]: "Please input your Last Name",
            });
            break;
          case "username":
            setErrors({
              ...errors,
              [input.name]: "Please input your username",
            });
            break;
          case "email":
            setErrors({ ...errors, [input.name]: "Please input your email" });
            break;
          default:
            setErrors({ ...errors, [input.name]: error.details[0].message });
        }
      } else {
        setErrors({ ...errors, [input.name]: error.details[0].message });
      }
    } else {
      delete errors[input.name];
      setErrors(errors);
    }
  };
  const isFormInvalid = () => {
    const result = schema.validate(form);

    return !!result.error;
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
  };

  const [open, setOpen] = useState(false);

  // const handleToggle = () => {
  //   setOpen(!open);
  // };

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
      elevation={0}
      style={styles.paper}
    >
      <GlobalCSS />
      {uploading && <Spinner />}
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        padding={2}
        spacing={5}
      >
        <img
          src={appLogo}
          style={{
            height: "50px",
          }}
          alt="Algo app logo"
        />
        <div>
          <Typography variant="h5">
            <strong>Sign Up</strong>
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Enter your credentials to join the ALGO Community.
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
        sx={{ mb: "10px" }}
      >
        <TextField
          name="firstName"
          error={!!errors.firstName}
          helperText={errors.firstName}
          onChange={handleChange}
          value={form.firstName}
          label="First Name"
          variant="filled"
          InputProps={{ disableUnderline: true }}
          sx={styles.myTextField}
          fullWidth
        />
        <TextField
          name="lastName"
          error={!!errors.lastName}
          helperText={errors.lastName}
          onChange={handleChange}
          value={form.lastName}
          label="Last Name"
          variant="filled"
          InputProps={{ disableUnderline: true }}
          sx={styles.myTextField}
          fullWidth
        />
      </Stack>
      <TextField
        name="username"
        error={!!errors.username}
        helperText={errors.username}
        onChange={handleChange}
        value={form.username}
        label="Username"
        variant="filled"
        InputProps={{ disableUnderline: true }}
        sx={[styles.myTextField, { mb: "10px" }]}
        fullWidth
      />
      <TextField
        name="email"
        error={!!errors.email}
        helperText={errors.email}
        onChange={handleChange}
        value={form.email}
        label="Email"
        variant="filled"
        InputProps={{ disableUnderline: true }}
        sx={[styles.myTextField, { mb: "10px" }]}
        fullWidth
      />
      <IconButton
        size="small"
        className="text-secondary bg-transparent float-end border-0"
        onClick={handlePasswordVisibility}
        sx={[
          passwordVisible ? { marginRight: "14px" } : { marginRight: "15px" },
          { zIndex: 3, mt: "16px" },
        ]}
      >
        <i
          className={
            passwordVisible ? "fa-solid fa-eye-slash" : "fa-solid fa-eye" // font awesome icon
          }
        />
      </IconButton>
      <TextField
        id="pass-word"
        name="password"
        error={!!errors.password}
        helperText={errors.password}
        onChange={handleChange}
        value={form.password}
        type={passwordVisible ? "text" : "password"}
        label="Password"
        variant="filled"
        InputProps={{ disableUnderline: true }}
        sx={[styles.myTextField, { mb: "10px", mt: "-44px" }]}
        fullWidth
      />
      <Button
        disabled={isFormInvalid()}
        type="submit"
        variant="contained"
        fullWidth
      >
        Sign Up
      </Button>
      <hr />
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        <Link to="/login">Already have an account?</Link>
      </Typography>
    </Paper>
  );
};
export default RegisterPage;
