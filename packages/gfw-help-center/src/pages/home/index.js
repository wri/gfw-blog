/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column, H4, Desktop } from 'gfw-components';

import { getACFImageSizes } from '../../helpers/media';
import Intro from '../../components/intro';
import ToolCard from '../../components/card-tool';
import SimpleCard from '../../components/card-simple';
import Search from '../../components/search';

import ArrowIcon from '../../assets/icons/arrow.svg';

import { Wrapper, Prompt, Tag, Arrow } from './styles';

const HomePage = ({ state, libraries }) => {
  const Html2React = libraries?.html2react?.Component;

  const { tools } = state.source.data['all-tools/'];

  const allTools = tools?.['0']?.map((tool) => ({
    ...tool,
    title: tool?.title?.rendered,
    text: <Html2React html={tool?.content?.rendered} />,
    ...(tool?.acf?.logo && {
      logo: {
        ...tool?.acf?.logo,
        sizes: getACFImageSizes(tool?.acf?.logo?.sizes),
      },
    }),
    ...(tool?.acf?.icon && {
      icon: tool?.acf?.icon,
    }),
    ...(tool?.acf?.banner_image && {
      bannerImage: {
        ...tool?.acf?.banner_image,
        sizes: getACFImageSizes(tool?.acf?.banner_image?.sizes),
      },
    }),
    ...(tool?.acf?.background_image && {
      backgroundImage: {
        ...tool?.acf?.background_image,
        sizes: getACFImageSizes(tool?.acf?.background_image?.sizes),
      },
    }),
  }));

  const primaryTools = allTools?.slice(0, 4);
  const secondaryTools = allTools?.slice(4, 8);

  return (
    <Wrapper>
      <Row>
        <Column
          width={[1, 5 / 6, 2 / 3]}
          css={css`
            margin-bottom: 30px;
          `}
        >
          <Intro title="Help Center" description={state.frontity.description} />
        </Column>
        <Column
          css={css`
            margin-bottom: 100px;
          `}
        >
          <Search expanded />
        </Column>
      </Row>
      <Row>
        <Column>
          <H4
            css={css`
              margin-bottom: 50px;
            `}
          >
            Getting started on the GFW tools
          </H4>
        </Column>
        {primaryTools?.map((tool, i) => (
          <Column
            width={[1, 1 / 2]}
            key={tool.id}
            css={css`
              position: relative;
              margin-bottom: 40px;
            `}
          >
            {i === 0 && (
              <Prompt>
                <Tag>Most people start here!</Tag>
                <Desktop>
                  <Arrow src={ArrowIcon} alt="arrow" />
                </Desktop>
              </Prompt>
            )}
            <ToolCard active={i === 0} {...tool} />
          </Column>
        ))}
      </Row>
      <Row>
        <Column
          css={css`
            margin: 50px 0;
          `}
        >
          <H4>Using global forest watch</H4>
        </Column>
        {secondaryTools?.map((tool, index) => {
          const isFirst = index === 0;

          return (
            <Column
              {...(!isFirst && {
                width: [1, 1 / 3],
              })}
              key={tool.title}
              css={css`
                margin-bottom: 40px;
              `}
            >
              <SimpleCard {...tool} large={isFirst} />
            </Column>
          );
        })}
      </Row>
    </Wrapper>
  );
};

HomePage.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
};

export default connect(HomePage);
