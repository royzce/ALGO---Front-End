import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import FirebaseProfileUpload from "../components/FirebaseProfileUpload";
import { RegisterContext } from "../context/RegisterContext";

const joiPassword = Joi.extend(joiPasswordExtendCore);
const RegisterPage = () => {
  const { uploading, handleUpload, selectedFile, previewUrl } =
    useContext(RegisterContext);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
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
    avatar: Joi.string().allow(null, ""),
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const storageUrl = await handleUpload();
    if (selectedFile) {
      console.log("preview url", previewUrl);
      console.log("may seledted", storageUrl);
      form.avatar = storageUrl;
    }
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

  return (
    <Grid
      container
      component="form"
      justifyContent="center"
      onSubmit={handleSubmit}
    >
      <Grid item xs={6}>
        <Card>
          <CardHeader title="Register" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FirebaseProfileUpload />
                <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                  Choose Avatar (Optional)
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="firstname"
                  error={!!errors.firstname}
                  helperText={errors.firstname}
                  onChange={handleChange}
                  value={form.firstname}
                  label="First Name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastname"
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                  onChange={handleChange}
                  value={form.lastname}
                  label="Last Name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  error={!!errors.username}
                  helperText={errors.username}
                  onChange={handleChange}
                  value={form.username}
                  label="Username"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  error={!!errors.email}
                  helperText={errors.email}
                  onChange={handleChange}
                  value={form.email}
                  label="Email"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  error={!!errors.password}
                  helperText={errors.password}
                  onChange={handleChange}
                  value={form.password}
                  type="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button disabled={isFormInvalid()} type="submit" fullWidth>
              Sign Up
            </Button>
          </CardActions>
        </Card>
      </Grid>
      {uploading && <Spinner />}
    </Grid>
  );
};
function Spinner() {
  return <div className="spinner">Loading...</div>;
}
export default RegisterPage;
