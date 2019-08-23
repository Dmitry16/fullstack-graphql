import { fromJS } from 'immutable';

import appReducer from '../reducer';
import {
  loadMovies,
  moviesLoaded,
  movieLoadingError,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      currentMovieTitle: false,
      movieData: fromJS({
        movies: false,
      }),
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadMovies action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['movieData', 'movies'], false);

    expect(appReducer(state, loadMovies())).toEqual(expectedResult);
  });

  it('should handle the moviesLoaded action correctly', () => {
    const fixture = [{
      title: 'test',
    }];
    const movieTitle = 'test';
    const expectedResult = state
      .setIn(['movieData', 'movies'], fixture)
      .set('loading', false)
      .set('currentMovieTitle', movieTitle);

    expect(appReducer(state, moviesLoaded(fixture, movieTitle))).toEqual(expectedResult);
  });

  it('should handle the movieLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, movieLoadingError(fixture))).toEqual(expectedResult);
  });
});
