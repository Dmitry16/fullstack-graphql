import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectMovies,
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';
import { loadMovies } from '../App/actions';
import { moviesLoaded } from 'containers/App/actions';


import { changeMovieTitle } from './actions';
import { makeSelectMovieTitle } from './selectors';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onChangeMovieTitle: (inputEvt, defaultValue) => {
    dispatch(changeMovieTitle(inputEvt ? inputEvt.target.value : defaultValue))
  },
  onSubmitForm: (e) => {
    if (e !== undefined && e.preventDefault) e.preventDefault();
    dispatch(loadMovies());
  },
  loadData: (movieTitle) => {
      dispatch(loadMovies(movieTitle));
  }
});

const mapStateToProps = createStructuredSelector({
  movies: makeSelectMovies(),
  currentMovieTitle: makeSelectMovieTitle(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
