import { Divider, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function UserMenu(props) {
  const { menu, handleCloseMenu, SignOutHandler } = props;

  return (
    <React.Fragment>
      {" "}
      <Menu anchorEl={menu} open={Boolean(menu)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu} component={Link} to="/userprofile">
          User Profile
        </MenuItem>
        <MenuItem
          onClick={handleCloseMenu}
          component={Link}
          to="/order-history"
        >
          Order History
        </MenuItem>
        <Divider />
        <MenuItem onClick={SignOutHandler}>Sign Out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default UserMenu;
