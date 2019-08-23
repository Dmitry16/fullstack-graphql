/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { 
  CHANGE_MOVIE_TITLE,
  CHECK_SESSION_STORAGE,
  SET_SESSION_STORAGE
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {movieTitle} The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeMovieTitle(movieTitle) {
  return {
    type: CHANGE_MOVIE_TITLE,
    movieTitle
  };
}

export function setSessionStorage(name, val) {
  sessionStorage.setItem(name, JSON.stringify(val));
  return {
    type: SET_SESSION_STORAGE,
    name,
    val
  };
}
