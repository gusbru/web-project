import React, { Component } from 'react';
import axios from 'axios';

import Home from './containers/Home';
import Questions from './containers/Questions';

import './App.css';

class App extends Component {
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
