import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function DetailsPaper(props) {
  const { data } = props;
  if (data === null){
    return(
      <Box
        sx={{
          '& > :not(style)': {
            m: 1,
            width: 500,
            height: "auto",
          },
        }}
      >
        <Paper 
          sx={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL}/appCurvyLines.png)`,
            borderRadius: 5, 
            borderStyle: 'solid'
          }}
          elevation={2}
        >
          <Typography>
            click button
          </Typography>
          <Typography color="secondary">
            "SHOW"
          </Typography>
          <Typography>
            to get details!
          </Typography>
        </Paper>    
      </Box>
    )
  }
  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 1,
          width: 500,
          height: "auto",
        },
      }}
    >
      <Paper 
        sx={{ 
          borderRadius: 5, 
          borderStyle: 'solid'
        }}
        elevation={2}
      >
        <Box
          sx={{
          mt: 4,
          mx: 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          }}
        >
          <Avatar sx={{ mr: 2}}>
            <img src={process.env.PUBLIC_URL + '/favicon-32x32.png'} 
                alt="avatar-img"
            /> 
          </Avatar>
          <Typography>
            user_id  suggestion  score: 79%
          </Typography>
        </Box>
        <Grid container direction="row" sx={{ mx: 2}}>
          <Box sx={{ maxWidth: 60, my: 2 }}>
            <TextField
              id="age"
              label="Age"
              defaultValue={data.Age}
            />
          </Box>
          <Box sx={{ minWidth: 120, my: 2 }}>
            <FormControl>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                id="gender"
                value={0}
                label="Gender"
              >
                <MenuItem value={0}>female</MenuItem>
                <MenuItem value={1}>male</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120, my: 2  }}>
            <FormControl>
              <InputLabel id="maritalStatus">MaritalStatus</InputLabel>
              <Select
                labelId="maritalStatus"
                id="maritalStatus"
                value={0}
                label="MaritalStatus"
              >
                <MenuItem value={0}>Single</MenuItem>
                <MenuItem value={1}>Married</MenuItem>
                <MenuItem value={2}>Divorced</MenuItem>

              </Select>
            </FormControl>
          </Box>
        </Grid>

          <Stack spacing={2} direction="row"
            sx={{ mx: 20 }}
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="center"
          >
            <Button>
              Reset Details
            </Button> 
            <Button>
              Predict Again
            </Button> 
          </Stack>
      </Paper>
    </Box>
  );
}