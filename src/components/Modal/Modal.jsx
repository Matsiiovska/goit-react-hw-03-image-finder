import React, { useEffect } from 'react';
import { Overlay, Mod } from './Modal.styled';
import PropTypes from 'prop-types';


const Modal = ({ image, onClose }) => {

  
  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <Overlay onClick={handleClickOutside}>
      <Mod>
        <img src={image.largeImageURL} alt={image.tags} />
        <button onClick={onClose}>Close</button>
      </Mod>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired
  }),
  onClose: PropTypes.func.isRequired
};

export default Modal;