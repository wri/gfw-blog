import { styled } from 'frontity';
import theme from '../../../../app/theme';

export const CommentTitle = styled.h5`
  font-size: 18px;
  line-height: 24px;
  color: ${theme.colors.darkesGrey};
  text-transform: uppercase;
  margin-bottom: 30px;
`;

export const ModerationMessage = styled.p`
  display: flex;
  justify-content: center;
  padding: 30px 16px;
  color: ${theme.colors.darkGrey};

  i {
    font-style: italic;
  }
`;

export const AgreeBoxWrapper = styled.div`
  margin-top: -10px;

  .label {
    label {
      display: none;
    }
  }
`;
