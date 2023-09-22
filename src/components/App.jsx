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
              loadMore: false,


      },

    );
  };

fetIm = () => {
  const { query, page } = this.state;

  if (query.trim() === '') {
    this.setState({
      loading: false,
      noResults: false,
    });
    return;
  }

  fetchImages(query, page).then((result) => {
    if (result.images) {
      this.setState((prevState) => ({
        images: [...prevState.images, ...result.images],
        loading: false,
        error: null,
        noResults: result.images.length === 0 && prevState.images.length === 0,
        loadMore: page + 1 < Math.ceil(result.totalHits / 12),
      }));
    } else {
      this.setState({
        loading: false,
        loadMore: false,
      });
    }
  });
};

handleLoadMore = () => {
  this.setState(
    (prevState) => ({
      page: prevState.page + 1,
      loading: true,
    })
  );
};

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.fetIm();
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
            <p style={{
                  color: 'grey',
                  textAlign: 'center',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100vh',
                }}>Немає результатів</p>
          ) : (
            <>
              <ImageGallery images={images} />
              {images.length > 0 && loadMore && (
                <Button onClick={this.handleLoadMore}>Load more</Button>
              )}
              {images.length === 0 && !loading && (
                <p style={{
                  color: 'grey',
                  textAlign: 'center',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100vh',
                }}>Галерея зображень порожня... 📷</p>
              )}
            </>
          )}
        </>
      )}
    </Divapp>
  );
}
}

export default App;