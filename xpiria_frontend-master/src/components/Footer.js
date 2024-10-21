// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bottom: 0,
        mt: 'auto',
        width: '100%',
        py: 2,
        textAlign: 'center',
        backgroundColor: '#D32F2F',
        color: 'white',
        height: '120px',
      }}
    >
      <Typography variant="body2" sx={{ marginTop: '15px' }}>
        © {new Date().getFullYear()} Xpiria. All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ marginTop: '5px' }}>
        Designed with <span role="img" aria-label="heart">🤍</span> by Eshwar
      </Typography>
      <Typography variant="body2" sx={{ marginTop: '5px', fontSize: '14px' }}>
        <a href="https://brandfetch.com" style={{ color: 'white', textDecoration: 'underline' }}>
          Logos by Brandfetch
        </a>
      </Typography>
      <Typography variant="body2" sx={{ marginTop: '5px', fontSize: '14px' }}>
        Special thanks to Brandfetch 🌟
      </Typography>
    </Box>
  );
};

export default Footer;
