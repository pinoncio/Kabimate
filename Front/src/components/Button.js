import React from 'react';

const Button = ({ text, onClick, icon }) => {
  return (
    <button className="button" onClick={onClick}>
      {icon && <span className="button-icon">{icon}</span>} {/* Renderizamos el ícono si se pasa */}
      {text}
    </button>
  );
};

export default Button;