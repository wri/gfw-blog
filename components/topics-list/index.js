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
        <a
          key={t.slug}
          onClick={() => handleClick(t)}
          href={`/blog/tag/${t.slug}/`}
        >
          <span
            className={selectedTopics.includes(t.slug) ? 'selected' : 'span'}
          >
            {t.name}
          </span>
        </a>
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
