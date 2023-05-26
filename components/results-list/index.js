import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { translateText } from 'utils/lang';

import { Loader } from '@worldresources/gfw-components';

import Link from 'next/link';

import { ListWrapper, ListItem, Divider } from './styles';

const ResultsList = ({
  loading,
  items = [],
  onClickResult,
  selected,
  showCount,
}) => {
  return (
    <ListWrapper>
      {loading && <Loader />}
      {!!items?.length &&
        items?.map((item) => {
          const label = translateText(item?.name);

          return (
            item && (
              <ListItem
                key={item.id || item.name}
                selected={item.id === selected}
              >
                {item.name === 'divider' ? (
                  <Divider />
                ) : (
                  <>
                    {item.link ? (
                      <Link href={item.link}>
                        <a>
                          <button onClick={onClickResult}>
                            {ReactHtmlParser(
                              `${label}${showCount ? ` (${item.count})` : ''}`
                            )}
                          </button>
                        </a>
                      </Link>
                    ) : (
                      <button onClick={item.onClick}>
                        {ReactHtmlParser(
                          `${label}${showCount ? ` (${item.count})` : ''}`
                        )}
                      </button>
                    )}
                  </>
                )}
              </ListItem>
            )
          );
        })}
    </ListWrapper>
  );
};

export default ResultsList;

ResultsList.propTypes = {
  loading: PropTypes.bool,
  items: PropTypes.array.isRequired,
  onClickResult: PropTypes.func,
  selected: PropTypes.number,
  showCount: PropTypes.bool,
};
