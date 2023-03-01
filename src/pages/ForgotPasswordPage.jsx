import {
  Button,
  Paper,
  Stack,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
  Tooltip,
  Zoom,
} from "@mui/material";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appLogo from "../assets/logo.png";
import GlobalCSS from "../components/GlobalCSS";
import { PopupContext } from "../context/PopupContext";
import * as authService from "../services/auth";

export default function ForgotPasswordPage() {
  const { onShowSuccess, onShowFail } = useContext(PopupContext);
  const navigate = useNavigate();
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
  const [form, setForm] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
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
      if (error.details[0].message === '"email" must be a valid email') {
        setErrors({ ...errors, [input.name]: "Invalid email format." });
      } else {
        setErrors({ ...errors, [input.name]: "Please input your email" });
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // const response = await authService.forgotPassord(form.email);
    setLoading(true);
    await authService
      .forgotPassord(form.email)
      .then((res) => {
        setLoading(false);
        if (res.data) {
          onShowSuccess(
            "Password reset link was sent. Please check your email"
          );
          navigate("/login");
          //maybe add navigate to login
        }
      })
      .catch((err) => {
        //change to snackbar maybe or something
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
      {loading && <Spinner />}
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
          <strong>Forgot Password</strong>
        </Typography>
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
            sx={[styles.myTextField, { mb: "10px" }]}
            placeholder="Enter email"
            fullWidth
          />
        </Tooltip>
        <Button
          disabled={isFormInvalid()}
          variant="contained"
          size="medium"
          className="mt-3"
          fullWidth
          onClick={handleSubmit}
        >
          Continue
        </Button>
        <br />
        <Typography
          variant="body2"
          sx={{ textAlign: "center", marginTop: "10px" }}
        >
          <Link id="forgot" to="/login">
            Go back to Login
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}
