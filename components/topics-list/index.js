import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './styles';

const TopicsList = ({ topics, onSelectTopic, selectedTopics }) => {
  const handleClick = (topic) => {
    onSelectTopic(topic.slug);
  };

  return (
    <Wrapper>
      {topics.map((t) => (
        <button key={t.slug} onClick={() => handleClick(t)}>
          <span
            className={selectedTopics.includes(t.slug) ? 'selected' : 'span'}
          >
            {t.name}
          </span>
        </button>
      ))}
    </Wrapper>
  );
};

export default TopicsList;

TopicsList.propTypes = {
  topics: PropTypes.array.isRequired,
  onSelectTopic: PropTypes.func,
  selectedTopics: PropTypes.array,
};
