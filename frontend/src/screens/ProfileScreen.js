import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useContext, useReducer } from "react";
import { toast } from "react-toastify";
import { Store } from "../context/Store";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, };
    case "UPDATE_SUCCESS":
      return { ...state,  };
    case "UPDATE_FAIL":
      return { ...state, };

    default:
      return state;
  }
};

function ProfileScreen() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { userInfo } = state;

  const [, dispatch] = useReducer(reducer, {
    
  });
  return (
    <Box sx={{ maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h4" sx={{ margin: "1rem" }}>
        User Profile
      </Typography>
      <Box sx={{ margin: "20px", dispaly: "flex", justifyContent: "center" }}>
        <Formik
          initialValues={{
            name: userInfo.name,
            email: userInfo.email,
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (values) => {
            if (values.password !== values.confirmPassword) {
              toast.error("Password does not match");
              return;
            }

            try {
              const { data } = await axios.put(
                "api/users/profile",
                {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                },
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
              );
              dispatch({ type: "UPDATE_SUCCESS" });
              contextDispatch({ type: "USER_SIGN", payload: data });
              localStorage.setItem("userInfo", JSON.stringify(data));
              toast.success("User  Updated SUccessfully");
            } catch (err) {
              dispatch({ type: "FETCH_FAIL" });
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
                name="confirmPassword"
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
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default ProfileScreen;
