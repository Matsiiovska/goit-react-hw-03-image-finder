import React from 'react';
import { But,  ButtonContainer} from './Button.styled';
import PropTypes from 'prop-types';



const Button = ({ onClick, children }) => {
 return (
    <ButtonContainer>
      <But type="button" onClick={onClick}>
        {children}
      </But>
    </ButtonContainer>
  ); 
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};


export default Button;
