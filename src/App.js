import React from 'react';
import './App.css';
import Home from './components/Home'
import Companies from './components/Companies'
import Investor from './components/Investors'
import InvestorDetails from './components/InvestorDetails'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
function App() {
  return (

    <div className="App">
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/Investor">
              <Investor />
            </Route>
            <Route path="/Companies">
              <Companies />
            </Route>
            <Route path="/InvDetails/:id" render={(props) => <InvestorDetails {...props} />}>
            </Route>
            <Route path="/">
              <Home />
            </Route>

          </Switch>
        </div>
      </Router>
    </div>
  );
}
{/* <nav>
<ul>
  <li>
    <Link to="/">Home</Link>
  </li>
  <li>
    <Link to="/Investor">Investor</Link>
  </li>
  <li>
    <Link to="/Companies">Companies</Link>
  </li>
</ul>
</nav> */}
export default App;
