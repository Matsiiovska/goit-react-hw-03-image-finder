import React, { useState } from 'react';
import { GalleryItem, Img } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';


const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <GalleryItem onClick={handleImageClick}>
        <Img src={image.webformatURL} alt={image.tags} />
      </GalleryItem>
      {showModal && (
        <Modal image={image} onClose={handleCloseModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
};

export default ImageGalleryItem;