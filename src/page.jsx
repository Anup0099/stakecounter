import React, { useState, useEffect } from "react";
import "./table.css";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(id, calories, fat, carbs, protein, pledge, delegators) {
  return { id, calories, fat, carbs, protein, pledge, delegators };
}

const rows = [
  createData(1, 159, 6.0, 24, 4.0, 34, 76),
  createData(2, 237, 9.0, 37, 4.3),
  createData(3, 262, 16.0, 24, 6.0),
  createData(4, 305, 3.7, 67, 4.3),
  createData(5, 356, 16.0, 49, 3.9),
];

const Page = () => {
  const [cardano, setCardano] = useState(true);
  const [polka, setPolka] = useState(false);
  const [kusama, setKusama] = useState(false);
  const [initial, setInitial] = useState(true);
  const [stakeData, setStakeData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        "https://js.cexplorer.io/api-static/pool/list.json"
      );
      setStakeData(data.data);
      console.log(data.data);
    };
    if (initial) {
      getData();
      setInitial(false);
    }
  }, [initial, stakeData]);
  return (
    <div className="table_container">
      <div className="table_head">
        <span>Stake Explorer</span>
        <span>
          Staking Rewards is the leading data provider for staking and
          crypto-growth tools.{" "}
        </span>
      </div>
      {/* buttons */}
      <div className="table_button">
        <Button
          variant={cardano ? "contained" : "outlined"}
          onClick={() => {
            setCardano(true);
            setKusama(false);
            setPolka(false);
          }}
        >
          Cardano
        </Button>
        <Button
          variant={polka ? "contained" : "outlined"}
          onClick={() => {
            setCardano(false);
            setKusama(false);
            setPolka(true);
          }}
        >
          Polka Dot
        </Button>
        <Button
          variant={kusama ? "contained" : "outlined"}
          onClick={() => {
            setCardano(false);
            setKusama(true);
            setPolka(false);
          }}
        >
          Kusama
        </Button>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>S.No.</StyledTableCell>
                <StyledTableCell align="left">Pool</StyledTableCell>
                <StyledTableCell align="left">Stake/size</StyledTableCell>
                <StyledTableCell align="left">Saturation</StyledTableCell>
                <StyledTableCell align="left">Blocks</StyledTableCell>
                <StyledTableCell align="left">Pledge</StyledTableCell>
                <StyledTableCell align="left">Delegators</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stakeData?.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">
                    {(row.stake / 1000000000000).toFixed(2)}M₳
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div className="progress">
                      <div
                        className="progressbar"
                        style={{
                          width: `${row.saturation}%`,
                        }}
                      >
                        {(row.saturation * 100).toFixed(2)}%
                      </div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.blocks_epoch}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {Math.abs(row.pledge / 10000000000)}k
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.delegators}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="table_page">
        <Stack spacing={2}>
          <Pagination count={10} showFirstButton showLastButton />
        </Stack>
      </div>
    </div>
  );
};

export default Page;
