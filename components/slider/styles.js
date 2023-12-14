import styled from '@emotion/styled';

const SliderWrapper = styled.div`
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0.625rem 0;

  ${({ withBackground }) =>
    withBackground &&
    `
    background-color: #333333;

    .title {
      color: white;
      font-size: 1.625rem;
      font-weight: 400;
      line-height: 1.875rem;
      letter-spacing: 0.1.5625rem;
      text-align: left;
      text-transform: uppercase;
      padding-bottom: 1.5625rem;
      padding-left: 1rem;
      padding-top: 2.1875rem;
    }
    `}

  .buttons {
    display: flex;
    gap: 0.75rem;
    padding-top: 0.625rem;
    padding-bottom: 2.5rem;
    padding-left: 1.25rem;

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
      margin-top: 0.375rem;
    }
  }

  .title {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.125rem;
    letter-spacing: 0.1.5625rem;
    text-align: left;
    text-transform: uppercase;
    padding-bottom: 1.5625rem;
    padding-left: 1rem;
    padding-top: 2.1875rem;
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

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .slides::-webkit-scrollbar {
    display: none;
  }

  .slide {
    display: flex;
    flex-shrink: 0;
    margin-right: 0;
    transform-origin: center center;
    transform: scale(1);
    scroll-snap-align: center;
    width: 18.75rem;
  }
`;

export default SliderWrapper;
