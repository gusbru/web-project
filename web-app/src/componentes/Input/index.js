import React from 'react';
import './index.css';
 
const person = (props) => {
  return (
    <input type="text" name="FirstName" value="" placeHolder={props.inputTitle} />
  )
}
export default person;