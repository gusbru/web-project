import React, { Component } from 'react';
import request from 'superagent';

// import Home from './containers/Home';
import Questions from './containers/Questions';

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
        <Questions />
      </div>
    );
  }
}

export default App;
