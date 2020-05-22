import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'frontity';
import { format } from 'date-fns';

import { Button } from 'gfw-components';

import {
  CommentHeader,
  AuthorName,
  DateWrapper,
  Body,
  EmptyColumn,
} from './styles';

const Comment = ({
  author_name: authorName,
  date,
  content,
  libraries,
  isLast,
  onClickReply,
}) => {
  const Html2React = libraries.html2react.Component;

  return (
    <>
      <div className="columns small-12">
        <CommentHeader>
          <div>
            <AuthorName>{authorName}</AuthorName>
            {date && (
              <DateWrapper>
                {format(new Date(date), 'MMMM d, yyyy hh:mmbbbb')}
              </DateWrapper>
            )}
          </div>
          <Button theme="small button-light" onClick={onClickReply}>
            reply
          </Button>
        </CommentHeader>
      </div>
      <div className="columns small-2">
        <EmptyColumn isLast={isLast} />
      </div>
      <div className="columns small-10">
        <Body>
          <Html2React html={content.rendered} />
        </Body>
      </div>
    </>
  );
};

Comment.propTypes = {
  libraries: PropTypes.object,
  author_name: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.object,
  isLast: PropTypes.bool,
  onClickReply: PropTypes.func,
};

export default connect(Comment);
