import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column, H3, H4 } from 'gfw-components';

import theme from '../../app/theme';

import plusIcon from '../../assets/icons/plus.svg';
import minusIcon from '../../assets/icons/minus.svg';
// import Card from '../../components/card';
import Breadcrumbs from '../../components/breadcrumbs';
import Dropdown from '../../components/dropdown';
import Link from '../../components/link';

import { CategoriesWrapper, MenuCategory } from '../categories/styles';

import { Wrapper, SearchDesktop, CategoryDescription, FaqCard } from './styles';

const ArchivePage = ({ state, libraries }) => {
  const Html2React = libraries.html2react.Component;
  const data = state.source.get(state.router.link);
  const pageData = state.source?.[data.type];
  const fqaPages = Object.values(pageData);
  const links =
    fqaPages &&
    fqaPages.map((faq) => ({ label: faq.title.rendered, link: '#' }));

  // TODO: parse URL
  const [activePage, setPage] = useState(links[0]?.label);
  const [selectedFaq, setFaq] = useState(null);

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
        <CategoriesWrapper>
          <Column width={[1 / 4]}>
            <ul>
              {links.map((l) => (
                <MenuCategory
                  key={l.label}
                  css={
                    l.label === activePage &&
                    css`
                      a {
                        color: #97bd3d;
                      }
                    `
                  }
                >
                  <Link
                    // link={l.link}
                    // link="#"
                    onClick={() => {
                      setPage(l.label);
                    }}
                  >
                    {l.label}
                  </Link>
                </MenuCategory>
              ))}
            </ul>
          </Column>
          <Column width={[1, 3 / 4]}>
            {fqaPages &&
              fqaPages
                .filter((p) => p.title.rendered === activePage)
                .map((faq) => (
                  <div>
                    <H3>{faq.title.rendered}</H3>
                    <CategoryDescription>
                      <Html2React html={faq.content.rendered} />
                    </CategoryDescription>

                    {faq?.acf?.questions?.map((question) => {
                      const currentFaq = `${faq.title.rendered}${question.question}`;
                      return (
                        <FaqCard
                          key={question.question}
                          onClick={() =>
                            setFaq(
                              selectedFaq === currentFaq ? null : currentFaq
                            )}
                          role="button"
                          tabIndex={0}
                        >
                          <div
                            css={css`
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            `}
                          >
                            <H4>{question.question}</H4>
                            <img
                              src={
                                selectedFaq === currentFaq
                                  ? minusIcon
                                  : plusIcon
                              }
                              alt="toggle-faq"
                            />
                          </div>
                          {selectedFaq === currentFaq && (
                            <div>
                              <Html2React html={question.answer} />
                            </div>
                          )}
                        </FaqCard>
                      );
                    })}
                  </div>
                ))}
          </Column>
        </CategoriesWrapper>
      </Row>
    </Wrapper>
  );
};

ArchivePage.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
};

export default connect(ArchivePage);
