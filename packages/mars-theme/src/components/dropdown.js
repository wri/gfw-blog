import React, { useState } from "react";
import { connect, styled, decode } from "frontity";
import PropTypes from 'prop-types';
import Link from './link';

const Dropdown = ({ state }) => {
  const data = state.source.get(state.router.link);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper className="drop-down-select-wrapper">
      {data.isCategory && (
        // eslint-disable-next-line no-shadow
        <Title onClick={() => setIsOpen(isOpen => !isOpen)}>
          {decode(state.source[data.taxonomy][data.id].name)}
        </Title>
      )}
      {isOpen && (
      <List>
        {Object.values(state.source.category).map(cat => {
          return <Item key={cat.name}><Link link={cat.link}>{cat.name}</Link></Item>
        })}
      </List>
      )}
    </Wrapper>
  );
};

export default connect(Dropdown);

Dropdown.propTypes = {
  state: PropTypes.object,
};

const Title = styled.div`
  font-size: 3rem;
  line-height: 3.75rem;
  font-weight: 200;
  color: #333;
`;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 3em;
  margin-bottom: 2em;
  
`;

const List = styled.div`
  padding: 2.5rem;
  border: 1px solid #aaa;
`;

const Item = styled.div`
  width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
`;


