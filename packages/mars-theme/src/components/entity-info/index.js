import React, { useState } from 'react';
import { connect, styled, decode, css } from 'frontity';
import PropTypes from 'prop-types';
import EntityDescription from './description';
import CategoryList from './category-list';
import AuthorList from './authors-list';
import TagList from './tags-list';
import { SMALL_ENDPOINT, MEDIUM_ENDPOINT } from '../heplers/css-endpoints';
import ChevronDown from '../../assets/icons/chevron-down.svg';
import ChevronUp from '../../assets/icons/chevron-up.svg';

const EntityInfo = ({ state }) => {
  const data = state.source.get(state.router.link);
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    // eslint-disable-next-line no-shadow
    setIsOpen((isOpen) => !isOpen);
  };

  if (data.isHome) {
    return null;
  }

  return (
    <div
      className="row"
      css={css`
        margin-bottom: 30px;
      `}
    >
      <div className="column small-12 medium-7">
        <DropDownWrapper
          onClick={toggleHandler}
          className="drop-down-select-wrapper"
        >
          {data.isAuthor && (
            <Title>{decode(state.source.author[data.id].name)}</Title>
          )}
          {data.isTag && (
            <Title>{decode(state.source.tag[data.id].name)}</Title>
          )}
          {data.isCategory && (
            <Title>{decode(state.source[data.taxonomy][data.id].name)}</Title>
          )}
          <TogglerBox>
            {isOpen ? (
              <img src={ChevronUp} alt="" />
            ) : (
              <img src={ChevronDown} alt="" />
            )}
          </TogglerBox>
        </DropDownWrapper>
        <ListWrapper>
          {isOpen && (
            <List>
              {data.isAuthor && <AuthorList handler={toggleHandler} />}
              {data.isCategory && <CategoryList handler={toggleHandler} />}
              {data.isTag && <TagList handler={toggleHandler} />}
            </List>
          )}
        </ListWrapper>
        <EntityDescription />
      </div>
    </div>
  );
};

export default connect(EntityInfo);

EntityInfo.propTypes = {
  state: PropTypes.object,
};

const TogglerBox = styled.div`
  width: 14px;
  height: auto;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 3rem;
  line-height: 3.75rem;
  font-weight: 200;
  color: #333;
  @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
    font-size: 1.875rem;
    line-height: 1.25;
  }
`;

const DropDownWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--color-grey);
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: -1px;
  position: relative;
  z-index: 3;
`;

const List = styled.div`
  padding: 1.25rem 2rem;
  border: 1px solid #aaa;
  position: absolute;
  width: 100%;
  z-index: 1;
  background: #fff;
  min-height: 23.75rem;
  max-height: 43rem;
  overflow-y: auto;
  @media screen and (min-width: ${SMALL_ENDPOINT}) {
    padding: 1.75rem 2.5rem;
  }
`;
