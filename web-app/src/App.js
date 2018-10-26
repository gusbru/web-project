import React, { Component } from 'react';
import Input from './componentes/Input';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Input inputTitle="Erick" label="Carlos" />
      </div>
    );
  }
}

export default App;
