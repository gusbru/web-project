import React from "react";
import { withRouter, Redirect } from "react-router-dom";

class Initialize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("token")
        }
    }

    

    componentDidMount() {
        console.log("initial token = ", this.state.token);
    }

    render() {
        if (this.state.token === "" || this.state.token === null) {
            return(
                <Redirect to="/login" />
            );       
        }
        else {
            return(
                <Redirect to="/main" />
            );
        }
    }
}

export default withRouter(Initialize);