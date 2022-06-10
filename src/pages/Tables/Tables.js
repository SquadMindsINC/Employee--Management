import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar2.css';

import Grid from '@mui/material/Grid';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, PENDINGLEAVE, RejectedLeave, TakenLeave,) {

  return { name, PENDINGLEAVE, RejectedLeave, TakenLeave, };
}

export default function Tables() {
  const rows = [
    createData("varun", 159, 6.0, 24,),
    createData("dfz", 237, 9.0, 37,),
    createData("dfxg", 262, 16.0, 24,),
    createData("gf", 305, 3.7, 67,),
    createData("dgdf", 356, 16.0, 49,),
  ];
  const [date, setDate] = useState(new Date());
  if (localStorage.getItem("role") === "admin") {

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs>
          </Grid>
          <Grid item xs={8}>
            <h1 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', marginLeft: "7%" }}>Calendar</h1>
          </Grid>
          <Grid item xs>
          </Grid>
        </Grid>
        <Grid container >
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            <Calendar
              onChange={setDate}
              selectRange={true}
              defaultView='decade'
            />

            {date.length > 0 ? (
              <p className='text-center'>
                <span className='bold'>Start:</span>{' '}
                {date[0].toDateString()}
                &nbsp;|&nbsp;
                <span className='bold'>End:</span> {date[1].toDateString()}
              </p>
            ) : (
              <p className='text-center'>
                <span className='bold'>Default selected date:</span>{' '}
                {date.toDateString()}
              </p>
            )}

          </Grid>
          <Grid item xs={2}>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs>
          </Grid>
          <Grid item xs={8}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>name</StyledTableCell>
                    <StyledTableCell align="right" >Pending Leave</StyledTableCell>
                    <StyledTableCell align="right">Rejected Leave</StyledTableCell>
                    <StyledTableCell align="right">Taken Leave</StyledTableCell>
                    {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.PENDINGLEAVE}</StyledTableCell>
                      <StyledTableCell align="right">{row.RejectedLeave}</StyledTableCell>
                      <StyledTableCell align="right">{row.TakenLeave}</StyledTableCell>
                      {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={2}>

          </Grid>
        </Grid>

      </div>
    );

  }
  else {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs>
          </Grid>
          <Grid item xs={8}>
            <h1 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue', marginLeft: "7%" }}>Calendar</h1>
          </Grid>
          <Grid item xs>
          </Grid>
        </Grid>
        <Grid container >
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            <Calendar
              onChange={setDate}
              selectRange={true}
              defaultView='decade'
            />
            {date.length > 0 ? (
              <p className='text-center'>
                <span className='bold'>Start:</span>{' '}
                {date[0].toDateString()}
                &nbsp;|&nbsp;
                <span className='bold'>End:</span> {date[1].toDateString()}
              </p>
            ) : (
              <p className='text-center'>
                <span className='bold'>Default selected date:</span>{' '}
                {date.toDateString()}
              </p>
            )}

          </Grid>
          <Grid item xs={2}>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>name</StyledTableCell>
                    <StyledTableCell align="right" >Pending Leave</StyledTableCell>
                    <StyledTableCell align="right">Rejected Leave</StyledTableCell>
                    <StyledTableCell align="right">Taken Leave</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.PENDINGLEAVE}</StyledTableCell>
                      <StyledTableCell align="right">{row.RejectedLeave}</StyledTableCell>
                      <StyledTableCell align="right">{row.TakenLeave}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={2}>
          </Grid>
        </Grid>
      </div>
    );
  }

}