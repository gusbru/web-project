import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";

import Login from "../UILogin";
import Initialize from "../Initialize";
import UIDashboard from '../UIDashboard';

class InternalRouters extends React.Component {

    state = {
        token: ""
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.setState({
            token: token
        });
    }

    render() {
        return(
            <Switch>
                <Route exact path="/" component={Initialize} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/main" component={UIDashboard} />
            </Switch>
        );
    }
}

export default withRouter(InternalRouters);