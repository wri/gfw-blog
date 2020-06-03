import { styled } from 'frontity';

export const Card = styled.div`
  position: relative;
  height: 480px;
  border: 1px solid #cacabe;
  background-color: #e5e5df;
  padding: 50px 40px 0 40px;
`;

export const Title = styled.h1`
  color: #333333;
  font-size: 30px;
  font-weight: 300;
  line-height: 40px;
`;

export const Text = styled.p`
  margin-top: 20px;
  color: #555555;
  font-size: 18px;
  line-height: 30px;
`;

export const Image = styled.img`
  position: absolute;
  bottom: 0;
`;
