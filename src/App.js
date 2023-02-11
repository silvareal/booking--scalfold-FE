// App.js

import "./App.css";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Session from "./Session";
import Provider from "./Provider";

function App() {
  return (
    <div>
      <Router>
        <switch>
          <Route exact path="/session/:id">
            <Session />
          </Route>
          <Route exact path="/provider">
            <Provider />
          </Route>
        </switch>
      </Router>
    </div>
  );
}

export default App;
