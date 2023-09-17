import React from 'react';
import { Searchbarr, FormSearch, SearchButton, ButtonLabel, Input } from './Searchbar.styled';
import PropTypes from 'prop-types';


class Searchbar extends React.Component {
  state = {
    query: ''
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <Searchbarr>
        <FormSearch onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
                      <ButtonLabel>Search</ButtonLabel>
          </SearchButton>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </FormSearch>
      </Searchbarr>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default Searchbar;