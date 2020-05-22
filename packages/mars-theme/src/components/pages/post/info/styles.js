import { styled } from 'frontity';
import theme from '../../../theme';

export const Wrapper = styled.div``;

export const ButtonsContainer = styled.div`
  display: flex;

  ${theme.mediaQueries.small} {
    flex-direction: column;
  }

  a {
    margin: 0 20px 20px 0;
  }
`;

export const InfoItem = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: #777;
  font-size: 0.875rem;
  margin-bottom: 20px;

  a {
    color: #777;

    &:hover {
      color: #658022;
    }
  }

  ${theme.mediaQueries.small} {
    display: flex;
    align-items: baseline;
    margin-bottom: 10px;
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

export const InfoContainer = styled.div`
  margin-bottom: 1.25rem;

  ${theme.mediaQueries.small} {
    margin-bottom: 2.5rem;
  }
`;

export const BoldTitle = styled.div`
  font-weight: 500;
`;
