import React, { Component } from 'react';
import axios from 'axios';

import Home from './containers/Home';
import Questions from './containers/Questions';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.callApi()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  callApi = async () => {
    const response = await fetch('locahost:3005/api/questoes');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    /*    
    const config = {
      headers: {'X-My-Custom-Header': 'Header-Value'}
    };

    axios.get('http://localhost:3005/api/questoes', config)
    .then(function(response){
      console.log(response);
    })
    .catch();
    */
    
    return (
      <div className="App">
        <Questions />
      </div>
    );
  }
}

export default App;
