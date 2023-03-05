import {
  Button,
  Paper,
  Stack,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
  IconButton,
  FormControl,
  InputLabel,
  Tooltip,
  Zoom,
  FilledInput,
  InputAdornment,
  Container,
} from "@mui/material";
import Joi from "joi";
import React, { useContext, useEffect, useState } from "react";
import appLogo from "../assets/logo.png";
import * as authService from "../services/auth";
import { joiPasswordExtendCore } from "joi-password";
import { PopupContext } from "../context/PopupContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DarkModeContext } from "../context/DarkModeContext";
import { UserContext } from "../context/UserContext";

const joiPassword = Joi.extend(joiPasswordExtendCore);
export default function ChangePasswordPage() {
  const { onShowSuccess, onShowFail } = useContext(PopupContext);
  const { darkMode } = useContext(DarkModeContext);

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [errors, setErrors] = useState({});
  const schema = Joi.object({
    old_password: Joi.string().required(),
    new_password: joiPassword
      .string()
      .minOfSpecialCharacters(2)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .minOfSpecialCharacters(1)
      .noWhiteSpaces()
      .min(8)
      .required(),
    confirm_new_password: Joi.string().required().valid(form.new_password),
  });

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
      if (input.name === "confirm_new_password") {
        setErrors({
          ...errors,
          [input.name]: "Password mismatch.",
        });
      } else if (
        error.details[0].message === `"old_password" is not allowed to be empty`
      ) {
        setErrors({
          ...errors,
          [input.name]: "Please input your old password.",
        });
      } else if (
        error.details[0].message ===
          `"new_password" is not allowed to be empty` ||
        error.details[0].message.includes("should contain at least")
      ) {
        setErrors({
          ...errors,
          [input.name]:
            "Password requires lowercase, uppercase, number, and special character.",
        });
      } else if (error.details[0].message.includes('"new_password" length')) {
        setErrors({
          ...errors,
          [input.name]: "Password length must be at least 8 characters long.",
        });
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
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useContext(UserContext);
  const handleSubmit = async () => {
    setLoading(true);
    await authService
      .changePassword(form.old_password, form.new_password)
      .then(() => {
        setLoading(false);
        onShowSuccess("Password changed successfully!");
        localStorage.removeItem("accessToken");
        setCurrentUser(null);
      })
      .catch((err) => {
        setLoading(false);
        onShowFail(err.response.data.message);
      });
  };

  function Spinner() {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  const styles = {
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
      maxWidth: "425px",
      margin: " auto",
    },
    heading: {
      textAlign: "center",
      margin: "26px 0",
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
      <Paper elevation={3} sx={styles.paper}>
        {loading && <Spinner />}
        <img
          src={appLogo}
          className="rounded mx-auto d-block"
          style={{ height: "8vh", marginTop: "26px" }}
          alt="Algo app logo"
        />
        <Typography variant="h5" sx={{ textAlign: "center", margin: "26px 0" }}>
          <strong>Change Password</strong>
        </Typography>

        <FormControl sx={{ width: "100%", mb: "8px" }} variant="filled">
          <InputLabel htmlFor="old-pass-word" error={!!errors.old_password}>
            Old password
          </InputLabel>
          <Tooltip
            title={errors.old_password}
            open={!!errors.old_password}
            placement="top-end"
            TransitionComponent={Zoom}
            arrow={true}
            id="error-tooltip"
          >
            <FilledInput
              // id="filled-adornment-password"
              id="old-pass-word"
              name="old_password"
              error={!!errors.old_password}
              onChange={handleChange}
              value={form.old_password}
              type={oldPasswordVisible ? "text" : "password"}
              disableUnderline={true}
              sx={styles.passwordField}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                    edge="end"
                  >
                    {oldPasswordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Tooltip>
        </FormControl>
        <FormControl sx={{ width: "100%" }} variant="filled">
          <InputLabel htmlFor="new-pass-word" error={!!errors.new_password}>
            New password
          </InputLabel>
          <Tooltip
            title={errors.new_password}
            open={!!errors.new_password}
            placement="top-end"
            TransitionComponent={Zoom}
            arrow={true}
            id="error-tooltip"
          >
            <FilledInput
              // id="filled-adornment-password"
              id="new-pass-word"
              name="new_password"
              error={!!errors.new_password}
              onChange={handleChange}
              value={form.new_password}
              type={newPasswordVisible ? "text" : "password"}
              disableUnderline={true}
              sx={styles.passwordField}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                    edge="end"
                  >
                    {newPasswordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Tooltip>
        </FormControl>

        <FormControl
          sx={{ width: "100%", marginTop: "0.625rem" }}
          variant="filled"
        >
          <InputLabel
            htmlFor="confirm-new-pass-word"
            error={!!errors.confirm_new_password}
          >
            Confirm new password
          </InputLabel>
          <Tooltip
            title={errors.confirm_new_password}
            open={!!errors.confirm_new_password}
            placement="top-end"
            TransitionComponent={Zoom}
            arrow={true}
            id="error-tooltip"
          >
            <FilledInput
              // id="filled-adornment-password"
              id="confirm-new-pass-word"
              name="confirm_new_password"
              error={!!errors.confirm_new_password}
              onChange={handleChange}
              value={form.confirm_new_password}
              type={confirmNewPasswordVisible ? "text" : "password"}
              disableUnderline={true}
              sx={styles.passwordField}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setConfirmNewPasswordVisible(!confirmNewPasswordVisible)
                    }
                    edge="end"
                  >
                    {confirmNewPasswordVisible ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Tooltip>
        </FormControl>
        <Button
          disabled={isFormInvalid()}
          variant="contained"
          size="medium"
          className="mt-3"
          fullWidth
          onClick={handleSubmit}
        >
          Change Password
        </Button>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          spacing={0}
        ></Stack>
      </Paper>
    </Container>
  );
}
