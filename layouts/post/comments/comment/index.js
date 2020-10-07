import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { format } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';

import { Button, Column } from 'gfw-components';

import { CommentHeader, AuthorName, DateWrapper, Body } from './styles';

const Comment = ({
  author_name: authorName,
  date,
  content,
  isLast,
  onClickReply,
}) => {
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
        <Body>{ReactHtmlParser(content)}</Body>
      </Column>
    </>
  );
};

Comment.propTypes = {
  author_name: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  isLast: PropTypes.bool,
  onClickReply: PropTypes.func,
};

export default Comment;
