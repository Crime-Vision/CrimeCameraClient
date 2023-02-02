import React from "react";
import ReactDOM from "react-dom";
import "./globals.sass"
import "./styleguide.sass"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from "./mui_components/App";

ReactDOM.render(<App />, document.getElementById("app"));
