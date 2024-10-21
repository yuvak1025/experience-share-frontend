import React, { useState } from 'react';
import { Box, Typography, Grid, Button, CircularProgress } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const AboutUs = () => {
  const [loading, setLoading] = useState(true); // Track image loading state
  const [error, setError] = useState(false); // Track image error state

  const handleImageLoad = () => {
    setLoading(false); // Set loading to false when image has loaded
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true); // Set error to true if the image fails to load
  };

  return (
    <Box sx={{ my: 5, textAlign: 'center', padding: '20px', backgroundColor: '#00000' }}>
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            {loading && (
              <CircularProgress
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#D32F2F',
                }}
              />
            )}
            {error ? (
              <Typography variant="body1" color="error">
                Failed to load image
              </Typography>
            ) : (
              <Box
                component="img"
                src="Eshwar.jpg" // Ensure the image path is correct
                alt="Eshwar Rachakonda"
                onLoad={handleImageLoad}
                onError={handleImageError}
                sx={{
                  display: loading ? 'none' : 'block', // Hide image while loading
                  borderRadius: '50%',
                  width: { xs: '250px', sm: '350px', md: '460px' }, // Responsive width
                  height: { xs: '250px', sm: '350px', md: '460px' }, // Responsive height
                  boxShadow: 3,
                  mb: 3,
                }}
              />
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2rem', sm: '2.5rem' }, // Responsive font size
              letterSpacing: '1px',
              color: '#D32F2F',
              textTransform: 'uppercase',
            }}
          >
            Eshwar Rachakonda
          </Typography>

          <Typography
            variant="body1"
            sx={{ my: 2, fontSize: { xs: '1rem', sm: '1.1rem' }, color: '#a02F2e' }}
          >
            Undergraduate from IIT Patna (2021-25).
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: '600',
              fontSize: { xs: '1.3rem', sm: '1.5rem' }, // Responsive font size
              color: '#D32F2F',
              mt: 4,
            }}
          >
            FOLLOW ON
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: '#0077B5',
                color: 'white',
                '&:hover': { backgroundColor: '#005582' },
                mr: 2,
                borderRadius: 10,
                fontSize: { xs: '0.8rem', sm: '1rem' }, // Responsive font size
              }}
              href="https://www.linkedin.com/in/eshwarr/"
              target="_blank"
              startIcon={<LinkedInIcon />}
            >
              LINKEDIN
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: '#333',
                color: 'white',
                '&:hover': { backgroundColor: '#1a1a1a' },
                borderRadius: 10,
                fontSize: { xs: '0.8rem', sm: '1rem' }, // Responsive font size
              }}
              href="https://github.com/eshwar0210"
              target="_blank"
              startIcon={<GitHubIcon />}
            >
              GITHUB
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
