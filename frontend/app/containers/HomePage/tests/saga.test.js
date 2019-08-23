/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { LOAD_MOVIES } from 'containers/App/constants';
import { moviesLoaded, movieLoadingError } from 'containers/App/actions';

import moviesData, { getMovies } from '../saga';

const currentMovieTitle = 'Blade Runner';

/* eslint-disable redux-saga/yield-effects */
describe('getMovies Saga', () => {
  let getMoviesGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getMoviesGenerator = getMovies();

    const selectDescriptor = getMoviesGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getMoviesGenerator.next(currentMovieTitle).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should call the movieLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getMoviesGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(movieLoadingError(response)));
  });
});

describe('moviesData Saga', () => {
  const moviesDataSaga = moviesData();

  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = moviesDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_MOVIES, getMovies));
  });
});
