import { shallow, mount } from 'enzyme';
import React from 'react';

import MovieListItem from 'containers/MovieListItem';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import MovieList from '../index';

describe('<MoviesList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(<MovieList loading />);
    expect(
      renderedComponent.contains(<List component={LoadingIndicator} />)
    ).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <MovieList loading={false} error={{ message: 'Loading failed!' }} />
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should render "There is no movies with such a title"', () => {
    const renderedComponent = shallow(
      <MovieList movies={false} error={false} loading={false} />
    );
    expect(renderedComponent.html()).toContain(
      'There is no movies with such a title :('
    );
  });
});
