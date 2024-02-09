import React from 'react';
import PropTypes from 'prop-types';

import { ContactUsModal } from '@worldresources/gfw-components';

import {
  NotFindWhatYoureLookingForWrapper,
  NotFindWhatYoureLookingForColumn,
  NotFindWhatYoureLookingForTitle,
  ContactUs,
} from './styles';

const NotFindWhatYoureLookingFor = ({ setOpen, open }) => {
  return (
    <>
      <NotFindWhatYoureLookingForWrapper>
        <NotFindWhatYoureLookingForColumn>
          <NotFindWhatYoureLookingForTitle>
            Not finding what you&apos;re looking for?
          </NotFindWhatYoureLookingForTitle>
          <ContactUs onClick={() => setOpen(!open)} light size="large">
            Contact Us
          </ContactUs>
        </NotFindWhatYoureLookingForColumn>
      </NotFindWhatYoureLookingForWrapper>

      <ContactUsModal open={open} onRequestClose={() => setOpen(false)} />
    </>
  );
};

NotFindWhatYoureLookingFor.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
};

export default NotFindWhatYoureLookingFor;
