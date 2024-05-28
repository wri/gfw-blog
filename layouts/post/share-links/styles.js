import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 3rem;

  ${theme.mediaQueries.small} {
    margin-left: -1.6rem;
  }

  > a,
  > button {
    margin: 0.5rem;
  }
`;

export const Label = styled.span`
  font-size: 1rem;
  line-height: 1.5;
  color: #777;
  display: none;

  ${theme.mediaQueries.small} {
    display: block;
  }
`;
