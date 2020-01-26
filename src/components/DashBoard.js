import React from "react";
import PostCodeTable from "./PostCodeTable";
import Chart from "./Chart";
import { Container } from "react-bootstrap";
import "./DashBoard.scss";

const DashBoard = () => {
  return (
    <Container className="dashBoard">
      <PostCodeTable />
      <Chart />
    </Container>
  );
};

export default DashBoard;
