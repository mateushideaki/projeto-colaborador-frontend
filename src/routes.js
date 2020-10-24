import React from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
import { isAuthenticated } from "./services/auth";

import Login from './pages/Login';
import Colaboradores from './pages/Colaboradores';
import { ToastContainer } from 'react-toastify';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/colaboradores" exact component={Colaboradores} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
        <ToastContainer/>
    </BrowserRouter>
);

export default Routes;