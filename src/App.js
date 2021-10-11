import React from "react";
import { Router } from "@reach/router";
import { Home } from "./pages/Home";
import { Porfile } from "./pages/Profile";

function App() {
  return (
    <Router>
      <Home default path="/" />
      <Porfile path="profile/:userId" />
    </Router>
  );
}

export default App;
