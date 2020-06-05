import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column, Desktop } from 'gfw-components';
import Card from './components/card';
import ArrowIcon from '../../assets/icons/arrow.svg';

import { H4Wrapper, Prompt, Tag, Arrow } from './styles';

const Tools = () => {
  const cards = [
    {
      title: 'Map and Dashboards',
      text: `Explore hundreds of spatial datasets with the GFW Map, including near-real-time deforestation and fire alerts as well as
    high-resolution satellite imagery.`,
      image: 'mapsdashboards',
      logo: 'gfw',
    },
    {
      title: 'Forest Watcher',
      text:
        'For those who are actively monitoring and managing forests. Forest Watcher helps you take GFW data offline and into the field.',
      image: 'forestwatcher',
      logo: 'fw',
    },
    {
      title: 'MapBuilder',
      text: `For those who want their own online mapping and monitoring system. MapBuilder allows you to combine GFW data with your own data to
        build highly customized forest monitoring applications.`,
      image: 'mapbuilder',
    },
    {
      title: 'GFW Pro',
      text: `For companies, banks and anyone else seeking to monitor forests across a portfolio of locations. GFW Pro enables you to securely
        manage deforestation risk in commodity supply chains.`,
      image: 'gfwpro',
      logo: 'gfwpro',
    },
  ];

  return (
    <>
      <H4Wrapper>Getting started on the GFW tools.</H4Wrapper>
      <Row nested>
        {cards.map((card, i) => {
          // const card = state.source.get(item.link);
          return (
            <Column
              width={[1, 1 / 2]}
              key={card.title}
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
                {...card}
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
  items: PropTypes.array,
  state: PropTypes.object,
};
