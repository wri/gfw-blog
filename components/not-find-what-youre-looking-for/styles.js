import styled from '@emotion/styled';
import { theme, Row, Column, Button } from '@worldresources/gfw-components';

export const NotFindWhatYoureLookingForWrapper = styled(Row)`
  background-size: cover;
  background-image: url('images/hero-bg-mobile.png');
  max-width: 100%;
  width: 100%;
  height: 15.625rem;

  ${theme.mediaQueries.small} {
    background-image: url('images/hero-bg-desktop.png');
    height: 20.5625rem;
  }
`;

export const NotFindWhatYoureLookingForColumn = styled(Column)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-image: url('../../images/no-results-bg.png');
`;

export const NotFindWhatYoureLookingForTitle = styled.h2`
  color: rgb(255, 255, 255);
  font-size: 1.25rem;
  margin-bottom: 2.25rem;
  font-family: Fira Sans;
  font-style: normal;
  font-weight: 400;
  line-height: 3rem;
  letter-spacing: 0.01563rem;
  text-align: center;

  ${theme.mediaQueries.small} {
    font-size: 2.125rem;
  }
`;

export const ContactUs = styled(Button)`
  color: rgb(151, 190, 50);
  font-size: 0.875rem;

  ${theme.mediaQueries.small} {
    font-size: 1rem;
  }
`;
