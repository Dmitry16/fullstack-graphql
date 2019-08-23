import { fromJS } from 'immutable';

import {
  selectGlobal,
  makeSelectCurrentMovie,
  makeSelectLoading,
  makeSelectError,
  makeSelectMovies,
  makeSelectLocation,
} from '../selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectCurrentMovie', () => {
  const currentMovieSelector = makeSelectCurrentMovie();
  it('should select the current user', () => {
    const movieTitle = 'Star Wars';
    const mockedState = fromJS({
      global: {
        currentMovieTitle: movieTitle,
      },
    });
    expect(currentMovieSelector(mockedState)).toEqual(movieTitle);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      global: {
        error,
      },
    });
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectMovies', () => {
  const moviesSelector = makeSelectMovies();
  it('should select the repos', () => {
    const movies = fromJS([]);
    const mockedState = fromJS({
      global: {
        movieData: {
          movies,
        },
      },
    });
    expect(moviesSelector(mockedState)).toEqual(movies);
  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const route = fromJS({
      location: { pathname: '/foo' },
    });
    const mockedState = fromJS({
      route,
    });
    expect(locationStateSelector(mockedState)).toEqual(route.get('location').toJS());
  });
});
