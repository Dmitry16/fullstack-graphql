import {
  LOAD_MOVIES,
  LOAD_MOVIES_SUCCESS,
  LOAD_MOVIES_ERROR,
} from '../constants';

import {
  loadMovies,
  moviesLoaded,
  movieLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('loadMovies', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_MOVIES,
      };

      expect(loadMovies()).toEqual(expectedResult);
    });
  });

  describe('moviesLoaded', () => {
    it('should return the correct type and the passed movies', () => {
      const fixture = ['Test'];
      const currentMovieTitle = 'test';
      const expectedResult = {
        type: LOAD_MOVIES_SUCCESS,
        movies: fixture,
        currentMovieTitle,
      };

      expect(moviesLoaded(fixture, currentMovieTitle)).toEqual(expectedResult);
    });
  });

  describe('movieLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_MOVIES_ERROR,
        error: fixture,
      };

      expect(movieLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
