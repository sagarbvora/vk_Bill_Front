import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import BillCreate from "./Billing/BillCrate";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/" component={BillCreate} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
