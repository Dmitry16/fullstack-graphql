import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentMovie } from 'containers/App/selectors';
import MovieListItem from './MovieListItem';

export default connect(
  createStructuredSelector({
    currentUser: makeSelectCurrentMovie()
  })
)(MovieListItem);
