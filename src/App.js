import React from "react";
import FileReader from "./components/FileReader";
// import DashBoard from "./components/DashBoard";

class App extends React.Component {

  render() {
    return (
      <div>
        <FileReader /> 
        {/* <DashBoard /> */}
      </div>
    );
  }
}

export default App;