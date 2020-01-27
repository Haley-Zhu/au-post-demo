import React from "react";
import Pie from "../components/Chart/Pie";
import Bar from "../components/Chart/Bar";

const DashBoard = () => {
  return (
    <div className="dashBoard">
      <Pie />
      <Bar />
    </div>
  );
};

export default DashBoard;
