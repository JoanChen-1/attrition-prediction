import * as React from 'react';
import { useEffect, useState } from 'react'; 
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ColorfulChip from "./shared/ColorfulChip";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { getPredictValues } from '../utility/getPredictValues';

const selectOptions = [
  {
    label: "OverTime",
    options: [
      "Yes",
      "No"
    ]
  },
  {
    label: "EnvironmentSatisfaction",
    options:[
      1,
      2,
      3,
      4
    ]
  },
  {
    label: "BusinessTravel",
    options: [
      "Non-Travel",
      "Travel_Rarely",
      "Travel_Frequently"
    ]
  },
  {
    label: "WorkLifeBalance",
    options: [
      1,
      2,
      3,
      4
    ]
  },
  {
    label: "JobRole",
    options: [
      "Sales Executive",
      "Research Scientist",
      "Laboratory Technician",
      "Manufacturing Director",
      "Healthcare Representative",
      "Manager",
      "Sales Representative",
      "Research Director",
      "Human Resources"
    ]
  },
  {
    label: "RelationshipSatisfaction",
    options: [
      1,
      2,
      3,
      4
    ]
  },
  {
    label: "JobLevel",
    options: [
      1,
      2,
      3,
      4,
      5
    ]
  }
]

const textFieldOptions = [
  "YearsWithCurrManager",
  "DailyRate",
  "MonthlyIncome",
  "JobInvolvement",
  "Age",
  "YearsSinceLastPromotion",
  "DistanceFromHome",
  "StockOptionLevel",
  "PercentSalaryHike",
  "HourlyRate",
  "MonthlyRate",
  "TrainingTimesLastYear",
  "YearsInCurrentRole",
  "TotalWorkingYears",
  "YearsAtCompany"
]
export default function DetailsPaper(props) {
  const { 
    data, 
    colors, 
    setOpenAlert, 
    newPredictVal, 
    setNewPredictVal, 
    setImgSrc} = props;
  const [values, setValues] = useState(null);


  useEffect(()=>{
    let stateList = {};
    if(data !== null){
      selectOptions.forEach((o, idx)=>{
        stateList[o.label] = data[o.label];
      })
      textFieldOptions.forEach((t, idx)=>{
        stateList[t] = data[t];
      })
    } 
    else{
      selectOptions.forEach((o)=>{
        stateList[o.label] = ""
      })
      textFieldOptions.forEach((t)=>{
        stateList[t] = 0
      })
    }
    setValues(stateList);
  }, [data])

  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setValues(prevState => (
      {                   
          ...prevState,
          [name]: value
      }
    ))
  }

  const handleReset = () =>{
    setNewPredictVal(null);
    setImgSrc(null);
  }

  const handleSubmit = () =>{
    let newObject = Object.assign({}, data);
    for(const key in values){
      if (key === "OverTime" || key === "EnvironmentStatisfaction" || key === "BusinessTravel"){
        newObject[key] = values[key]; // don't need to convert
      }
      else{
        newObject[key] = parseInt(values[key]); // convert string to int
      }
    }
    (async() => {
      delete newObject.img;
      const result = await getPredictValues([newObject], "plot");
      if (result === "fail"){
        setOpenAlert(true);
      }
      else{
        setNewPredictVal(result[0][0].Attrition);
        setImgSrc(result[1]);
      }
    })()
  }

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
          <Typography sx={{fontFamily: 'Karla, sans-serif'}}>
            click button
          </Typography>
          <Typography color="secondary" sx={{fontFamily: 'Karla, sans-serif'}}>
            "SHOW"
          </Typography>
          <Typography sx={{fontFamily: 'Karla, sans-serif'}}>
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
      <Paper sx={{ borderRadius: 5, borderStyle: 'solid', borderColor: '#9c27b0' }} elevation={2}>
        <Box
          sx={{ mt: 4, mx: 4,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          }}
        >
          <Avatar sx={{ mr: 2}}>
            <img src={data.img} alt="details-paper-avatar"/> 
          </Avatar>
          <Grid container direction="row" justifyContent="flex-start">  
            <Typography sx={{fontFamily: 'Karla, sans-serif'}}>
              {data.user_id}
            </Typography>
          </Grid>
        </Box>
        <Typography color="secondary" sx={{fontFamily: 'Karla, sans-serif'}}>
          DETAILS
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container direction="row" sx={{ mx: 2}}>
            {selectOptions.map((s, sidx)=>(
              <Box sx={{ m: 1}} key={sidx}>
                <TextField
                  select
                  id={s.label}
                  label={s.label}
                  name={s.label}
                  value={values[s.label]}
                  onChange={handleChange}
                  color="secondary"
                  sx={{ minWidth: 220, fontFamily: 'Karla, sans-serif'}}
                >
                {s.options.map((o, oidx)=>(
                  <MenuItem value={o} key={oidx} 
                   sx={{ fontFamily: 'Karla, sans-serif'}}>
                     {o}
                  </MenuItem>
                ))}
                </TextField>
              </Box>    
            ))}
            {textFieldOptions.map((t, tidx)=>(
              <Box sx={{ m: 1}} key={tidx}>
                <TextField
                  id={t}
                  label={t}
                  name={t}
                  value={values[t]}
                  onChange={handleChange}
                  color="secondary"
                  sx={{ minWidth: 160, fontFamily: 'Karla, sans-serif'}}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  />
              </Box>    
            ))}
            <Grid container direction="row" justifyContent="center" sx={{my: 2}}> 
              {(newPredictVal !== null) && (
                <ColorfulChip
                  label={"attrition risk: " + newPredictVal + "%"}
                  color={newPredictVal >= 80 ? colors.red: 
                    (newPredictVal >= 45 ? colors.yellow:colors.green)}
                />)}
            </Grid>
            <Stack spacing={2} direction="row" sx={{ mx: 20 }}
              divider={<Divider orientation="vertical" flexItem />}
              justifyContent="center"
              >
              <Button color="secondary" onClick={handleReset}
               sx={{fontFamily: 'Karla, sans-serif'}}>
                Reset Details
              </Button> 
              <Button color="secondary" onClick={handleSubmit}
               sx={{fontFamily: 'Karla, sans-serif'}}>
                 Predict Again
              </Button> 
            </Stack>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}