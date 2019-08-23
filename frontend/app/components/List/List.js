import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const List = (props) => {
  const ComponentToRender = props.component;
  let content = (<div></div>);

  // If we have movies, render them
  if (props.movies) {
    content = props.movies.map((movie) => (
      <ComponentToRender key={`movie-${movie.imdbID}`} movie={movie} />
    ));
  } else {
    // Otherwise render a single component
    content = (<ComponentToRender />);
  }

  return (
    <div className="list-wrapper">
      {content}
    </div>
  );
};

List.propTypes = {
  component: PropTypes.func.isRequired,
  movies: PropTypes.array,
};

export default List;
