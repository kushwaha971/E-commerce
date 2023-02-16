import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  // useMediaQuery,
  // useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../context/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UserMenu from "./UserMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import MenuIcon from "@mui/icons-material/Menu";

function NavigationBar() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const [value, setValue] = React.useState("cart");
  const { cart, userInfo } = state;
  // const theme = useTheme();
  // const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const SignOutHandler = () => {
    contextDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  const [menu, setMenu] = React.useState(null);
  const handleOpenMenu = (e) => setMenu(e.currentTarget);
  const handleCloseMenu = () => setMenu(false);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ background: "black" }}>
          <Toolbar>
            <IconButton sx={{ color: "white" }} component={Link} to="/">
              LOGO
            </IconButton>

            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab
                  value="cart"
                  label={
                    <Link to="/cart">
                      <Stack aria-label="cart">
                        <Badge
                          badgeContent={cart.cartItems.reduce(
                            (acc, curr) => acc + curr.quantity,
                            0
                          )}
                          color="secondary"
                        >
                          <ShoppingCartIcon sx={{ color: "white" }} />
                        </Badge>
                      </Stack>
                    </Link>
                  }
                />
                <Tab
                  value="userProfile"
                  label={
                    userInfo ? (
                      <>
                        <Typography
                          id="basic-button"
                          onClick={handleOpenMenu}
                          sx={{ color: "white" }}
                        >
                          {userInfo.name}{" "}
                          <KeyboardArrowDownIcon
                            sx={{
                              verticalAlign: "middle",
                              marginLeft: "-8px",
                            }}
                          />
                        </Typography>{" "}
                        <UserMenu
                          menu={menu}
                          handleCloseMenu={handleCloseMenu}
                          SignOutHandler={SignOutHandler}
                        />
                      </>
                    ) : (
                      <Button
                        component={Link}
                        to="/signin"
                        variant="contained"
                        color="warning"
                        sx={{ color: "white", textTransform: "capitalize" }}
                      >
                        Sign In
                      </Button>
                    )
                  }
                />
              </Tabs>
            </>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
}

export default NavigationBar;
