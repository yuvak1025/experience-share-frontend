import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../config';

const ShareExperienceForm = () => {

  const [resetKey, setResetKey] = useState(0);
  const navigate = useNavigate(); 
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [internshipSession, setInternshipSession] = useState('');
  const [offerObtained, setOfferObtained] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [internLocation, setInternLocation] = useState('');
  const [eligibleBranches, setEligibleBranches] = useState('');
  const [eligibilityCriteria, setEligibilityCriteria] = useState('');
  const [selectionProcedure, setSelectionProcedure] = useState('');
  const [onlineTestDescription, setOnlineTestDescription] = useState('');
  const [technicalInterviewDescription, setTechnicalInterviewDescription] = useState('');
  const [hrRoundDescription, setHrRoundDescription] = useState('');
  const [preparationStrategy, setPreparationStrategy] = useState('');
  const [resources, setResources] = useState('');
  const [type, setType] = useState('intern');
  const [company, setCompany] = useState(null);
  const [options, setOptions] = useState([]);


  const handleCompanyInputChange = async (event) => {
    const { value } = event.target;
    if (value) {
      try {
        const response = await axios.get(`https://api.brandfetch.io/v2/search/${value}`);
        if (response.data && response.data.length > 0) {
          setOptions(response.data);
        } else {
          // If no company is found, show default option with user input
          setOptions([{ name: value, icon: '/company-logo-default.png' }]);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
        // Set default option if there is an error
        setOptions([{ name: value, icon: '/company-logo-default.png' }]);
      }
    } else {
      setOptions([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare student data
    const studentData = {
      name,
      college,
      branch,
      internship_session: internshipSession,
      offer_obtained: offerObtained,
      role_description: roleDescription,
      intern_location: internLocation,
      eligible_branches: eligibleBranches,
      eligibility_criteria: eligibilityCriteria,
      selection_procedure: selectionProcedure,
      description_online_test: onlineTestDescription,
      description_technical_interview: technicalInterviewDescription,
      description_hr_round: hrRoundDescription,
      preparation_strategy: preparationStrategy,
      resources,
    };

    try {
      // First, create the student
      const studentResponse = await axios.post(`${BASE_URL}/student/`, studentData);
      const studentId = studentResponse.data._id;

      // Check if the company exists based on name and type
      const existingCompanyResponse = await axios.get(`${BASE_URL}/company/search?name=${company.name}&type=${type}`);

      //  This is made clear by studying response headers of get
      const existingCompany = existingCompanyResponse.data;


      if (existingCompany._id != null) {
        // If company exists, add the student to the company's student list
        await axios.post(`${BASE_URL}/company/${existingCompany._id}/addStudent`, { studentId });
      } else {
        // If company doesn't exist, create the company and add the student
        const companyData = {
          name: company.name,
          logo_url: company.icon || '/company-logo-default.png', // Use default logo if not available
          students: [studentId],
          type,
        };
        await axios.post(`${BASE_URL}/company/`, companyData);
      }
      resetForm();
      navigate(`/student/${studentId}`);

    } catch (error) {
      alert('There was an error submitting the experience. Please try again.');
      console.error('Error submitting experience:', error);
    }


  };

  // Reset form function
  const resetForm = () => {
    setName('');
    setCollege('');
    setBranch('');
    setInternshipSession('');
    setOfferObtained('');
    setRoleDescription('');
    setInternLocation('');
    setEligibleBranches('');
    setEligibilityCriteria('');
    setSelectionProcedure('');
    setOnlineTestDescription('');
    setTechnicalInterviewDescription('');
    setHrRoundDescription('');
    setPreparationStrategy('');
    setResources('');
    setType('intern');
    setResetKey(prevKey => prevKey + 1); // Increment key
    setCompany(null);
    setOptions([]); // Reset company options too
  };




  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h5"
        sx={{
          color: '#D32F2F',
          fontWeight: 'bold',        // Makes the text bold
          textAlign: 'center',      // Centers the text
          letterSpacing: '0.5px',   // Adds space between letters
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Adds a subtle shadow for depth
          mb: 2,                    // Adds some margin at the bottom
        }}>Share Your Experience</Typography>

      <Autocomplete
        key={resetKey}
        options={options}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => setCompany(value)}
        onInputChange={handleCompanyInputChange}
        renderInput={(params) => (
          <TextField {...params} label="Company" variant="outlined" required fullWidth />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <img src={option.icon || '/company-logo-default.png'} alt={option.name} style={{ width: 30, marginRight: 10 }} />
            {option.name}
          </li>
        )}
      />

      <TextField
        label="Name"
        variant="outlined"
        required
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="College"
        variant="outlined"
        required
        fullWidth
        value={college}
        onChange={(e) => setCollege(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Branch"
        variant="outlined"
        required
        fullWidth
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Session"
        variant="outlined"
        required
        fullWidth
        value={internshipSession}
        onChange={(e) => setInternshipSession(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Offer Verdict"
        variant="outlined"
        required
        fullWidth
        value={offerObtained}
        onChange={(e) => setOfferObtained(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Role Description"
        variant="outlined"
        required
        fullWidth
        value={roleDescription}
        onChange={(e) => setRoleDescription(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Location"
        variant="outlined"
        required
        fullWidth
        value={internLocation}
        onChange={(e) => setInternLocation(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Eligible Branches"
        variant="outlined"
        required
        fullWidth
        value={eligibleBranches}
        onChange={(e) => setEligibleBranches(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Eligibility Criteria"
        variant="outlined"
        required
        fullWidth
        value={eligibilityCriteria}
        onChange={(e) => setEligibilityCriteria(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Selection Procedure"
        variant="outlined"
        required
        fullWidth
        value={selectionProcedure}
        onChange={(e) => setSelectionProcedure(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Online Test Description"
        variant="outlined"
        required
        fullWidth
        multiline
        rows={4}
        value={onlineTestDescription}
        onChange={(e) => setOnlineTestDescription(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Technical Interview Description"
        variant="outlined"
        required
        fullWidth
        multiline
        rows={4}
        value={technicalInterviewDescription}
        onChange={(e) => setTechnicalInterviewDescription(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="HR Round Description"
        variant="outlined"
        required
        fullWidth
        multiline
        rows={4}
        value={hrRoundDescription}
        onChange={(e) => setHrRoundDescription(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Preparation Strategy"
        variant="outlined"
        required
        fullWidth
        multiline
        rows={4}
        value={preparationStrategy}
        onChange={(e) => setPreparationStrategy(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Resources"
        variant="outlined"
        required
        fullWidth
        value={resources}
        onChange={(e) => setResources(e.target.value)}
        sx={{ mt: 2 }}
      />

      <RadioGroup row value={type} onChange={(e) => setType(e.target.value)}>
        <FormControlLabel
          value="intern"
          control={<Radio sx={{ color: '#D32F2F', '&.Mui-checked': { color: '#D32F2F' } }} />}
          label="Intern"
        />
        <FormControlLabel
          value="placement"
          control={<Radio sx={{ color: '#D32F2F', '&.Mui-checked': { color: '#D32F2F' } }} />}
          label="Placement"
        />
      </RadioGroup>

      <Button type="submit" variant="contained" sx={{ my: 2, width: '100%', backgroundColor: '#D32F2F' }}>
        Submit Experience
      </Button>
    </Box>
  );
};

export default ShareExperienceForm;