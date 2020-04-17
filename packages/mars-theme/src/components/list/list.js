import React from 'react';
import PropTypes from 'prop-types';
import { connect, styled, decode } from 'frontity';
import Item from './list-item';
import SubPost from './sub-post';
import MainPost from './main-post';
import Pagination from './pagination';
import { LARGE_ENDPOINT } from '../heplers/css-endpoints';

const List = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);

  return (
    <Container>
      {/* If the list is a taxonomy, we render a title. */}
      {data.isTaxonomy && (
        <Header>
          {data.taxonomy}
          :
          {' '}
          <b>{decode(state.source[data.taxonomy][data.id].name)}</b>
        </Header>
      )}

      {/* Iterate over the items of the list. */}
      {data.items.map(({ type, id }, index) => {
        const item = state.source[type][id];

        // A temporary solution to determine the main post and sub posts
        if (index === 0) {
          return <MainPost key={item.id} item={item} />;
        }
        if (index === 1 || index === 2) {
          return <SubPost key={item.id} item={item} />;
        }

        // Render one Item component for each one.
        return <Item key={item.id} item={item} />;
      })}
      <Pagination />
    </Container>
  );
};

export default connect(List);

const Container = styled.section`
  width: 1100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0;
  padding: 24px 0;
  list-style: none;
  @media screen and (max-width: ${LARGE_ENDPOINT}) {
    padding: 24px;
  }
`;

const Header = styled.h3`
  font-weight: 300;
  text-transform: capitalize;
  color: rgba(12, 17, 43, 0.9);
`;

List.propTypes = {
  state: PropTypes.object,
};
