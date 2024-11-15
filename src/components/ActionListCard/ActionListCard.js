import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Slider, Typography, Box, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import './ActionListCard.css';

const ActionListCard = () => {
  const [receiveCode, setReceiveCode] = useState(''); // For receiving file secret code
  const [generatedCode, setGeneratedCode] = useState(''); // For storing the generated secret code
  const [sliderValue, setSliderValue] = useState(0); // For controlling the slider
  const dispatch = useDispatch();

  // Handle slider value change
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  // Handle code generation
  const generateSecretCode = () => {
    const code = Math.random().toString(36).substr(2, 8); // Simple random code generator
    setGeneratedCode(code);
  };

  // Handle receiving files using the secret code
  const handleReceiveFiles = () => {
    if (receiveCode === '') {
      alert('Please enter a secret code.');
    } else {
      // Handle file receiving logic here (e.g., request to server with the secret code)
      alert(`Files will be loaded with secret code: ${receiveCode}`);
    }
  };

  return (
    <div className="actions-list-card-overlay">
      {/* <div className="actions-list-card-modal"> */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              File Sharing Options
            </Typography>
            <Grid container spacing={3}>
              {/* Slider for receiving files */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Receive Files
                </Typography>
                <Slider
                  value={sliderValue}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  step={1}
                  min={0}
                  max={1}
                  aria-labelledby="slider-receive"
                />
                {sliderValue === 1 && (
                  <Box marginTop={2}>
                    <TextField
                      label="Enter Secret Code"
                      variant="outlined"
                      fullWidth
                      value={receiveCode}
                      onChange={(e) => setReceiveCode(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleReceiveFiles}
                      sx={{ marginTop: 2 }}
                    >
                      Load Files
                    </Button>
                  </Box>
                )}
              </Grid>

              {/* Slider for generating secret code */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Generate Secret
                </Typography>
                <Slider
                  value={sliderValue}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  step={1}
                  min={0}
                  max={1}
                  aria-labelledby="slider-generate"
                />
                {sliderValue === 0 && (
                  <Box marginTop={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={generateSecretCode}
                    >
                      Generate Secrete
                    </Button>
                    {generatedCode && (
                      <Typography variant="h6" align="center" marginTop={2}>
                        Secret Code: {generatedCode}
                      </Typography>
                    )}
                  </Box>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      {/* </div> */}
    </div>
  );
};

export default ActionListCard;
