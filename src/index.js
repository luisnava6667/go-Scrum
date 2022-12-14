import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
