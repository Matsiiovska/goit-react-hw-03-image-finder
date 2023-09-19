import React from 'react';
import { GalleryItem, Img } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

class ImageGalleryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleImageClick = () => {
    this.setState({
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { image } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <GalleryItem onClick={this.handleImageClick}>
          <Img src={image.webformatURL} alt={image.tags} />
        </GalleryItem>
        {showModal && (
          <Modal image={image} onClose={this.handleCloseModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;