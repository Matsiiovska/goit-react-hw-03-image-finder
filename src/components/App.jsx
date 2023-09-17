import React, { Component } from 'react';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
/*import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';*/
import Searchbar from './Searchbar/Searchbar';
import { Divapp } from './App.styled';
import axios from 'axios';

export class App extends Component {
  state = {
    query: '', // запит пошуку
    page: 1, // номер сторінки
    images: [], // загружені зображення
    loading: false // прапорець завантаження
  };

  handleSearch = query => {
    this.setState({ query, images: [], loading: true }, () => {
      this.fetchImages();
    });
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const apiKey = '38631612-cb45d4da8d92e0954f2c2005e';
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          loading: false
        }));
      })
      .catch(error => {
        console.log("Error", error);
        this.setState({ loading: false });
      });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }), () => {
      this.fetchImages();
    });
  };

  render() {
    const { images, loading } = this.state;

    return (
      <Divapp>
        <Searchbar onSearch={this.handleSearch} />
        {loading ? (
          <Loader />
        ) : (
          <>
            <ImageGallery images={images} />
            {images.length > 0 && (
              <Button onClick={this.handleLoadMore}>Load More</Button>
            )}
          </>
        )}
      </Divapp>
    );
  }
}

export default App;