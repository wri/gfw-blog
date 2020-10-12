import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Divider from './divider';
import Wrapper from './styles';

const Breadcrumbs = ({ links }) => {
  return (
    <Wrapper className="notranslate">
      <Link href="/">Blog home</Link>
      {links?.map(({ label, ...link }) => (
        <Fragment key={label}>
          <Divider />
          {link.href ? <Link {...link}>{label}</Link> : label}
        </Fragment>
      ))}
    </Wrapper>
  );
};

Breadcrumbs.propTypes = {
  links: PropTypes.array,
};

export default Breadcrumbs;
