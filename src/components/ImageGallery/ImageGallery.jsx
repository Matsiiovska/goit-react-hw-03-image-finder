import React from 'react';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedImage: null,
    };
  }

  handleImageClick = (image) => {
    this.setState({
      selectedImage: image,
      isModalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
      selectedImage: null,
    });
  };

  render() {
    const { images } = this.props;
    const { isModalOpen, selectedImage } = this.state;

    return (
      <>
        <Gallery>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={this.handleImageClick}
            />
          ))}
        </Gallery>
        {isModalOpen && (
          <Modal image={selectedImage} onClose={this.handleCloseModal} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;