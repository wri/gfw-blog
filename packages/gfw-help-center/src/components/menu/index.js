import React from 'react';
import PropTypes from 'prop-types';

import Link from '../link';

import { MenuItem } from './styles';

const Menu = ({ links }) => (
  <ul>
    {links?.map((l) => (
      <MenuItem active={l.active} key={l.label}>
        <Link link={l.link} onClick={() => {}}>
          {l.label}
        </Link>
      </MenuItem>
    ))}
  </ul>
);

Menu.propTypes = {
  links: PropTypes.array,
};

export default Menu;
