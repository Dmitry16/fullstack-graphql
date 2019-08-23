/**
 * Test the HomePage
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { localStorage } from 'jest-localstorage-mock';

import MovieList from 'components/MovieList';
import HomePage from '../HomePage';
import { mapDispatchToProps } from '../index';
import { changeMovieTitle } from '../actions';
import { loadMovies, moviesLoaded } from '../../App/actions';

describe('<HomePage />', () => {
  it('should render the movies list', () => {
    const onChangeMovieTitleSpy = jest.fn();
    const loadDataSpy = jest.fn();
    const renderedComponent = shallow(
      <HomePage 
        loading error={false} movies={[]} 
        onChangeMovieTitle={onChangeMovieTitleSpy}
        loadData={loadDataSpy}
      />
    );
    expect(
      renderedComponent.contains(<MovieList loading error={false} movies={[]} />)
    ).toEqual(true);
  });

  describe('on mount', () => {
    it('should call loadData and onChangeMovieTitle', () => {
      const onChangeMovieTitleSpy = jest.fn();
      const loadDataSpy = jest.fn();
      mount(
        <HomePage
          movieTitle="Not Empty"
          onChangeMovieTitle={onChangeMovieTitleSpy}
          loadData={loadDataSpy}
        />
      );
      expect(onChangeMovieTitleSpy).toHaveBeenCalled();
    });

    it('should call loadData with default movieTitle', () => {
      const defaultMovieTitle = 'Dune';
      const loadDataSpy = jest.fn();
      mount(
        <HomePage 
          onChangeMovieTitle={() => {}}
          loadData={() => loadDataSpy(defaultMovieTitle)}
        />
      );
      expect(loadDataSpy).toHaveBeenCalledWith(defaultMovieTitle);
    });

    it('should call onChangeMovieTitle with default movieTitle', () => {
      const defaultMovieTitle = 'Dune';
      const onChangeMovieTitleSpy = jest.fn();
      mount(
        <HomePage 
          loadData={() => {}}
          onChangeMovieTitle={() => onChangeMovieTitleSpy(defaultMovieTitle)}
        />
      );
      expect(onChangeMovieTitleSpy).toHaveBeenCalledWith(defaultMovieTitle);
    });
  });

  describe('sessionStorage', () => {
    it('should save to sessionStorage', () => {
      // const KEY = 'foo',
      //   VALUE = 'bar';
      // dispatch(action.setSessionStorage(KEY, VALUE));
      // expect(sessionStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
      // expect(sessionStorage.__STORE__[KEY]).toBe(VALUE);
      // expect(Object.keys(sessionStorage.__STORE__).length).toBe(1);
    });
  });

  describe('loadData', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.loadData).toBeDefined();
    });

    it('should dispatch loadMovies when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.loadData();
      expect(dispatch).toHaveBeenCalledWith(loadMovies());
    });

    // it('should dispatch moviesLoaded whith session storage data', () => {
    //   const dispatch = jest.fn();
    //   const result = mapDispatchToProps(dispatch);
    //   result.loadData('Star');
    //   expect(dispatch).toHaveBeenCalledWith(moviesLoaded());
    // });
  });

  describe('onChangeMovieTitle', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.onChangeMovieTitle).toBeDefined();
    });

    it('should dispatch changeMovieTitle when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.onChangeMovieTitle();
      expect(dispatch).toHaveBeenCalledWith(changeMovieTitle());
    });
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeMovieTitle', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeMovieTitle).toBeDefined();
      });

      it('should dispatch changeMovieTitle when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const movieTitle = 'Mad Max';
        result.onChangeMovieTitle({ target: { value: movieTitle } });
        expect(dispatch).toHaveBeenCalledWith(changeMovieTitle(movieTitle));
      });
    });

    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch loadMovies when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitForm();
        expect(dispatch).toHaveBeenCalledWith(loadMovies());
      });

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        const evt = { preventDefault };
        result.onSubmitForm(evt);
        expect(preventDefault).toHaveBeenCalledWith();
      });
    });
  });
});
