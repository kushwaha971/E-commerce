import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { Store } from "../context/Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

function SignUpScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectURL = new URLSearchParams(search).get("redirect");
  const redirect = redirectURL ? redirectURL : "/";

  const { state, dispatch: contextDispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Box sx={{ maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h4" sx={{ margin: "1rem" }}>
        Sign In
      </Typography>
      <Box sx={{ margin: "20px", dispaly: "flex", justifyContent: "center" }}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (values) => {
            try {
              const { data } = await axios.post("api/users/signin", {
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword: values.password,
              });
              contextDispatch({ type: "USER_SIGNIN", payload: data });
              localStorage.setItem("userInfo", JSON.stringify(data));
              navigate(redirect || "/");
            } catch (err) {
              toast.error(getError(err));
            }
          }}
        >
          {(values) => (
            <Form>
              <Typography>
                <span style={{ color: "red" }}>*</span>Full Name:
              </Typography>

              <Field
                name="name"
                type="text"
                varaint="Outlined"
                placeholder="Full Name"
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  margin: "8px 0",
                  display: "inline-block",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  boxSizing: "border-box",
                }}
              />
              <Typography>
                <span style={{ color: "red" }}>*</span>E-mail:
              </Typography>

              <Field
                name="email"
                type="email"
                varaint="Outlined"
                placeholder="Enter email"
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  margin: "8px 0",
                  display: "inline-block",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  boxSizing: "border-box",
                }}
              />
              <Typography>
                <span style={{ color: "red" }}>*</span>Password:
              </Typography>

              <Field
                name="password"
                type="password"
                varaint="Outlined"
                placeholder="Enter password"
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  display: "inline-block",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  boxSizing: "border-box",
                }}
              />
              <Typography>
                <span style={{ color: "red" }}>*</span>Confirm Password:
              </Typography>

              <Field
                name="password"
                type="password"
                varaint="Outlined"
                placeholder="Re-enter password"
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  display: "inline-block",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  boxSizing: "border-box",
                }}
              />

              <Button
                variant="contained"
                color="warning"
                type="submit"
                sx={{ textTransform: "capitalize" }}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <Typography sx={{ margin: "0.5rem 0" }}>
          Already have account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sing In</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default SignUpScreen;
