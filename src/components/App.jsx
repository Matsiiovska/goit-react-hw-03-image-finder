import React, { Component } from 'react';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Divapp } from './App.styled';
import { fetchImages } from 'FetchImages/FetchImages';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    hasMore: true
  };

  handleSearch = (query) => {
    if (query.trim() === '') {
      return;
    }

    this.setState({ query, page: 1, images: [], loading: true, hasMore: true }, () => {
      this.fetchImages();
    });
  };

  fetchImages = () => {
    const { query, page } = this.state;

    fetchImages(query, page)
      .then((result) => {
        if (result.error) {
          this.setState({ loading: false });
        } else if (result.images) {
          this.setState((prevState) => ({
            images: [...prevState.images, ...result.images],
            loading: false
          }));
        } else if (!result.hasMore) {
          this.setState({ hasMore: false });
        }
      });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), () => {
      this.fetchImages();
    });
  };

  render() {
    const { images, loading, hasMore } = this.state;

    return (
      <Divapp>
        <Searchbar onSearch={this.handleSearch} />
        {loading ? (
          <Loader />
        ) : (
          <>
            {images.length > 0 ? (
              <ImageGallery images={images} />
            ) : (
              <p
                style={{
                  padding: 200,
                  textAlign: 'center',
                  fontSize: 40,
                }}
              >
                Image gallery is empty... 📷
              </p>
            )}
            {images.length > 0 && hasMore && (
              <Button onClick={this.handleLoadMore}>Load More</Button>
            )}
            {!hasMore && (
              <p
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: 'gray',
                }}
              >
                End of the list
              </p>
            )}
          </>
        )}
      </Divapp>
    );
  }
}

export default App;