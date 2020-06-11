import { styled } from 'frontity';

export const CardWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 30px;
  border: 1px solid #e5e5df;
  margin: 15px 0;
`;

export const CardImage = styled.img`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #313c3c;
  margin-right: 30px;
`;

export const CardTitle = styled.h5`
  color: #333333;
  font-size: 20px;
  line-height: 36px;
`;

export const CardText = styled.p`
  color: #777777;
  font-size: 14px;
  line-height: 21px;
  margin: 10px 0;
`;
