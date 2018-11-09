import React, { Component } from 'react';

import Form from './componentes/Form';
import Header from './componentes/Header';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Form />
      </div>
    );
  }
}

export default App;
