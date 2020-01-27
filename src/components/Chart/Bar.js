import React from "react";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import ReactEcharts from "echarts-for-react";
import { useMappedState } from "redux-react-hook";
import { arrayDeleteRepeat } from '../../utils/modifyArray';

const Bar = () => {
  const data = useMappedState(state => state.data);
  const stateList = arrayDeleteRepeat(data.map(item => item.state));
  const typeList = arrayDeleteRepeat(data.map(item => item.type));

  const getNumberOfTypeInState = (typeName, stateName) => {
    const number = data.reduce((total, item) => {
      return total + ((item.state === stateName) && (item.type === typeName) ? 1 : 0);
    }, 0);
    return number;
  };

  let option = {
    color: ["#003366", "#006699", "#4cabce", "#e5323e"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      data: typeList.map(item => (item === null ? "No Data" : item))
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: stateList
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: typeList.map(item => {
      return ({
        name: (item === null ? "No Data" : item),
        type: 'bar',
        barGap: 0,
        data: stateList.map(state => {
          return (
            getNumberOfTypeInState(item, state)
          );
        }),
      });
    })
  };
  return (
    <div className="chart">
      {data.length !== 0 ? <ReactEcharts className="chart--bar" option={option} /> : null}
    </div>
  );
};

export default Bar;
