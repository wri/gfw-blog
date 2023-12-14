import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  width: 100%;

  .icon {
    position: absolute;
    z-index: 1;
    bottom: -0.25rem;
    left: -0.0625rem;
    cursor: pointer;
  }
`;

export const StyledImage = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
