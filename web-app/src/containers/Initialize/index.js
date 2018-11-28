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
        // request
        //     .get('http://localhost:3005/api/me')
        //     .set({ 'x-auth-token': this.state.token})
        //     .then(res => console.log("deu certo", res))
        //     .catch(err => {
        //         console.log("erro =>", err);
        //         localStorage.setItem("token", "");
        //     })
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