import React from "react";
import { useDispatch } from "redux-react-hook";
import CSVReader from "react-csv-reader";

import { addData as addDataAction } from "../redux/action";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_"),
  transform: value => value.replace(/\"/g, ""),
  fastMode: true
};

const FileReader = () => {
  const dispatch = useDispatch();

  const handleAddFile = ( data ) => {
    dispatch(addDataAction(data));
  };

  return (
    <div className="fileReader">
      <CSVReader
        cssClass="react-csv-input"
        label="Select Australian Postcodes.csv File in local"
        onFileLoaded={handleAddFile}
        parserOptions={papaparseOptions}
      />
    </div>
  );
};

export default FileReader;
