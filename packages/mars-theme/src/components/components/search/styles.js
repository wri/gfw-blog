import { styled } from 'frontity';
import theme from '../../theme';

export const Wrapper = styled.div`
  height: 80px;
  width: 100%;

  ${({ open }) =>
    open &&
    `
    position: absolute;
    left: 0;
    right: 0;
    max-width: 1120px;
    padding: 0 16px;
    margin: 0 auto;

    ${theme.mediaQueries.small} {
      padding: 0 20px;
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 80px;
  border-bottom: solid 1px transparent;

  ${({ open }) =>
    open &&
    `
    border-bottom-color: ${theme.colors.grey};
  `}
`;

export const SearchClosed = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchOpen = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const OpenMessage = styled.span`
  color: ${theme.colors.mediumGrey};
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 400;
  margin-right: 10px;
`;

export const Input = styled.input`
  appearance: none;
  width: 100%;
  height: 100%;
  background: ${theme.colors.white};
  border: none;
  border-radius: 0;
`;

// const RemoveIcon = styled.div`
// cursor: pointer;
// margin-left: 1rem;
// `;

// const Title = styled.div`
// text-transform: uppercase;
// color: #777;
// font-size: 0.75rem;
// line-height: 1.5rem;
// height: 1.5rem;
// min-width: 130px;
// max-width: 150px;
// `;

// const ReadyContent = styled.div`
// display: flex;
// flex-wrap: wrap;
// align-items: center;
// `;

// const ReadyTitle = styled.div`
// width: 100%;
// font-size: 3rem;
// line-height: 3.75rem;
// font-weight: 200;
// color: #333;
// @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
//   margin: 0 1rem;
// }
// `;

// const SearchBox = styled.div`
// display: flex;
// align-items: center;
// height: 1.5rem;
// `;
