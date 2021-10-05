import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...rest}) {

    const { user } = useContext(AuthContext);
    // If user is logged in, they can't access AuthRoutes link
    // Eg. /login or /register page -> will redirect to "/" home
    return (
        <Route
            {...rest}
            render={props =>
                user ? <Redirect to="/"/> : <Component {...props} />
        }
        />
    )

};

export default AuthRoute;