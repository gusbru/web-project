import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliar';
import Alternativa from '../Alternativa';

import classes from './index.css';

class Login extends Component {
  render() {
    return (
      <Aux>
        <div className={classes.Div}>
          <Alternativa alternativa="A" />
          <Alternativa alternativa="B" />
          <Alternativa alternativa="C" />
          <Alternativa alternativa="D" />
        </div>
      </Aux>
    );
  }
}

export default Login;