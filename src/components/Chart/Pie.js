import React from "react";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import { useMappedState } from "redux-react-hook";
import { arrayDeleteRepeat } from '../../utils/modifyArray';
import ReactEcharts from "echarts-for-react";

const Pie = () => {
  const data = useMappedState(state => state.data);

  const getNumberOfState = stateName => {
    const number = data.reduce((total, item) => {
      return total + (item.state === stateName ? 1 : 0);
    }, 0);
    return number;
  };

  const stateList = arrayDeleteRepeat(data.map(item => item.state));

  let option = {
    title: {
      text: "State Data",
      x: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      top: 20,
      right: 5,
      data: stateList
    },
    series: [
      {
        name: "numbers",
        type: "pie",
        radius: ["20%", "80%"],
        data: stateList.map(item => {
          return {
            value: getNumberOfState(item),
            name: item
          };
        })
      }
    ]
  };

  return (
    <div className="chart">
      {data.length !== 0 ? <ReactEcharts className="chart--pie" option={option} /> : null}
    </div>
  );
}

export default Pie;
