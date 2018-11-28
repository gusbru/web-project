import React from 'react';
import { withRouter, Redirect } from "react-router-dom";

class Logout extends React.Component {

    render() {
        console.log("fazendo logout");
        localStorage.setItem("token", "");
        localStorage.setItem("username", "");
        return(
            <Redirect to="/" />
        );
    }
}

export default withRouter(Logout);