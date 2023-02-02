import { Box, styled } from "@mui/material";

const HomeScreenStyle = styled(Box)(({ theme }) => ({
    ".heading":{
        fontSize:"2rem",
        fontWeight:"bold",
        margin:"1rem",
    },
  ".products": {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  ".product": {
    margin: "1rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
  },
  ".productImage": {
    width: "250px",
    maxWidth: "100%",
    height: "350px",
  },
}));

export default HomeScreenStyle;
