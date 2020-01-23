import React from "react";
import ReactDOM from "react-dom";
import { Card } from "antd";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import {connect} from 'react-redux';
import ReactEcharts from "echarts-for-react";

class Gragh extends React.Component {
  getOption = () => {
    let option = {
      title: {
        text: "Number",
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
        data: [
          "ACT",
          "NT",
          "SA",
          "TAS",
          "VIC",
          "WA",
        ]
      },
      series: [
        {
          name: "numbers",
          type: "pie",
          radius: ["20%", "80%"],
          data: [
            { value: this.getNumberOfState("ACT"), name: "ACT" },
            { value: this.getNumberOfState("NT"), name: "NT" },
            { value: this.getNumberOfState("SA"), name: "SA" },
            { value: this.getNumberOfState("TAS"), name: "TAS" },
            { value: this.getNumberOfState("VIC"), name: "VIC" },
            { value: this.getNumberOfState("WA"), name: "WA" },
          ]
        }
      ]
    };
    return option;
  };

  getNumberOfState = (stateName) => {
    const data = this.props.data;
    console.log("------52222222222222222----", data, typeof(data));
    const number = data.reduce((total, item) => {
      return total + (item.state === stateName ? 1 : 0 )
    }, 0)
    return number;
  }

  render() {
    return (
      <Card.Grid className="pie_b">
        <ReactEcharts option={this.getOption()} />
      </Card.Grid>
    );
  }
}

const mapStateToProps = state => ({
	data: state.data,
});


export default connect(
	mapStateToProps,
)(Gragh);
