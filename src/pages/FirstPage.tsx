import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);

  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (user.name && user.phoneNumber && user.email) {
      localStorage.setItem("userDetails", JSON.stringify(user));
      navigate("/second-page");
    } else {
      setMessage("Please enter your details before submitting.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Please enter your details to proceed.
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                value={user.name}
                onChange={handleChange}
                fullWidth
                sx={{ borderRadius: 8 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                value={user.phoneNumber}
                onChange={handleChange}
                fullWidth
                sx={{ borderRadius: 8 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                value={user.email}
                onChange={handleChange}
                fullWidth
                sx={{ borderRadius: 8 }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ borderRadius: 12 }}
          >
            Submit
          </Button>
        </Box>
        {message && (
          <Box sx={{ mt: 2 }}>
            <Typography color="error" sx={{ fontWeight: "bold" }}>
              {message}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Form;
