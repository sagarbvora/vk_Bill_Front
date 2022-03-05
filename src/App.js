import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import Login from "./Views/Login";
import PrivateRoute from "./Views/PrivateRoute";
import BillingFront from "./Views/Billing/BillingFinal";
import BillCreate from "./Views/Billing/BillCrate";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path="/signin" component={Login}/>
                <PrivateRoute path="/create_bill" component={BillCreate} />
                <PrivateRoute path="/final_print/:id" component={BillingFront}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
