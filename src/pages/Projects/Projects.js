import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProgressBar from './ProgressBar'

function createData(name, StartingDate, EndingDate, Status, Assinee) {
  return { name, StartingDate, EndingDate, Status, Assinee };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {

  
  if (localStorage.getItem("role") === "admin") {
    return (
      <div>
        <div>
          < ProgressBar />
        </div>
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name of the Project</TableCell>
                <TableCell align="right">Starting Date</TableCell>
                <TableCell align="right">Ending Date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Assinee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.StartingDate}</TableCell>
                  <TableCell align="right">{row.EndingDate}</TableCell>
                  <TableCell align="right">{row.Status}</TableCell>
                  <TableCell align="right">{row.Assinee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  else{
    return (
      <div>
        <div>
          < ProgressBar />
        </div>
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name of the Project</TableCell>
                <TableCell align="right">Starting Date</TableCell>
                <TableCell align="right">Ending Date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Assinee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.StartingDate}</TableCell>
                  <TableCell align="right">{row.EndingDate}</TableCell>
                  <TableCell align="right">{row.Status}</TableCell>
                  <TableCell align="right">{row.Assinee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    ); 
  }
}
