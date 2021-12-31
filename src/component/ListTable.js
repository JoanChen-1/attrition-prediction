import * as React from 'react';
import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import EnhancedTableHead from "./shared/EnhancedTableHead";
import ColorfulChip from "./shared/ColorfulChip";

const rows = [
  {
    id: "id",
    numeric: false,
    label: "employee id"
  },
  {
    id: "dept",
    numeric: false,
    label: "department"
  },
  {
    id: "risk",
    numeric: false,
    label: "attrition risk"
  },
  {
    id: "details",
    numeric: false,
    label: "details"
  }
];

export default function ListTable(props) {
    const { data, handleShowDetails, selected } = props;
    return (
      <div sx={{
        overflowX: "auto",
        width: "100%"}}
      >
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={data.length} rows={rows} />
          <TableBody>
            {data
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((d, idx) => (
                <TableRow hover tabIndex={-1} key={idx}>
                  <TableCell
                    component="th"
                    scope="row"
                    align='center'
                  >
                  <Grid container 
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar sx={{ mr: 2}}>
                      <img src={process.env.PUBLIC_URL + '/favicon-32x32.png'} 
                          alt="avatar-img"
                      /> 
                    </Avatar>
                    {d.user_id}
                  </Grid>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align='center'
                  >
                    {d.Department}
                  </TableCell>

                  <TableCell component="th" scope="row" align='center'>
                    <ColorfulChip
                        label="★"
                        color="#ff0000"
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'>
                    <Button
                      variant={(d.user_id === selected)? "contained" : "outlined"}
                      sx={{ boarderRadius: 20 }}
                      color="secondary"
                      onClick={ () => {handleShowDetails(d)}}
                    >
                      show
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      // <Grid item xs={12} md={12}>
      //   <CardActionArea component="a">
      //     <Card sx={{ display: 'flex' }} style={{backgroundColor: "#F8F8F8"}}>
      //       <CardContent sx={{ flex: 1 }}>
      //         <Typography 
      //           component="h2" gutterBottom
      //           variant={isMdUp? "h3":"h5"} 
      //         >
      //           {item.user_id}
      //         </Typography>
      //         <Typography variant={isMdUp? "h5": "body1"}  sx={{ marginLeft: "40px", marginRight: "40px" }}>
      //           {item.description}
      //         </Typography>
      //       </CardContent>
      //       <CardMedia
      //         component="img"
      //         sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
      //         image="https://source.unsplash.com/random"
      //         alt="secondary-item-img"
      //       />
      //     </Card>
      //   </CardActionArea>
      // </Grid>
    );
  }