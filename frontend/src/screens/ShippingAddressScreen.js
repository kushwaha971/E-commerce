import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Store } from "../context/Store";
import CheckOutSteps from "../component/CheckOutSteps";

function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  });
  return (
    <React.Fragment>
      <CheckOutSteps state={1} />
      <Box sx={{ maxWidth: "600px", margin: "auto" }}>
        <Box sx={{ margin: "20px", dispaly: "flex", justifyContent: "center" }}>
          <Formik
            initialValues={{
              name: shippingAddress.name || "",
              address: shippingAddress.address || "",
              city: shippingAddress.city || "",
              postal: shippingAddress.postal || "",
            }}
            onSubmit={(values) => {
              const data = {
                name: values.name,
                address: values.address,
                city: values.city,
                postal: values.postal,
              };
              console.log(data);
              contextDispatch({ type: "USER_SIGNIN", payload: data });

              localStorage.setItem("shippingAddress", JSON.stringify(data));
              navigate("/payment");
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
                  placeholder="Enter full name"
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
                  <span style={{ color: "red" }}>*</span>Address:
                </Typography>

                <Field
                  name="address"
                  type="text"
                  varaint="Outlined"
                  placeholder="Enter Address"
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
                  <span style={{ color: "red" }}>*</span>City:
                </Typography>

                <Field
                  name="city"
                  type="text"
                  varaint="Outlined"
                  placeholder="City"
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
                  <span style={{ color: "red" }}>*</span>Postal Code:
                </Typography>

                <Field
                  name="postal"
                  type="text"
                  varaint="Outlined"
                  placeholder="Postal Code"
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
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default ShippingAddressScreen;
