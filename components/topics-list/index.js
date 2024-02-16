import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './styles';

const TopicsList = ({ topics, onSelectTopic, selectedTopics }) => {
  const handleClick = (topic) => {
    onSelectTopic(topic.slug);
  };

  return (
    <Wrapper>
      {topics.map((topic) => (
        <a
          key={topic.slug}
          onClick={() => handleClick(topic)}
          href={`/blog/tag/${topic.slug}/`}
        >
          <span
            className={
              selectedTopics.includes(topic.slug) ? 'selected' : 'span'
            }
          >
            {topic.name}
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
