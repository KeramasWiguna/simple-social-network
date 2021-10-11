import React from "react";
import { Router } from "@reach/router";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { DetailPost } from "./pages/DetailPost";

function App() {
  return (
    <Router>
      <Home default path="/" />
      <Profile path="profile/:userId" />
      <DetailPost path="post/:postId" />
    </Router>
  );
}

export default App;
