import { Box, CssBaseline, Typography, Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "90vh",
      }}
    >
      <CssBaseline />

      <Container sx={{ flexGrow: 1 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Lora",
            fontWeight: "bold",
            textAlign: "center",
            color: "#808080",
            mt: 2, // Used shorthand for margin-top
          }}
        >
          F.A.M.A.P
        </Typography>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
