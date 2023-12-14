import styled from '@emotion/styled'
import { Column, theme } from '@worldresources/gfw-components'

import Search from 'components/search'

export const Wrapper = styled.div`
  width: 100%;
`

export const Hero = styled.div`
  margin-top: 3.75rem;
  padding: 0 1rem;

  ${theme.mediaQueries.small} {
    padding: 0 3.75rem;
  }
`

export const SearchMobile = styled(Search)`
  display: block;

  ${theme.mediaQueries.small} {
    display: none;
  }
`

export const SearchDesktop = styled(Search)`
  display: none;
  margin-top: -1.75rem;

  ${theme.mediaQueries.small} {
    display: block;
  }

  ${({ open }) =>
    open &&
    `
    position: absolute;
    left: 0;
    right: 0;
    top: -1.75rem;
    max-width: 111.25rem;
    padding: 0 1rem;
    margin: 0 auto;

    ${theme.mediaQueries.small} {
      padding: 0 1.25rem;
    }
  `}
`

export const FeatureWrapper = styled.div`
  max-width: 111.25rem;
  margin: auto;

  ${theme.mediaQueries.small} {
    padding: 0 1.25rem;
  }
`

export const Divider = styled.div`
  border-top: 0.0625rem solid ${theme.colors.lightGrey};
  margin-top: 1.25rem;
  margin-bottom: 3.75rem;
  display: none;

  ${theme.mediaQueries.small} {
    display: block;
  }
`

export const LatestTitle = styled.h2`
  font-size: 1.125rem;
  color: ${theme.colors.darkestGrey};
  margin-bottom: 3.125rem;
  text-transform: uppercase;
  font-weight: 500;
  display: block;
`

export const LoadMoreWrapper = styled(Column)`
  margin: 1.25rem 0 3.125rem !important;
  display: flex;
  justify-content: center;
  width: 100%;

  ${theme.mediaQueries.small} {
    margin-top: 3.75rem !important;
  }
`
