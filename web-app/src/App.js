import React, { Component } from 'react';
import request from 'superagent';

import './App.css';

import UIDashboard from './containers/UIDashboard';

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
        <UIDashboard />
      </div>
    );
  }
}

export default App;
