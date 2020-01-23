import React from "react";
import CSVReader from "react-csv-reader";
import DashBoard from "./components/DashBoard";
import Gragh from "./components/Gragh";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };

    this.handleAddFile = this.handleAddFile.bind(this);
  }

  handleAddFile = (data, fileName) => {
    this.setState({
      data
    });
  };

  render() {
    const data = this.state;
    return (
      <div style={{ margin: 40 }}>
        <p style={{ color: "blue" }}>I choose antd-Desgin to do this code test instead of common React,
          but Stuck by the editItem in antd-table, thinking now...</p>
        <div>
          <CSVReader
            cssClass="react-csv-input"
            label="Select CSV File in public folder"
            onFileLoaded={this.handleAddFile}
            parserOptions={papaparseOptions}
          />
        </div>
        <DashBoard data={data}/>
        <Gragh data={data}/>
      </div>
    );
  }
}

export default App;
