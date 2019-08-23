import { fromJS } from 'immutable';

import {
  selectHome,
  makeSelectMovieTitle,
} from '../selectors';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      movieData: {},
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(selectHome(mockedState)).toEqual(homeState);
  });
});

describe('makeSelectMovieTitle', () => {
  const movieSelector = makeSelectMovieTitle();
  it('should select the movieTitle', () => {
    const currentMovieTitle = 'Dune';
    const mockedState = fromJS({
      home: {
        currentMovieTitle,
      },
    });
    expect(movieSelector(mockedState)).toEqual(currentMovieTitle);
  });
});
