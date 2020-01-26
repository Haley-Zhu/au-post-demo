import React from "react";
import PostCodeTable from "../components/PostCodeTable";
import Chart from "../components/Chart";

const DashBoard = () => {
  return (
    <div className="dashBoard">
      <Chart />
      <PostCodeTable />
    </div>
  );
};

export default DashBoard;
