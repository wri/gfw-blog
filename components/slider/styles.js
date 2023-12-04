import styled from '@emotion/styled';

const SliderWrapper = styled.div`
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px 0;

  ${({ backgroundImageUrl }) =>
    backgroundImageUrl &&
    `
    background-image: url('${backgroundImageUrl}');

    .title {
      color: white;
      font-size: 26px;
      font-weight: 400;
      line-height: 30px;
      letter-spacing: 0.25px;
      text-align: left;
      text-transform: uppercase;
      padding-bottom: 25px;
      padding-left: 16px;
      padding-top: 35px;
    }
    `}

  .buttons {
    display: flex;
    gap: 12px;
    padding-top: 10px;
    padding-bottom: 40px;
    padding-left: 20px;

    .button {
      background: #97bd3d;
      border-radius: 0.25rem;
      color: #ffffff;
      cursor: default;
      font-size: 0.875rem;
      height: 1.9375rem;
      line-height: 1.25rem;
      text-align: center;
      width: 1.9375rem;
    }

    svg {
      margin-top: 6px;
    }
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.25px;
    text-align: left;
    text-transform: uppercase;
    padding-bottom: 25px;
    padding-left: 16px;
    padding-top: 35px;
  }

  .slider {
    overflow: hidden;
    position: relative;
  }

  .slides {
    display: flex;
    max-width: 100vw;
    overflow-x: scroll;
    position: relative;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
  }

  .slide {
    display: flex;
    flex-shrink: 0;
    margin-right: 0px;
    transform-origin: center center;
    transform: scale(1);
    scroll-snap-align: center;
    width: 300px;
  }
`;

export default SliderWrapper;
