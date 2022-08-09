import React from "react";
import logo from "./logo.svg";
import "./app.css";
import ProfileFrameCreator from "./profileFrameCreator/ProfileFrameCreator";
import { grommet, Grommet } from "grommet";

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <Grommet theme={grommet}>
        <ProfileFrameCreator></ProfileFrameCreator>
      </Grommet>
      
      </header>

      
    </div>
  );
}

export default App;
