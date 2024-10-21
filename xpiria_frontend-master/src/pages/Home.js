import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  const statements = [
    "Top tech companies actively recruit throught out the year for software roles.",
    "Data Science and AI are the highest-paying fields in technology.",
    "Amazon, Microsoft, and Google are top recruiters in Indian placements.",
    "Competitive programming can boost your placement prospects.",
    "Full-stack development is gaining popularity among employers.",
    "IIT graduates consistently land roles at MAANG companies."
  ];

  const [currentStatement, setCurrentStatement] = useState(statements[0]);
  const [strike, setStrike] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStrike(true);
      setTimeout(() => {
        setStrike(false);
        const nextStatement = statements[Math.floor(Math.random() * statements.length)];
        setCurrentStatement(nextStatement);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  });

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      {/* Image */}
      <img 
        src="Placements.jpg" 
        alt="Placement_logo" 
        style={{ width: '100%', maxHeight: '540px', objectFit: 'contain' }} 
      />

      {/* Statement Section */}
      <Box 
        sx={{ 
          mt: 3, 
          p: 2, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '150px', 
          backgroundColor: '#0000',
          flexDirection: 'column',
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, 
            color: '#D32F2F',
            textAlign: 'center',
            textDecoration: strike ? 'line-through' : 'none',
            transition: 'text-decoration 0.5s ease-in-out'
          }}
        >
          {currentStatement}
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
