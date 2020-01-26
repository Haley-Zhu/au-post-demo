import React from "react";
import DashBoard from "./components/DashBoard";
import FileReader from "./components/FileReader";

class App extends React.Component {

  render() {
    return (
      <div style={{ margin: 40 }}>
        <FileReader />
        <DashBoard />
      </div>
    );
  }
}

export default App;
