import React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from 'frontity';
import CategoryName from './name';
import Link from '../link';
import { SMALL_ENDPOINT } from '../heplers/css-endpoints';

const CategoryNameList = ({ categories, styles = '', title }) => {
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
          <CategoryName key={name + link}>
            <Link
              css={css`
                ${linkCss}
              `}
              link={link}
            >
              {name}
            </Link>
          </CategoryName>
        );
      })}
    </Wrapper>
  );
};

export default CategoryNameList;

CategoryNameList.propTypes = {
  categories: PropTypes.array,
  styles: PropTypes.string,
  title: PropTypes.string,
};

const TitleWrapper = styled.span`
  margin-right: 1rem;
  color: var(--color-medium-grey);
  text-transform: uppercase;
  font-size: 0.75rem;
  @media screen and (max-width: ${SMALL_ENDPOINT}) {
    display: block;
  }
`;
