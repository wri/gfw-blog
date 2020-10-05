import styled from '@emotion/styled';

// eslint-disable-next-line import/prefer-default-export
export const PostsWrapper = styled.div`
  position: relative;

  ${({ waiting }) =>
    waiting &&
    `
    min-height: 200px;
  `}
`;
