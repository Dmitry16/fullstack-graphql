/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentMovie = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentMovieTitle')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectMovies = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['movieData', 'movies'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectCurrentMovie,
  makeSelectLoading,
  makeSelectError,
  makeSelectMovies,
  makeSelectLocation,
};
