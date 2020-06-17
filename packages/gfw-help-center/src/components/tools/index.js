import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column, Desktop } from 'gfw-components';
import Card from './components/card';
import ArrowIcon from '../../assets/icons/arrow.svg';

import { H4Wrapper, Prompt, Tag, Arrow } from './styles';

const Tools = ({ state, libraries }) => {
  const Html2React = libraries?.html2react?.Component;
  const cards = state?.source?.tools && Object.values(state?.source?.tools);

  return (
    <>
      <H4Wrapper>Getting started on the GFW tools.</H4Wrapper>
      <Row nested>
        {cards &&
          cards.length &&
          cards.map((card, i) => {
            const { title, content, id, acf } = card;
            const { logo, background_image: bg } = acf;

            return (
              <Column
                width={[1, 1 / 2]}
                key={id}
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
                <Card
                  css={
                    i === 0 &&
                    css`
                      border: 1px solid #cacabe;
                      background-color: #e5e5df;
                    `
                  }
                  title={title.rendered}
                  text={<Html2React html={content.rendered} />}
                  logo={logo}
                  image={bg}
                />
              </Column>
            );
          })}
      </Row>
    </>
  );
};

export default connect(Tools);

Tools.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
};
