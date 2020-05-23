import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import Link from '../link';

import { ListWrapper, ListItem } from './styles';

const ResultsList = ({ items, libraries, onClickResult }) => {
  const Html2React = libraries.html2react.Component;

  return (
    <ListWrapper>
      {items.map((item) => (
        <ListItem key={item.name}>
          <Link link={item.link} onClick={onClickResult}>
            <Html2React html={item.name} />
          </Link>
        </ListItem>
      ))}
    </ListWrapper>
  );
};

export default connect(ResultsList);

ResultsList.propTypes = {
  items: PropTypes.object,
  libraries: PropTypes.object,
  onClickResult: PropTypes.func,
};
