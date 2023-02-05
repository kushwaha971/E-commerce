import { Box, Button, FormGroup, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function SignInScreen() {
    const {search } = useLocation();
    const redirectURL = new URLSearchParams(search).get('redirect');
    const redirect = redirectURL ? redirectURL : "/" ;
  return (
    <Box sx={{ maxWidth: "600px"}}>
      <Typography variant="h4">Sign In</Typography>
      <Box sx={{ margin: "20px",dispaly: 'flex',justifyContent:'center'  }}>
        <form>
          <FormGroup>
            <label htmlFor="email">E-mail</label>
            <TextField id="email" type="email" fullWidth required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <TextField id="password" type="password" fullWidth required />
          </FormGroup>
          <div>
            <Button variant='contained' sx={{textTransform:'capitalize',margin: '5px'}}>Sign In</Button>
          </div>
        </form>
        <Typography>New User? {' '} <Link to={`/signup?redirect=${redirect}`}>Create your account</Link></Typography>
      </Box>
    </Box>
  );
}

export default SignInScreen;
