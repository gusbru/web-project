import React from 'react';

import Input from '../Input';

import classes from './index.css';
 
const person = (props) => {
  return (
    <div class="option" id={props.alternativa}>
      <span class={classes.Letra}><p>{props.alternativa}</p></span>
      
      <span><Input inputTitle={`Alternativa ${props.alternativa}`} /></span>
    </div>
  )
}
export default person;