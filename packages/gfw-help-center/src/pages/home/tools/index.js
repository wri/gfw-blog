/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column, Desktop, H4 } from 'gfw-components';

import { getACFImageSizes } from '../../../helpers/media';
import ArrowIcon from '../../../assets/icons/arrow.svg';

import Card from '../../../components/card-tool';

import { Prompt, Tag, Arrow } from './styles';

const HomePage = ({ state, libraries }) => {
  const Html2React = libraries?.html2react?.Component;

  const tools =
    state?.source?.tools &&
    Object.values(state.source.tools).map((tool) => ({
      ...tool,
      title: tool?.title?.rendered,
      text: <Html2React html={tool?.content?.rendered} />,
      logo: {
        ...tool?.acf?.logo,
        sizes: getACFImageSizes(tool?.acf?.logo?.sizes),
      },
      image: {
        ...tool?.acf?.background_image,
        sizes: getACFImageSizes(tool?.acf?.background_image?.sizes),
      },
    }));

  return (
    <>
      <H4
        css={css`
          margin-bottom: 50px;
        `}
      >
        Getting started on the GFW tools
      </H4>
      <Row nested>
        {tools?.map((tool, i) => (
          <Column
            width={[1, 1 / 2]}
            key={tool.id}
            css={css`
              position: relative;
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
            <Card active={i === 0} {...tool} />
          </Column>
        ))}
      </Row>
    </>
  );
};

HomePage.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
};

export default connect(HomePage);
