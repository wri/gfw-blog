import { styled } from 'frontity';
import { H4 } from 'gfw-components';

export const H4Wrapper = styled(H4)`
  margin: 100px 0 50px;
`;

export const Banner = styled.div`
  position: relative;
  overflow: hidden;
  height: 240px;
  width: 100%;
  margin-bottom: 30px;
  padding: 55px 80px;
  background-color: #69695d;
`;

export const BannerBackground = styled.img`
  position: absolute;
  top: -280px;
  left: 0;
  width: 100%;
`;

export const BannerTitle = styled.h3`
  width: 249px;
  margin: 14px 0;
  color: #fff;
  font-size: 22px;
  line-height: 28px;
`;

export const BannerText = styled.p`
  width: 350px;
  color: #f6f6f4;
  font-size: 14px;
  line-height: 21px;
`;
