import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return (
        <Route {...rest} render={props => (
            token && (role === 'ADMIN') ?
                <Component {...props} />
                : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;