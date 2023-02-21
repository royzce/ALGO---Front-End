import {
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import appLogo from "../assets/logo.png";
import { Link } from "react-router-dom";

const joiPassword = Joi.extend(joiPasswordExtendCore);
const RegisterPage = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    // photoscr:""
  });
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    firstname: Joi.string().max(50).required(),
    lastname: Joi.string().max(50).required(),
    username: Joi.string().min(5).max(15).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(2)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .minOfSpecialCharacters(1)
      .noWhiteSpaces()
      .min(6)
      .required(),
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
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
      setErrors({ ...errors, [input.name]: error.details[0].message });
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
        borderRadius: "12px",
        "&:hover": {
          backgroundColor: "transparent",
        },
        "&.Mui-focused": {
          backgroundColor: "transparent",
        },
      },
    },
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        padding: "50px 0",
        backgroundColor: "rgb(238,242,246)",
      }}
    >
      <Paper
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          borderRadius: "12px",
          padding: "30px",
          minWidth: "425px",
          maxWidth: "685px",
          my: "auto",
        }}
      >
        <img
          src={appLogo}
          className="rounded mx-auto d-block"
          style={{ height: "8vh", marginTop: "26px" }}
          alt="Algo app logo"
        />
        <Typography variant="h5" sx={{ textAlign: "center", margin: "26px 0" }}>
          <strong>Sign Up</strong>
        </Typography>
        <Typography
          className="text-secondary mb-4"
          variant="body2"
          sx={{ textAlign: "center", mt: "15px" }}
        >
          Enter your credentials to join the ALGO community
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ mb: "10px" }}
        >
          <TextField
            name="firstname"
            error={!!errors.firstname}
            helperText={errors.firstname}
            onChange={handleChange}
            value={form.firstname}
            label="First Name"
            variant="filled"
            InputProps={{ disableUnderline: true }}
            sx={styles.myTextField}
            fullWidth
          />
          <TextField
            name="lastname"
            error={!!errors.lastname}
            helperText={errors.lastname}
            onChange={handleChange}
            value={form.lastname}
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
    </div>
  );
};

export default RegisterPage;
