import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import { StoreContext } from "redux-react-hook";
import "bootstrap/dist/css/bootstrap.min.css";
import reducer from "./redux/reducer";

const store = createStore(reducer);

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);
