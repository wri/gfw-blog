import styled from '@emotion/styled';
import { theme } from '@worldresources/gfw-components';

export const CommentTitle = styled.h5`
  font-size: 1.125rem;
  line-height: 1.5rem;
  color: ${theme.colors.darkesGrey};
  text-transform: uppercase;
  margin-bottom: 1.875rem;
`;

export const ModerationMessage = styled.p`
  display: flex;
  justify-content: center;
  padding: 1.875rem 1rem;
  color: ${theme.colors.darkGrey};

  i {
    font-style: italic;
  }
`;

export const AgreeBoxWrapper = styled.div`
  margin-top: -0.625rem;

  .label {
    label {
      display: none;
    }
  }
`;
