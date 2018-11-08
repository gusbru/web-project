import React from 'react';
import './index.css';

import Input from '../Input';
 
const person = (props) => {
  return (
    <form className="form">
      <Input inputTitle="Login" />
      <Input inputTitle="Senha" />
    </form>
  )
}
export default person;