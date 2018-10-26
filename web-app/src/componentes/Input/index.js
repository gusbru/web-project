import React from 'react';
import './index.css';
 
const person = (props) => {
  return (
    <div className="input">
      {props.inputTitle}: <input type="text" name="FirstName" value="Mickey" />
    </div>
  )
}
export default person;