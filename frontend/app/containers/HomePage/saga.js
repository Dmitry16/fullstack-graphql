/**
 * Gets the movies from the backend REST Api
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_MOVIES } from 'containers/App/constants';
import { moviesLoaded, movieLoadingError } from 'containers/App/actions';
import { setSessionStorage } from 'containers/HomePage/actions';

import request from 'utils/request';
import { makeSelectMovieTitle } from 'containers/HomePage/selectors';

/**
 * Backend data request/response handler
 */
export function* getMovies() {
  // Select movieTitle from store
  const movieTitle = yield select(makeSelectMovieTitle());
  const requestURL = `http://localhost:3003/api/search?keyword=${movieTitle}`;

  try {
    // Call the request helper (see 'utils/request')
    const movies = yield call(request, requestURL);
    yield put(moviesLoaded(movies.Search, movieTitle));
    // yield put(setSessionStorage(movieTitle, movies))
  } catch (err) {
    yield put(movieLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* moviesData() {
  // Watches for LOAD_MOVIES actions and calls getMovies when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  yield takeLatest(LOAD_MOVIES, getMovies);
}
