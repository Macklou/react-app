// App.js

import React from "react";
import Weather from "./Weather";
import "./App.css";
import backgroundImage from "./background.png";

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Weather />
    </div>
  );
}

export default App;
