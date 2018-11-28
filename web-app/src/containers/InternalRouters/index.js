import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";

import Login from "../UILogin";
import Initialize from "../Initialize";
import UIDashboard from '../UIDashboard';
import Questions from '../Questions';
import NewQuestion from '../NewQuestion';
import Dashboard from '../Dashboard';
import Logout from '../Logout';

class InternalRouters extends React.Component {

    state = {
        token: ""
    }

    componentDidMount() {
        console.log("Routers mounted");
        const token = localStorage.getItem('token');
        this.setState({
            token: token
        });
    }

    componentWillUnmount() {
        console.log("Routers will unmount!");
    }

    render() {
        return(
            <Switch>
                <Route exact path="/" component={Initialize} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/main" render={() => (
                    <UIDashboard 
                        component={<Dashboard />}
                    />
                )} />
                <Route exact path="/questoes" render={() => (
                    <UIDashboard
                        component={<Questions />}
                    />
                )} />
                <Route exact path="/questaonova" render={() => (
                    <UIDashboard
                        component={<NewQuestion />}
                    />
                )} />
                <Route exact path="/logout" component={Logout} />
            </Switch>
        );
    }
}

export default withRouter(InternalRouters);