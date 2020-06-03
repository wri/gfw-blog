import { styled } from 'frontity';
import theme from '../../../app/theme';

export const ButtonsContainer = styled.div`
  display: flex;

  ${theme.mediaQueries.small} {
    flex-direction: column;
  }

  > a,
  > button {
    margin: 0 20px 20px 0;
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
