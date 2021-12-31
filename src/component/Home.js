import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListTable from './ListTable';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Footer from './Footer';
import Header from './Header';
import { getData } from '../utility/getData';
import { useIsWidthUp } from './width';
import DetailsPaper from './DetailsPaper';
const theme = createTheme();

const noData = 'no data';
const productName = 'Employee Attrition Prediction';
const productDescription = 'Turnover rate has been an important issue for an enterprise. This system aims to predict the probability of turnover for each employee.';
const department = ['Sales', 'R&D', 'HR'];

export default function Home() {
  const [data, setData] = useState([]);
  const [selectedID, setSelectedID] = useState(-1);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  // const isMdUp = useIsWidthUp("md");
  const handleShowDetails = (d) =>{
    if(d.user_id === selectedID){
      setDetail(null);
      setSelectedID(-1);
    }
    else{
      console.log(d.user_id);
      setDetail(d);
      setSelectedID(d.user_id);
    }
  }
  useEffect(() => {
    setLoading(true);
    let dummyData = getData();
    console.log("fetch");
    setData(dummyData);
    setLoading(false);
  }, [data]);

  if (loading){
    return(
      ""
    );
  }
  if (data.length === 0){
    return(
      <Typography variant="h6" color="inherit" noWrap>
        {noData}
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" style={{ background: '#ad66a9' }}>
        <Toolbar>
          <Grid container justifyContent="flex-start">
            <Typography variant="h6" color="inherit" noWrap>
              {productName}
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        <Header
          productName={productName}
          productDescription={productDescription}
        />
        <Container sx={{ py: 4 }}>
          <Grid container direction="row" spacing={10}
          // sx={{
          //   backgroundImage: `url(${process.env.PUBLIC_URL}/appCurvyLines.png)`,
          //   pointerEvents: 'none',
          //   top: -180,
          //   }}
          >
            <Grid item>
              <ListTable data={data} handleShowDetails={handleShowDetails} selected={selectedID}/>   
            </Grid>
            <Grid item>
              <DetailsPaper data={detail}/>
            </Grid>            
          </Grid>
        </Container>
      </main>
      <Footer productName={productName}/>
    </ThemeProvider>
  );
}