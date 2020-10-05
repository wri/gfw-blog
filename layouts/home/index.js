import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';

import { Row, Column, Desktop } from 'gfw-components';

import ToolCard from 'components/card-tool';
import SimpleCard from 'components/card-simple';
import Search from 'components/search';

import ArrowIcon from 'assets/icons/arrow.svg';

import {
  Wrapper,
  Prompt,
  Tag,
  Arrow,
  ToolsTitle,
  ToolCardsWrapper,
  SearchWrapper,
  Intro,
} from './styles';

const HomePage = ({ homepage, tools }) => {
  const primaryTools = tools?.slice(0, 4);
  const secondaryTools = tools?.slice(4, 8);

  return (
    <Wrapper>
      <Row>
        <Column width={[1, 5 / 6, 2 / 3]}>
          <Intro
            title={homepage?.title}
            description={ReactHtmlParser(homepage?.excerpt?.rendered)}
          />
        </Column>
        <SearchWrapper>
          <Search expanded />
        </SearchWrapper>
      </Row>
      <Row
        css={css`
          margin-bottom: 30px;
        `}
      >
        <Column>
          <ToolsTitle>Getting started on the GFW tools</ToolsTitle>
        </Column>
        {primaryTools?.map((tool, i) => (
          <ToolCardsWrapper width={[1, 1 / 2]} key={tool.id}>
            {i === 0 && (
              <Prompt>
                <Tag>Most people start here!</Tag>
                <Desktop>
                  <Arrow>
                    <ArrowIcon alt="highlighting first card" />
                  </Arrow>
                </Desktop>
              </Prompt>
            )}
            <Link href={tool.link}>
              <a>
                <ToolCard
                  active={i === 0}
                  {...tool}
                  text={ReactHtmlParser(tool?.excerpt?.rendered)}
                />
              </a>
            </Link>
          </ToolCardsWrapper>
        ))}
      </Row>
      <Row>
        <Column>
          <ToolsTitle>Using global forest watch</ToolsTitle>
        </Column>
        {secondaryTools?.map((tool, index) => {
          const isFirst = index === 0;

          return (
            <ToolCardsWrapper
              {...(!isFirst && {
                width: [1, 1 / 3],
              })}
              key={tool.id}
            >
              <Link href={tool.link}>
                <a>
                  <SimpleCard
                    {...tool}
                    large={isFirst}
                    text={ReactHtmlParser(tool?.excerpt?.rendered)}
                  />
                </a>
              </Link>
            </ToolCardsWrapper>
          );
        })}
      </Row>
    </Wrapper>
  );
};

HomePage.propTypes = {
  tools: PropTypes.array,
  homepage: PropTypes.object,
};

export default HomePage;
