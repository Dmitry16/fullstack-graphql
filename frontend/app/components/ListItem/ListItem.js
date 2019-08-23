import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ListItem = (props) => (
  <section className="list-item-wrapper">
    <div className="list-item">{props.item}</div>
  </section>
);

ListItem.propTypes = {
  item: PropTypes.any
};

export default ListItem;
