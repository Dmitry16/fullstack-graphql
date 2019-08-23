/**
 * Test the repo list item
 */

import React from 'react';
import { shallow, render } from 'enzyme';

import ListItem from 'components/ListItem';
import MovieListItem from '../MovieListItem';

const renderComponent = (props = {}) => render(<MovieListItem {...props} />);

describe.only('<MovieListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      movie: {
        Title: "Doctor Blo",
        Poster: "N/A",
        Type: "movie",
        Year: "1988",
        imdbID: "tt0137759"
      },
      currentMovieTitle: "Dune"
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallow(<MovieListItem item={item} />);
    expect(renderedComponent.find(ListItem).length).toBe(1);
  });

  it('should not render the current moviTitle', () => {
    const renderedComponent = renderComponent({
      item,
      currentMovieTitle: item.currentMovieTitle
    });
    expect(renderedComponent.text()).not.toContain(item.movie.Title);
  });
});
