import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListTable from './ListTable';
import Footer from './Footer';
import Header from './Header';
import { getData } from '../utility/getData';
import DetailsPaper from './DetailsPaper';
import { getPredictValues } from '../utility/getPredictValues';
import AlertSnackbars from './shared/AlertSnackbars';
const theme = createTheme();

const productName = 'Employee Attrition Prediction';
const productDescription = 'Turnover rate has been an important issue for an enterprise. This system aims to predict the probability of turnover for each employee.';
// const department = ['Sales', 'R&D', 'HR'];
const colors = {
  red : "#d32f2f",
  green: "#388e3c",
  yellow: "#f57c00",
  gray: "#808080"
}

export default function Home() {
  const [data, setData] = useState([]);
  const [predictValues, setPredictValues] = useState([]);
  const [selectedID, setSelectedID] = useState(-1);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [newPredictVal, setNewPredictVal] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const handleShowDetails = useCallback((d, idx) =>{
    setNewPredictVal(null);
    setImgSrc(null);
    if(d.user_id === selectedID){ //click button again to cancel showing detail 
      setDetail(null);
      setSelectedID(-1);
    }
    else{
      setDetail(d);
      setSelectedID(d.user_id);
    }
  },[detail, selectedID]);

  const handleClose = (event, reason) => { // close alert snackbar
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handlePredictAll = useCallback(() =>{
    (async() => {
      let newData = data.map(d=>{return Object.assign({}, d);});
      newData.forEach((i)=>{ delete i.img });
      console.log(newData);
      const result = await getPredictValues(newData, "nonplot");
      if (result === "fail"){
        setOpenAlert(true);
      }
      else{
        setPredictValues(result);
      }
    })()
  },[data]);

  useEffect(() => {
    setLoading(true);
    let dummyData = getData();
    setData(dummyData);
    setLoading(false);
  }, [data]);

  if (loading || data.length === 0){
    return(
      ""
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" style={{ background: '#ad66a9' }}>
        <Toolbar>
          <Grid container justifyContent="flex-start">
            <Typography variant="h6" color="inherit" noWrap
              sx={{fontFamily: 'Karla, sans-serif'}}>
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
          <Grid container direction="row" spacing={8}>
            <Grid item>
              <ListTable data={data} handleShowDetails={handleShowDetails}
                selected={selectedID} predictValues={predictValues}
                colors={colors}
              />
              <Button color="secondary" onClick={handlePredictAll}
                sx={{fontFamily: 'Karla, sans-serif'}}>
                Predict All Above
              </Button>  
              <AlertSnackbars open={openAlert} handleClose={handleClose}/> 
            </Grid>
            <Grid item>
              <DetailsPaper data={detail} 
                colors={colors}
                setOpenAlert={setOpenAlert}
                newPredictVal={newPredictVal}
                setNewPredictVal={setNewPredictVal}
                imgSrc={imgSrc}
                setImgSrc={setImgSrc}
              />
            </Grid>            
          </Grid>
        </Container>
        {(imgSrc) &&(
          <Typography variant="h5" sx={{fontFamily: 'Karla, sans-serif'}} color="secondary">
            Some <b>important features</b> for predicting the attrition risk for the employee: {selectedID}
          </Typography>)
        }
        <Box sx={{ mt: 5, width: window.innerWidth, height: "auto"}}>
          {(imgSrc) && (
          <img src={`data:image/png;base64,${imgSrc}`} 
            width={window.innerWidth - 100}
            alt="feature-import-img"
          />
          )}
        </Box>
      </main>
      <Footer productName={productName}/>
    </ThemeProvider>
  );
}