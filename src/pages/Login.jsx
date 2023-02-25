import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appLogo from "../assets/logo.png";
import GlobalCSS from "../components/GlobalCSS";
import * as authService from "../services/auth";

export default function Login() {
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
    heading: {
      textAlign: "center",
      margin: "26px 0",
    },
  };
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const schema = Joi.object({
    username: Joi.string().min(1).required(),
    password: Joi.string().min(1).required(),
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
      setErrors({
        ...errors,
        [input.name]:
          input.name === "username"
            ? "Please input your email/username"
            : "Please input your password",
      });
    } else {
      delete errors[input.name];
      setErrors(errors);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleLogin = async () => {
    let response = await authService.login(form.username, form.password);
    if (rememberMe) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    console.log(response);
    // console.log(toekn);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        padding: "50px 0",
        backgroundColor: "rgb(238,242,246)",
        overflowY: "scroll",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: "12px",
          padding: "30px",
          minWidth: "425px",
          my: "auto",
          maxWidth: "425px",
        }}
      >
        <img
          src={appLogo}
          className="rounded mx-auto d-block"
          style={{ height: "8vh", marginTop: "26px" }}
          alt="Algo app logo"
        />
        <Typography variant="h5" sx={{ textAlign: "center", margin: "26px 0" }}>
          <strong>Hi, Welcome to Algo</strong>
        </Typography>
        <TextField
          name="username"
          error={!!errors.username}
          helperText={errors.username}
          onChange={handleChange}
          value={form.username}
          label="Email / Username"
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          spacing={0}
        >
          <FormControlLabel
            control={<Checkbox size="small" />}
            onChange={(e) => setRememberMe(e.target.checked)}
            label={<Typography variant="body2">Remember me</Typography>}
          />
          <Typography variant="body2">
            <Link id="forgot" to="#" className="float-end">
              Forgot password?
            </Link>
          </Typography>
        </Stack>
        <Button
          variant="contained"
          size="medium"
          className="mt-3"
          fullWidth
          onClick={handleLogin}
        >
          Log In
        </Button>
        <hr />
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/register")}
          fullWidth
        >
          Create an account
        </Button>
      </Paper>
    </div>
  );
}
