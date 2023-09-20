import React from 'react';
import { But, ButtonContainer } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, hidden }) => {
  return (
    <ButtonContainer>
      <But onClick={onClick} hidden={hidden}>
        {children}
      </But>
    </ButtonContainer>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  hidden: PropTypes.bool,
};

export default Button;