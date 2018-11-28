import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter, Redirect } from "react-router-dom";
import request from 'superagent';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: '#80CBC4',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class UILogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      authenticated: false,
      questionsInformations: [{}],  
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log('usuario: ', this.state.username);
    console.log('senha: ', this.state.password);
    request
      .post('http://localhost:3005/api/auth')
      .set('Content-Type', 'application/json')
      .send({ "login": this.state.username, "senha": this.state.password})
      .then(res => {
          console.log("token:",res.text)
          this.setState({
            token: res.text,
            authenticated: true
          });
          localStorage.setItem("token", res.text);
          localStorage.setItem("username", this.state.username)
        })
      .catch(err => {
          console.log("Erro = :", err)
          alert("Usuario e/ou senha invalidos");
          this.setState({
            password: ""
          })
        }
      );
  }
  
  render () {
    const { classes } = this.props;

    if (this.state.authenticated) {
      return(
        <Redirect 
          to={{
            pathname: "/main",
            state: {
              authenticated: true,
              username: this.state.username
            }
          }} />
      );
    }

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <form className={classes.form} onSubmit={this.handleSubmit}>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input 
                id="email" 
                name="email" 
                autoComplete="email" 
                autoFocus 
                value={this.state.username}
                onChange={this.handleChange("username")}/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input 
                name="password" 
                type="password" 
                id="password" 
                autoComplete="current-password" 
                value={this.state.password}
                onChange={this.handleChange("password")}/>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  };
}

UILogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(UILogin));