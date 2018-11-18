import React from 'react';

import './index.css';
 
const person = (props) => {
  return (
    <input type="text" placeholder={props.inputTitle} />
  )
}
export default person;