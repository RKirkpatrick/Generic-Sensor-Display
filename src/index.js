//TODO Finish add button for locations, sublocations, and sensors
//TODO replace sweetalert popups with new sweetalert component
//TODO fix mobile menu and replace top menu with flexbox
//TODO render cardlist using children instead of getJsx
//TODO fix new location form error after submission
//TODO add loading to ui so placeholder data isn't flashing on screen before it is fully loaded
//TODO replace organization pass down with url parameter

//TODO fix async memory leak in spot/spotmap
//TODO Capacity dynamically changing
//TODO Profile image
//TODO Summary
//TODO Update Chart
//TODO Delete extra bootstrap files
//TODO Update some database data dynamically
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
