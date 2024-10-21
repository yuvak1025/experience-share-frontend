import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom'; 
import BASE_URL from '../config';

const StudentCard = () => {

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); 

    // console.log(studentId);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`${BASE_URL}/student/${id}`);
                // dollar symbol don't forget this

                const data = await response.json();
                // console.log(data);
                
                setStudent(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudent();
    }, [id]);

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
        <Card sx={{ maxWidth: 800, mx: 'auto', mt: 5, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {student.name}
                </Typography>

                <Typography variant="body1">
                    <strong>Branch:</strong> {student.branch}
                </Typography>
                <Typography variant="body1">
                    <strong>Internship Session:</strong> {student.internship_session}
                </Typography>
                <Typography variant="body1">
                    <strong>Offer Verdict:</strong> {student.offer_obtained}
                </Typography>
                <Typography variant="body1">
                    <strong>Intern Location:</strong> {student.intern_location}
                </Typography>
                <Typography variant="body1">
                    <strong>Preparation Strategy:</strong> {student.preparation_strategy}
                </Typography>
                <Typography variant="body1">
                    <strong>Resources Used:</strong> {student.resources}
                </Typography>

                {/* College Information Section */}
                <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        College Information
                    </Typography>
                    <Typography variant="body1">
                        <strong>College:</strong> {student.college}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Eligible Branches:</strong> {student.eligible_branches}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Eligibility Criteria:</strong> {student.eligibility_criteria}
                    </Typography>

                </Box>

                {/* Interview Descriptions Section */}
                <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Interview Process
                    </Typography>

                    <Typography variant="body1">
                        <strong>Selection Procedure:</strong> {student.selection_procedure}
                    </Typography>


                    <Typography variant="body1">
                        <strong>Online Test:</strong> {student.description_online_test}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Technical Interview:</strong> {student.description_technical_interview}
                    </Typography>
                    <Typography variant="body1">
                        <strong>HR Round:</strong> {student.description_hr_round}
                    </Typography>
                </Box>

                
            </CardContent>
        </Card>
    );
};

export default StudentCard;
