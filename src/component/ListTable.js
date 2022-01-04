import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ColorfulChip from "./shared/ColorfulChip";
import EnhancedTableHead from "./shared/EnhancedTableHead";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';



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
    const { data, handleShowDetails, selected, predictValues, colors } = props;
    return (
      <div sx={{
        overflowX: "auto",
        width: "100%"}}
      >
        <Box sx={{
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(2, 1fr)',
          mb: 2
        }}>
          <ColorfulChip
            label="high risk: >= 80%"
            color={colors.red}
          />
          <ColorfulChip
            label="medium risk: 45% - 80%"
            color={colors.yellow}
          />
          <ColorfulChip
            label="low risk: < 45%"
            color={colors.green}
          />
          <ColorfulChip
            label="haven't predict yet!"
            color={colors.gray}
          />
        </Box>
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
                      <img src={d.img} alt="list-table-avatar"/> 
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
                    {(predictValues.length !== 0) && (
                    <ColorfulChip
                      label={predictValues[idx].Attrition+"%"}
                      color={predictValues[idx].Attrition >= 80 ? colors.red: 
                        (predictValues[idx].Attrition >= 45?colors.yellow
                          :colors.green)}
                    />)}
                    {(predictValues.length === 0) && (<ColorfulChip
                      label="？"
                      color={colors.gray}
                    />)}
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'>
                    <Button
                      variant={(d.user_id === selected)? "contained" : "outlined"}
                      color="secondary"
                      onClick={ () => {handleShowDetails(d, idx)}}
                      sx={{boarderRadius: 20, fontFamily: 'Karla, sans-serif'}}
                    >
                      show
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }