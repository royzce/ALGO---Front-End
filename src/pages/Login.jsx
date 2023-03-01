import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Typography,
  TextField,
  Tooltip,
  Zoom,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  Divider,
} from "@mui/material";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appLogo from "../assets/logo.png";
import GlobalCSS from "../components/GlobalCSS";
import { AuthContext } from "../context/AuthContext";
import { PopupContext } from "../context/PopupContext";
import { UserContext } from "../context/UserContext";
import * as authService from "../services/auth";
import * as userService from "../services/user";

export default function Login() {
  const { onShowFail } = useContext(PopupContext);
  const { setCurrentUser } = useContext(UserContext);
  const { handleLoggedIn } = useContext(AuthContext);

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
    passwordField: {
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
    paper: {
      borderRadius: "10px",
      padding: "30px",
      width: "425px",
      margin: "84px auto",
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
    await authService
      .login(form.username, form.password, rememberMe ? true : false)
      .then(async (res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        const result = await userService.getCurrentUser();
        console.log("result", result);
        // handleLoggedIn(true);
        setCurrentUser(result.data);
      })
      .catch((err) => {
        onShowFail(err.response.data.message);
      });
  };

  return (
    <Paper elevation={3} sx={styles.paper}>
      <img
        src={appLogo}
        className="rounded mx-auto d-block"
        style={{ height: "8vh", marginTop: "26px" }}
        alt="Algo app logo"
      />
      <Typography variant="h5" sx={{ textAlign: "center", margin: "26px 0" }}>
        <strong>Hi, Welcome to Algo</strong>
      </Typography>
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
          label="Email / Username"
          variant="filled"
          InputProps={{ disableUnderline: true }}
          sx={[styles.myTextField, { mb: "20px" }]}
          fullWidth
        />
      </Tooltip>
      <FormControl sx={{ width: "100%" }} variant="filled">
        <InputLabel
          htmlFor="filled-adornment-password"
          error={!!errors.password}
        >
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
            id="filled-adornment-password"
            name="password"
            error={!!errors.password}
            onChange={handleChange}
            value={form.password}
            type={passwordVisible ? "text" : "password"}
            disableUnderline={true}
            sx={styles.passwordField}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibility} edge="end">
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Tooltip>
      </FormControl>
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
          <Link id="forgot" to="/forgot-password" className="float-end">
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
      <Divider>
        <Button disabled>OR</Button>
      </Divider>
      <Button
        variant="contained"
        color="success"
        onClick={() => navigate("/register")}
        fullWidth
      >
        Create an account
      </Button>
    </Paper>
  );
}
