import React, { Component } from 'react';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Divapp } from './App.styled';
import { fetchImages } from '../FetchImages/FetchImages';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    noResults: false,
    loadMore: true,
  };

  handleSearch = (query) => {
    if (query.trim() === '') {
      return;
    }

    this.setState(
      {
        query,
        page: 1,
        images: [],
        loading: true,
        noResults: false,
      },
      () => {
        this.fetchImages();
      }
    );
  };

  fetchImages = () => {
    const { query, page } = this.state;

    fetchImages(query, page).then((result) => {
      if (result.error) {
        this.setState({ loading: false });
      } else if (result.images) {
        this.setState((prevState) => ({
          images: [...prevState.images, ...result.images],
          loading: false,
          noResults: result.images.length === 0 && prevState.images.length === 0,
          loadMore: page + 1 < Math.ceil(result.totalHits / 12),
        }));
      }
    });
  };

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchImages();
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page || this.state.query !== prevState.query) {
      this.fetchImages();
    }
  }

  render() {
    const { images, loading, noResults, loadMore } = this.state;

    return (
      <Divapp>
        <Searchbar onSearch={this.handleSearch} />
        {loading ? (
          <Loader />
        ) : (
          <>
            {noResults && !loading ? (
              <p>Немає результатів</p>
            ) : (
              <>
                {images.length > 0 ? (
                  <ImageGallery images={images} />
                ) : (
                  <p>Галерея зображень порожня... 📷</p>
                )}
                {images.length > 0 && loadMore && <Button onLoadMore={this.handleLoadMore} />}
              </>
            )}
          </>
        )}
      </Divapp>
    );
  }
}

export default App;