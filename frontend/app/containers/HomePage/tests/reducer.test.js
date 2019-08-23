import { fromJS } from 'immutable';

import homeReducer from '../reducer';
import { changeMovieTitle } from '../actions';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      currentMovieTitle: ''
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the movieTitle action correctly', () => {
    const fixture = 'Mad Max';
    const expectedResult = state.set('currentMovieTitle', fixture);
    expect(homeReducer(state, changeMovieTitle(fixture))).toEqual(expectedResult);
  });
});
