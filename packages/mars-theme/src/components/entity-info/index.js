import React, { useState } from 'react';
import { connect, styled, decode } from 'frontity';
import PropTypes from 'prop-types';
import EntityDescription from './description';
import CategoryList from './category-list';
import AuthorList from './authors-list';
import TagList from './tags-list';
import { SMALL_ENDPOINT, MEDIUM_ENDPOINT } from '../heplers/css-endpoints';

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
    <Wrapper>
      <DropDownWrapper
        onClick={toggleHandler}
        className="drop-down-select-wrapper"
      >
        {data.isAuthor && (
          <Title>{decode(state.source.author[data.id].name)}</Title>
        )}
        {data.isTag && <Title>{decode(state.source.tag[data.id].name)}</Title>}
        {data.isCategory && (
          <Title>{decode(state.source[data.taxonomy][data.id].name)}</Title>
        )}
        <TogglerBox>{isOpen ? <ArrowUp /> : <ArrowDown />}</TogglerBox>
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
    </Wrapper>
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

const Wrapper = styled.div`
  margin-top: 1.1875rem;
  margin-bottom: 1.1875rem;
  width: 100%;
  @media screen and (min-width: ${MEDIUM_ENDPOINT}) {
    width: 635px;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: -1px;
  position: relative;
`;

const ArrowUp = styled.div`
  cursor: pointer;
  width: 14px;
  height: 14px;
  position: relative;
  :after,
  :before {
    bottom: 0%;
    left: 100%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  :after {
    border-color: rgba(241, 241, 241, 0);
    border-bottom-color: #fff;
    border-width: 5px;
    margin-left: -12px;
  }
  :before {
    border-color: rgba(221, 221, 221, 0);
    border-bottom-color: var(--color-darkest-grey);
    border-width: 7px;
    margin-left: -14px;
  }
`;

const ArrowDown = styled.div`
  cursor: pointer;
  width: 14px;
  height: 14px;
  position: relative;
  :after,
  :before {
    top: 50%;
    left: 100%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  :after {
    border-color: rgba(241, 241, 241, 0);
    border-top-color: #fff;
    border-width: 5px;
    margin-left: -12px;
  }
  :before {
    border-color: rgba(221, 221, 221, 0);
    border-top-color: var(--color-darkest-grey);
    border-width: 7px;
    margin-left: -14px;
  }
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
