import React from 'react';

import classes from './index.css';

import Input from '../Input';
import Button from '../Button';
 
const person = (props) => {
  return (
    <form className="form">
      <Input inputTitle="Login" />
      <Input inputTitle="Senha" />
      <Button />
    </form>
  )
}
export default person;