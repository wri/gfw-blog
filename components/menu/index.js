import React from 'react';
import PropTypes from 'prop-types';
import { Mobile } from 'gfw-components';

import Link from 'next/link';

import { MenuWrapper, MenuItem, Title } from './styles';

const Menu = ({ links }) => (
  <MenuWrapper>
    <Mobile>
      <Title>Categories</Title>
    </Mobile>
    {links?.map((l) => (
      <MenuItem active={l.active} key={l.label}>
        {l.link ? (
          <Link href={l.link}>
            {`${l.label}${l.count ? ` (${l.count})` : ''}`}
          </Link>
        ) : (
          <button onClick={l.onClick}>
            {`${l.label}${l.count ? ` (${l.count})` : ''}`}
          </button>
        )}
      </MenuItem>
    ))}
  </MenuWrapper>
);

Menu.propTypes = {
  links: PropTypes.array,
};

export default Menu;
