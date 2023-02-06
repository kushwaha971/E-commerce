import { Box, Button, FormGroup, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function SignInScreen() {
  const { search } = useLocation();
  const redirectURL = new URLSearchParams(search).get("redirect");
  const redirect = redirectURL ? redirectURL : "/";
  return (
    <Box 
  sx={{ maxWidth: "600px",margin: 'auto' }}
 
   
  >
      <Typography variant="h4" 
      sx={{margin: '1rem'}}
      >Sign In</Typography>
      <Box sx={{ margin: "20px", dispaly: "flex", justifyContent: "center" }}>
        <form>
          <FormGroup sx={{ margin: "0.5rem 0px" }}>
            <label htmlFor="email">
              <span style={{ color: "red" }}>*</span>E-mail
            </label>

            <TextField id="email" type="email" fullWidth required />
          </FormGroup>
          <FormGroup sx={{ margin: "0.5rem 0px" }}>
            <label htmlFor="password">
              <span style={{ color: "red" }}>*</span>Password
            </label>
            <TextField id="password" type="password" fullWidth required />
          </FormGroup>
          <div>
            <Button
              variant="contained"
              color="warning"
              sx={{ textTransform: "capitalize", margin: "0.5rem 0" }}
            >
              Sign In
            </Button>
          </div>
        </form>
        <Typography sx={{ margin: "0.5rem 0" }}>
          New User?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default SignInScreen;
