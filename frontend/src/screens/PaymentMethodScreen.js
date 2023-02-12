import { Box, Button, Typography } from "@mui/material";
import { Field, Formik, Form } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../component/CheckOutSteps";
import { Store } from "../context/Store";

function PaymentMethodScreen() {
  const navigate = useNavigate();

  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  React.useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  return (
    <React.Fragment>
      <CheckOutSteps state={2} />
      <Box sx={{ maxWidth: "300px", margin: "4rem auto" }}>
        <Typography sx={{ margin: "2rem auto" }}>Payment Method</Typography>
        <Formik
          initialValues={{
            paymentMethodName: "",
          }}
          onSubmit={(values) => {
            console.log(values.paymentMethodName);
            contextDispatch({
              type: "SAVE_PAYMENT_METHOD",
              payload: values.paymentMethodName,
            });
            localStorage.setItem("paymentMethod", values.paymentMethodName);
            navigate("/placeorder");
          }}
        >
          {({ values }) => (
            <Form>
              <label>
                <Field
                  type="radio"
                  id="Stripe"
                  name="paymentMethodName"
                  value="Stripe"
                  label="Stripe"
                />{" "}
                Stripe
              </label>
              <br />
              <label>
                <Field
                  type="radio"
                  id="Paypal"
                  name="paymentMethodName"
                  value="Paypal"
                  label="Paypal"
                />{" "}
                Paypal
              </label>
              <br />
              <br />
              <Button type="submit" variant="contained" color="warning">
                Continue
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </React.Fragment>
  );
}

export default PaymentMethodScreen;
