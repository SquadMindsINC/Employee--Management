import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar1.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  date: string,
  day: string,
  event: string,
) {
  return { date, day, event, };
}

const rows = [
  createData('26 Jan ', "Wed", "Republic Day"),
  createData('18March', "Friday", "Holi"),
  createData('15Aug', "Mon", "Independence Day"),
  createData('24 oct', "Monday", "Diwali"),
  createData('25 dec', "Sunday", "Christmas Day"),
];
function Calendar1() {
  const [date, setDate] = useState([
    new Date(2021, 6, 1),
    new Date(2021, 6, 10),
  ]);

  if (localStorage.getItem("role") === "admin") {
    return (
      <div className='app'>
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
              defaultValue={date}
            />
            {date.length > 0 ? (
              <p className='text-center'>
            {date[0].toDateString()}
            &nbsp;|&nbsp;
            <span className='bold'>End:</span> {date[1].toDateString()} */}
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
        <TableContainer component={Paper} style={{ marginTop: "5%" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell> Date</StyledTableCell>
                <StyledTableCell align="right">Day</StyledTableCell>
                <StyledTableCell align="right">Event</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.day}</StyledTableCell>
                  <StyledTableCell align="right">{row.event}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  else {
    return (
      <div className='app'>
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
              defaultValue={date}
            />
            {date.length > 0 ? (
              <p className='text-center'>
            {date[0].toDateString()}
            &nbsp;|&nbsp;
            <span className='bold'>End:</span> {date[1].toDateString()} */}
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
        <TableContainer component={Paper} style={{ marginTop: "5%" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell> Date</StyledTableCell>
                <StyledTableCell align="right">Day</StyledTableCell>
                <StyledTableCell align="right">Event</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.day}</StyledTableCell>
                  <StyledTableCell align="right">{row.event}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default Calendar1;




