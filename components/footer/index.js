import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import ReactHtmlParser from 'react-html-parser';

import { getPostByType } from 'lib/api';

import { Row, Column, H4, theme } from 'gfw-components';
import SimpleCard from '../card-simple';

const Footer = ({ openContactUsModal }) => {
  const [support, setSupport] = useState(null);
  const [contactUs, setContactUs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const contactUsResponse = await getPostByType({
        type: 'pages',
        slug: 'contact-us',
      });
      const supportResponse = await getPostByType({
        type: 'pages',
        slug: 'community-forum',
      });
      setContactUs(contactUsResponse);
      setSupport(supportResponse);
    };

    fetchData();
  }, []);

  return contactUs && support ? (
    <Row>
      <Column>
        <Title>Get support</Title>
      </Column>
      <Column
        width={[1, 1 / 2]}
        css={css`
          margin-bottom: 30px;
        `}
      >
        <a
          href={support?.acf?.alt_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SimpleCard
            {...support}
            text={ReactHtmlParser(support?.excerpt?.rendered)}
          />
        </a>
      </Column>
      <Column
        width={[1, 1 / 2]}
        css={css`
          margin-bottom: 30px;
        `}
      >
        <button
          css={css`
            text-align: left;
            padding: 0;
            width: 100%;
          `}
          onClick={openContactUsModal}
        >
          <SimpleCard
            {...contactUs}
            text={ReactHtmlParser(contactUs?.excerpt?.rendered)}
          />
        </button>
      </Column>
    </Row>
  ) : null;
};

const Title = styled(H4)`
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    margin-bottom: 30px;
  }
`;

Footer.propTypes = {
  tools: PropTypes.array,
  openContactUsModal: PropTypes.func,
};

export default Footer;
