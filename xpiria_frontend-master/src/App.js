import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Home from './pages/Home';
import Internships from './pages/Internships';
import Placements from './pages/Placements';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import CompanyDetail from './pages/CompanyDetail';
import StudentCard from './pages/StudentCard';
import ForumIcon from '@mui/icons-material/Forum';
import ShareExperience from './pages/ShareExperience';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle drawer opening and closing
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Menu items
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Internships', path: '/internships' },
    { label: 'Placements', path: '/placements' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'EXPRESS', path: '/share-experience', icon: <ForumIcon /> }
  ];

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* AppBar for the Navbar */}
        <AppBar position="static" sx={{ backgroundColor: '#D32F2F'  }}>
          <Toolbar sx={{ paddingY: 4 }}>
            {/* Hamburger icon for mobile */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Drawer for small screens */}
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                <List>
                  {menuItems.map((item, index) => (
                    <ListItem button component="a" href={item.path} key={index}>
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>

            {/* Logo button (remains visible on all screen sizes) */}
            <Button
              color="inherit"
              href="/"
              sx={{
                flexGrow: 1,
                fontSize: 24,
                fontFamily: 'Arial, sans-serif',
                display: { xs: 'block', md: 'block' },
              }}
            >
              Xpiria
            </Button>

            {/* Navbar buttons (hidden on small screens) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {menuItems.map((item, index) => (
                <Button color="inherit" href={item.path} sx={{ fontSize: 18, px: 3 }} key={index}>
                {item.icon} 
                  { item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main container */}
        <Container sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/student/:id" element={<StudentCard />} />
            <Route path="/share-experience" element={<ShareExperience />} /> 
          </Routes>
        </Container>

        {/* Footer */}
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
