import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column } from 'gfw-components';

import theme from '../../app/theme';

import Card from '../../components/card';
import LoadMore from '../../components/load-more';
import Breadcrumbs from '../../components/breadcrumbs';
import Dropdown from '../../components/dropdown';

import {
  Wrapper,
  SearchDesktop,
  LoadMoreWrapper,
  ResultsStatement,
  CategoryDescription,
} from './styles';

const ArchivePage = ({ state, libraries }) => {
  const Html2React = libraries.html2react.Component;

  const data = state.source.get(state.router.link);
  const pageData = state.source?.[data.type];
  const fqaPages = Object.values(pageData);

  return (
    <Wrapper>
      <Row
        css={css`
          position: relative;
          min-height: 40px;
        `}
      >
        <Column>
          <Breadcrumbs
            css={css`
              margin-bottom: 25px;

              ${theme.mediaQueries.small} {
                margin-bottom: 40px;
              }
            `}
          />
        </Column>
        <Column width={[1, 3 / 4]}>
          <Dropdown items={[{ label: 'FAQs', value: 1 }]} selected={1} />
        </Column>
        <Column width={[1, 1 / 4]}>
          <SearchDesktop showTitle open={state.theme.searchIsActive} />
        </Column>
      </Row>
      <Row>
        <Column>
          {fqaPages && fqaPages.map(faq => (
            <>
              <h3>{faq.title.rendered}</h3>
              <Html2React html={faq.content.rendered} />
              <ul>
                {faq?.acf?.questions?.map(question => (
                  <li>
                    <h4>{question.question}</h4>
                    <Html2React html={question.answer} />
                  </li>
                ))}
              </ul>
            </>
          ))}
        </Column>
      </Row>
    </Wrapper>
  );
};

ArchivePage.propTypes = {
  state: PropTypes.object,
};

export default connect(ArchivePage);
