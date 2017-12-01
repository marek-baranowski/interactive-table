import React from "react";
import ReactDOM from "react-dom";
import { useStrict } from "mobx";
import { Provider } from "mobx-react";
import "./index.css";
import App from "./App";
import { createStore } from "./store";

useStrict(true);

ReactDOM.render(
  <Provider {...{ store: createStore() }}>
    <App />
  </Provider>,
  document.getElementById("root")
);
