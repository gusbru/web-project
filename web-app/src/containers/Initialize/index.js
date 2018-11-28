import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import request from 'superagent';

class Initialize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("token"),
            username: localStorage.getItem("username")
        }
    }

    
    componentDidMount() {
        console.log("initial token = ", this.state.token);
        let username = "";
        request
            .get('http://localhost:3005/api/me')
            .set({ 'x-auth-token': this.state.token})
            .then(res => {
                username = res.body[0].login;
                localStorage.setItem("username", username);
            })    
            .catch(err => {
                console.log("erro =>", err);
                localStorage.setItem("token", "");
                localStorage.setItem("username", "");
            });
            this.setState({
                username: username
            });
    }

    render() {
        if (this.state.token === "" || this.state.token === null) {
            return(
                <Redirect to="/login" />
            );       
        }
        else {
            return(
                <Redirect to={"/main"} />
            );
        }
    }
}

export default withRouter(Initialize);