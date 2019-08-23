import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import MovieListItem from 'containers/MovieListItem';

const MovieList = ({ loading, error, movies }) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (movies) {
    return <List movies={movies} component={MovieListItem} />;
  } else {
    return <h3>There is no movies with such a title :(</h3>
  }

  return null;
};

MovieList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  movies: PropTypes.any
};

export default MovieList;
