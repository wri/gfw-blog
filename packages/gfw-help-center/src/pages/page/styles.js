import { styled } from 'frontity';
import { Row } from 'gfw-components';

import theme from '../../app/theme';

export const Wrapper = styled.div`
  width: 100%;

  ${theme.mediaQueries.small} {
    padding: 50px 0;
  }
`;

export const CategoriesWrapper = styled(Row)`
  margin-top: 90px;
`;

export const MenuCategory = styled.li`
  margin-bottom: 24px;
  font-size: 16px;

  a {
    color: #777;
  }
`;

export default Wrapper;
