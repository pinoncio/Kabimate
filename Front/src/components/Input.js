import React from 'react';
import '../Styles/Input.css';

const Input = ({ type, placeholder }) => {
  return <input className="input" type={type} placeholder={placeholder} />;
};

export default Input;
