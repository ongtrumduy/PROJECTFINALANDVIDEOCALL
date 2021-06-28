import "./App.css";
// import { Route, Switch } from "react-router-dom";

// import VideoTeamCall from "../src/Components/Content/UserPage/VideoTeamCall/VideoTeamCall";

import Main from "./Components/Main/Main";

function App() {
  return (
    <div className="App">
      {/* <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/videocall" component={VideoTeamCall} />
      </Switch> */}
      <Main />
    </div>
  );
}

export default App;
