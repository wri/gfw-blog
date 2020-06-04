import { styled } from 'frontity';

export const Card = styled.div`
  position: relative;
  height: 480px;
  padding: 50px 40px 0 40px;
  border: 1px solid #e5e5df;
  background-color: #f6f6f4;
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
  max-width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

export const Logo = styled.img`
  position: absolute;
  left: -88px;
  bottom: -88px;
`;
