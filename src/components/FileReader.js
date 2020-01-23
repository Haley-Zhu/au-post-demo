import React from "react";
import ReactDOM from "react-dom";
import CSVReader from "react-csv-reader";


const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

const handleAddFile = (data, fileName) => console.log(data, fileName);

class FileReader extends React.Component {
  render() {
  return (
    <div className=".fileReader">
      <CSVReader
        cssClass="react-csv-input"
        label="Select CSV with secret Death Star statistics"
        onFileLoaded={handleAddFile}
        parserOptions={papaparseOptions}
      />
      <p>and then open the console</p>
    </div>
  );
  }
};

export default FileReader;