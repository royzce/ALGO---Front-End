import {
  Backdrop,
  Button,
  Container,
  Divider,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Zoom,
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
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
    confirmPassword: "",
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
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .minOfSpecialCharacters(1)
      .noWhiteSpaces()
      .min(8)
      .required(),
    confirmPassword: Joi.string().required().valid(form.password),
    avatar: Joi.string().allow(null, ""),
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    if (selectedFile) {
      const storageUrl = await handleUpload();
      form.avatar = storageUrl;
    }
    const { confirmPassword, ...newUserInfo } = form;
    userService
      .register(newUserInfo)
      .then(() => {
        setOpen(false);
        onShowSuccess("You are now registered.");
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
      } else if (input.name === "confirmPassword") {
        setErrors({ ...errors, [input.name]: "Password mismatch." });
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
        console.log("callded");
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
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);

  const [open, setOpen] = useState(false);

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
    passwordField: {
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
    paper: {
      borderRadius: "10px",
      padding: "30px",
      maxWidth: "685px",
      margin: "auto",
    },
    marginBottom: {
      marginBottom: "8px",
    },
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      py: "16px",
      overflowY: "auto",
    },
  };

  return (
    <Container sx={styles.container}>
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

        <FormControl sx={{ width: "100%" }} variant="filled">
          <InputLabel htmlFor="pass-word" error={!!errors.password}>
            Password
          </InputLabel>
          <Tooltip
            title={errors.password}
            open={!!errors.password}
            placement="top-end"
            TransitionComponent={Zoom}
            arrow={true}
            id="error-tooltip"
          >
            <FilledInput
              id="pass-word"
              name="password"
              error={!!errors.password}
              onChange={handleChange}
              value={form.password}
              type={passwordVisible ? "text" : "password"}
              disableUnderline={true}
              sx={[styles.passwordField, styles.marginBottom]}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    edge="end"
                  >
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Tooltip>
        </FormControl>
        <FormControl sx={{ width: "100%" }} variant="filled">
          <InputLabel
            htmlFor="confirm-pass-word"
            error={!!errors.confirmPassword}
          >
            Confirm password
          </InputLabel>
          <Tooltip
            title={errors.confirmPassword}
            open={!!errors.confirmPassword}
            placement="top-end"
            TransitionComponent={Zoom}
            arrow={true}
            id="error-tooltip"
          >
            <FilledInput
              id="confirm-pass-word"
              name="confirmPassword"
              error={!!errors.confirmPassword}
              onChange={handleChange}
              value={form.confirmPassword}
              type={confPasswordVisible ? "text" : "password"}
              disableUnderline={true}
              sx={[styles.passwordField, styles.mb20]}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setConfPasswordVisible(!confPasswordVisible)}
                    edge="end"
                  >
                    {confPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Tooltip>
        </FormControl>
        <Button
          disabled={isFormInvalid()}
          type="submit"
          variant="contained"
          fullWidth
        >
          Sign Up
        </Button>
        <Divider sx={{ my: "10px" }}>
          <Button disabled>OR</Button>
        </Divider>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          <Link to="/login">Already have an account?</Link>
        </Typography>
      </Paper>
    </Container>
  );
};
export default RegisterPage;
