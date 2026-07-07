import { Global, css } from '@emotion/core';

import gnwBadgeSrc from 'assets/logos/gfw.png';

const gnwBadge =
  typeof gnwBadgeSrc === 'string' ? gnwBadgeSrc : gnwBadgeSrc.src;

const footerLogoStyles = css`
  .footer-partnership-logos a {
    display: inline-block;
    width: 76px;
    height: 73px;
    background: url(${gnwBadge}) center / contain no-repeat;
  }

  .footer-partnership-logos .gfw-logo {
    opacity: 0;
    width: 76px;
    height: 73px;
  }
`;

const FooterLogoStyles = () => <Global styles={footerLogoStyles} />;

export default FooterLogoStyles;
