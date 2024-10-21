import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button , CircularProgress} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const CompanyDetail = () => {
    const { id } = useParams(); // Get the company ID from the URL
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [companyLogo, setCompanyLogo] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCompanyData = async () => {
            const response = await fetch(`${BASE_URL}/company/${id}`);
            const data = await response.json();
            setCompanyName(data.name);
            setStudents(data.students);
            setCompanyLogo(data.logo_url); // Assuming logo URL is part of the company data
            setLoading(false);
        };

        fetchCompanyData();
    }, [id]);


    const handleViewDetails = (studentId) => {
        navigate(`/student/${studentId}`); // Use navigate to change the route
    };


    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh' // Full viewport height to center vertically
                }}
            >
                <CircularProgress  sx={{ color: '#D32F2F' }} />
            </Box>
        );
    }


    return (
        <Box sx={{ my: 5, padding: '20px', backgroundColor: '#0000', width: '100%' }}>

            <Grid container spacing={4}>
                {students.map((student, index) => (


                    <Grid
                        item
                        xs={12} // Full-width on extra small screens
                        sm={6}  // Two cards per row on small screens
                        md={6}  // Two cards per row on medium screens
                        key={index}
                    >
                        <Card sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, boxShadow: 3 }}>
                            {/* Company Logo */}
                            <CardMedia
                                component="img"
                                sx={{
                                    width: { xs: 120, sm: 250 },  // Adjusted image size for mobile
                                    maxWidth: '100%',  // Ensures it never overflows
                                    maxHeight: 150,    // Limit the height of the image
                                    objectFit: 'contain',  // Ensure the logo fits within the bounds
                                    marginLeft: 2,
                                }}
                                image={companyLogo || '/default_company.png'} // Use company logo or fallback image
                                alt={companyName}
                            />
                            {/* Student Info */}
                            <CardContent sx={{ flex: '1', textAlign: { xs: 'center', sm: 'left' } }}> {/* Center text on small screens */}
                                <Typography variant="h6">{student.name}</Typography>
                                <Typography variant="body2">Branch: {student.branch}</Typography>
                                <Typography variant="body2">Session: {student.internship_session}</Typography>
                                <Typography variant="body2">Role: {student.offer_obtained}</Typography>

                                {/* Link to detailed student info */}
                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        backgroundColor: "#D32F2F",
                                        color: "#ffffff",
                                        '&:hover': {
                                            backgroundColor: "#b71c1c",
                                        },
                                        
                                        fontWeight: 'bold',
                                        padding: '10px 20px', // Adjust padding for size
                                        transition: 'background-color 0.3s ease', // Smooth transition for hover
                                    }}
                                    onClick={() => handleViewDetails(student._id)}
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CompanyDetail;
