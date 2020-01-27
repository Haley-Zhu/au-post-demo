import React from "react";
import DashBoard from "./view/DashBoard";
import FileReader from "./components/FileReader";
import PostCodeTable from "./components/PostCodeTable";
import { Container } from "react-bootstrap";
import "./App.scss";

class App extends React.Component {

  render() {
    return (
      <Container className="app">
        <FileReader />
        <DashBoard />
        <PostCodeTable />
      </Container>
    );
  }
}

export default App;
