import React from 'react';

import './index.css';
 
const person = (props) => {
  return (
    <input type="text" placeHolder={props.inputTitle} />
  )
}
export default person;