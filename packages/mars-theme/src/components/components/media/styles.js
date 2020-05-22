import { styled } from 'frontity';
import Image from '@frontity/components/image';

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const StyledImage = styled(Image)`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
