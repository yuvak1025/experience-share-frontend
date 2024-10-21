import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ContactUs = () => {
  // State variables for form inputs and validation
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation regex
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!regex.test(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    const contactData = {
      firstName,
      lastName,
      email,
      message,
    };

    try {
      const response = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        // Clear form fields after successful submission
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        my: 5,
        padding: { xs: '20px', sm: '40px' },
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
        Get in <span style={{ color: '#D32F2F' }}>touch</span>
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4 }}>
        Please fill out the form below to report a bug, share your experience, or ask any questions.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            variant="outlined"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Invalid email address" : ""}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            placeholder="Report a bug, share your experience, or any issues..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#D32F2F',
          color: 'white',
          '&:hover': { backgroundColor: '#3f51b5' },
          mt: 2,
          width: '100%',
        }}
      >
        Send
      </Button>
    </Box>
  );
};

export default ContactUs;
