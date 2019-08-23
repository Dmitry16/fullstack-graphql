/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectMovieTitle = () => createSelector(
  selectHome,
  (homeState) => homeState.get('currentMovieTitle')
);

export {
  selectHome,
  makeSelectMovieTitle,
};
