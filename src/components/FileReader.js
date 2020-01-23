import React from "react";
import { connect } from 'react-redux';
import CSVReader from "react-csv-reader";

import { addData as addDataAction } from '../redux/action';

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

class FileReader extends React.Component {
  constructor() {
    super();
    this.handleAddFile = this.handleAddFile.bind(this);
  }
  handleAddFile = (data, fileName) => {
    this.props.addData(data);
  };

  render() {
    return(
      <div>
          <CSVReader
            cssClass="react-csv-input"
            label="Select Australian Postcodes.csv File in local"
            onFileLoaded={this.handleAddFile}
            parserOptions={papaparseOptions}
          />
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
	addData: data => dispatch(addDataAction(data)),
});

export default connect(
  null,
	mapDispatchToProps
)(FileReader);