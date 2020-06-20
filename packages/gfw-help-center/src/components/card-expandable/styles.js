import { styled } from 'frontity';

export const Card = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid #e5e5df;
  padding: 30px 54px;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

export const Icon = styled.img`
  width: 12px;
  height: 12px;
  margin: 9px 0;
  z-index: 1;
  position: relative;
`;

export const Title = styled.h4`
  color: #333333;
  font-size: 22px;
  line-height: 28px;
  z-index: 1;
  position: relative;
  text-align: left;
`;

export const Text = styled.div`
  font-size: 16px;
  line-height: 21px;
  z-index: 1;
  position: relative;
  margin-top: 20px;

  p {
    text-align: left;
  }
`;
