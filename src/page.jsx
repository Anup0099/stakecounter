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

const Page = () => {
  const [cardano, setCardano] = useState(true);
  const [polka, setPolka] = useState(false);
  const [kusama, setKusama] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
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

      {cardano && (
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
                {stakeData
                  ?.slice(startIndex, startIndex + 10)
                  .map((row, index) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {startIndex + index + 1}
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
                              width: `${row.saturation * 100}%`,
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
          <div className="table_page">
            <Pagination
              count={Math.ceil(stakeData.length / 10)}
              onChange={(e, page) => setStartIndex((page - 1) * 10)}
              color="primary"
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      )}
      {polka && <div style={{ color: "white",textAlign:"center",marginTop:"4rem" }}>No Data Found</div>}
      {kusama && <div style={{ color: "white",textAlign:"center",marginTop:"4rem" }}>No Data Found</div>}
    </div>
  );
};

export default Page;
