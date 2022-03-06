import React, {useEffect} from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import PrivateRoute from "./Views/PrivateRoute";
import Dashboard from "./Views/Dashboard";
import Header from "./Common/Component/Header";
import Footer from "./Common/Component/Footer";
import BillingFinalPrint from "./Views/Billing/BillingFinal";
import BillCreate from "./Views/Billing/BillCrate";
import Login from "./Views/Login";
import {CONSTANT_ROUTES} from "./Config/RoutePath";
import Services from "./Views/Services";
import ContactUs from "./Views/ContactUs";
import About from "./Views/About";

function App() {
    useEffect(() => {
        window.process = {
            ...window.process,
        };
    }, []);
    return (
        <div className="App">
            <Header/>
            <div>
                <Switch>
                    <Route exact path='/' component={Dashboard}/>
                    <Route path={CONSTANT_ROUTES.user.aboutUs} component={About}/>
                    <Route path={CONSTANT_ROUTES.user.contactUs} component={ContactUs}/>
                    <Route path={CONSTANT_ROUTES.user.services} component={Services}/>
                    <PrivateRoute path={CONSTANT_ROUTES.admin.login} component={Login}/>
                    <PrivateRoute path={CONSTANT_ROUTES.admin.createBill} component={BillCreate} />
                    <PrivateRoute path={CONSTANT_ROUTES.admin.billPrint} component={BillingFinalPrint}/>
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
