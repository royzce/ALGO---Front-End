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
} from "@mui/material";
import Joi from "joi";
import React, { useContext, useEffect, useState } from "react";
import appLogo from "../assets/logo.png";
import * as authService from "../services/auth";
import { joiPasswordExtendCore } from "joi-password";
import { PopupContext } from "../context/PopupContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DarkModeContext } from "../context/DarkModeContext";

const joiPassword = Joi.extend(joiPasswordExtendCore);
export default function ChangePasswordPage() {
  const { onShowSuccess, onShowFail } = useContext(PopupContext);
  const { darkMode } = useContext(DarkModeContext);
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
      borderRadius: "12px",
      padding: "30px",
      minWidth: "425px",
      margin: "84px auto",
      width: "425px",
      backgroundColor: darkMode && "rgb(37,37,37)",
    },
    heading: {
      textAlign: "center",
      margin: "26px 0",
    },
  };
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
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
      if (
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await authService
      .changePassword(form.old_password, form.new_password)
      .then(() => {
        setLoading(false);
        onShowSuccess("Password changed successfully!");
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

  return (
    <Paper elevation={0} sx={styles.paper}>
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

      <FormControl sx={{ width: "100%" }} variant="filled">
        <InputLabel htmlFor="old-pass-word" error={!!errors.old_password}>
          Old Password
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
      <hr style={{ visibility: "hidden" }} />
      <FormControl sx={{ width: "100%" }} variant="filled">
        <InputLabel htmlFor="new-pass-word" error={!!errors.new_password}>
          New Password
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
  );
}
