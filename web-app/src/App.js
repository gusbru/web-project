import React, { Component } from 'react';
import request from 'superagent';

import AllQuestions from './containers/AllQuestions';
// import Questions from './containers/Questions';

import './App.css';

class App extends Component {
  componentDidMount() {
    request
    .get('http://localhost:3005/api/questoes')
    .then(res => console.log(res.body))
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <AllQuestions />
      </div>
    );
  }
}

export default App;
