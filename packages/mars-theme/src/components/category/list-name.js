import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from 'frontity';
import CategoryName from './name';
import Link from '../link';
import { SMALL_ENDPOINT } from '../heplers/css-endpoints';

const CategoryNameList = ({
  categories,
  styles = '',
  itemStyles = '',
  title,
}) => {
  const Wrapper = styled.p`
    ${styles}
  `;
  const linkCss = `
    color: #fff;
    font-size: 0.75rem;
    line-height: 0.75rem;
    :hover, :visited, :active {
      text-decoration: none;
    }
  `;
  return (
    <Wrapper className="categories-list-wrapper">
      {title && <TitleWrapper>{title}</TitleWrapper>}
      {categories.map(({ name, link }) => {
        return (
          <Link
            key={name + link}
            css={css`
              ${linkCss}
            `}
            link={link}
          >
            <CategoryName styles={itemStyles}>{name}</CategoryName>
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default CategoryNameList;

CategoryNameList.propTypes = {
  categories: PropTypes.array,
  styles: PropTypes.string,
  itemStyles: PropTypes.string,
  title: PropTypes.string,
};

const TitleWrapper = styled.span`
  margin-bottom: 25px;
  color: var(--color-medium-grey);
  text-transform: uppercase;
  font-size: 0.75rem;
  display: block;
  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    margin-right: 20px;
    display: inline;
  }
`;
