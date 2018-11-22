import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliar';

import classes from './index.css';

class QuestionTitlePack extends Component {  
  render() {
    const { enunciado } = this.props;

    return (
      <Aux>
        <div className={classes.box}>
          <h1 className={classes.title}>{enunciado}</h1>
        </div>
      </Aux>
    );
  }
}

export default QuestionTitlePack;