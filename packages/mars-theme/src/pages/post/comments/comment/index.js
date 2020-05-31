import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { format } from 'date-fns';

import { Button, Column } from 'gfw-components';

import {
  CommentHeader,
  AuthorName,
  DateWrapper,
  Body
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
      <Column>
        <CommentHeader>
          <div>
            <AuthorName>{authorName}</AuthorName>
            {date && (
              <DateWrapper>
                {format(new Date(date), 'MMMM d, yyyy hh:mmbbbb')}
              </DateWrapper>
            )}
          </div>
          <Button size="small" light onClick={onClickReply}>
            reply
          </Button>
        </CommentHeader>
      </Column>
      <Column
        width={[1 / 8]}
        css={css`
          ${isLast &&
          `
            background-color: white;
          `}
        `}
      />
      <Column
        width={[7 / 8]}
        css={css`
          ${isLast &&
          `
            background-color: white;
          `}
        `}
      >
        <Body>
          <Html2React html={content.rendered} />
        </Body>
      </Column>
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
