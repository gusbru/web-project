import React, {Component} from 'react';
import request from 'superagent';
import { withRouter } from "react-router-dom";
import Fab from '@material-ui/core/Fab';

import Layout from '../../componentes/Layout';
import Question from '../../componentes/Question';
import UISimpleTable from '../../componentes/UISimpleTable';

class Questions extends Component {

  state = {
    questionsInformations: [],
  };

  componentDidMount() {
    request
    .get('http://localhost:3005/api/questoes')
    .then(res => this.setState({questionsInformations: res.body}))
    .catch(err => console.log(err));

  };

  render() {
    return (
      <div>
        <div>
          <Fab variant="extended" aria-label="Delete" onClick={() => this.props.history.push("/questaonova")}>
            Adicionar Questao
          </Fab>
        </div>
        <UISimpleTable questoes={this.state.questionsInformations} />
      </div>
    )
  }
};

export default withRouter(Questions);