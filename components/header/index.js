import { Header as HeaderComponent } from '@worldresources/gfw-components';
import PropTypes from 'prop-types';

import gnwBadgeSrc from 'assets/logos/gfw.png';

const gnwBadge =
  typeof gnwBadgeSrc === 'string' ? gnwBadgeSrc : gnwBadgeSrc.src;

const Header = (props) => {
  const { setOpen, handleLangSelect, notifications } = props;

  return (
    <HeaderComponent
      relative
      customLogo={gnwBadge}
      pathname="https://globalforestwatch.org/blog"
      openContactUsModal={() => setOpen(true)}
      afterLangSelect={handleLangSelect}
      notifications={notifications}
    />
  );
};

Header.propTypes = {
  setOpen: PropTypes.func,
  handleLangSelect: PropTypes.func,
  notifications: PropTypes.array,
};

export default Header;
