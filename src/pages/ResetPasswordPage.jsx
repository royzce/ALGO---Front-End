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
import GlobalCSS from "../components/GlobalCSS";
import * as authService from "../services/auth";
import { joiPasswordExtendCore } from "joi-password";
import { useNavigate, useParams } from "react-router-dom";
import { PopupContext } from "../context/PopupContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const joiPassword = Joi.extend(joiPasswordExtendCore);
export default function ResetPasswordPage() {
  const { token } = useParams();
  const { onShowSuccess, onShowFail } = useContext(PopupContext);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      setLoading(false);
      await authService
        .resetPassword(token)
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          //change to snackbar maybe or whatever
          onShowFail(err.response.data.message);
        });
    }
    fetchData();
  }, []);
  const styles = {
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
      borderRadius: "12px",
      padding: "30px",
      minWidth: "425px",
      margin: "84px auto",
      width: "425px",
    },
    heading: {
      textAlign: "center",
      margin: "26px 0",
    },
  };
  const [form, setForm] = useState({
    password: "",
  });
  const [errors, setErrors] = useState({});
  const schema = Joi.object({
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
        error.details[0].message === `"password" is not allowed to be empty` ||
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // const response = await authService.forgotPassord(form.email);
    setLoading(true);
    await authService
      .resetPassword(token, form.password)
      .then((res) => {
        setLoading(false);
        //snackbar or something

        onShowSuccess(res.data.ResetPasswordResponse);
        //then navigate to login
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        //snackbar or something
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
        <strong>Please enter new password</strong>
      </Typography>

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
            // id="filled-adornment-password"
            id="pass-word"
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
