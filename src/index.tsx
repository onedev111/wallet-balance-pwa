import './polyfill'
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WithAppContext from "./context";

ReactDOM.render(
	<React.StrictMode>
		<WithAppContext>
			<App />
		</WithAppContext>
	</React.StrictMode>,
	document.getElementById("root")
);
