import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import storeApp from "./Redux/Store";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={storeApp}>
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
