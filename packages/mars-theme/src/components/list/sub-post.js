import React from "react";
import Item from './list-item';
import FeaturedMedia from "../featured-media";
import { LARGE_ENDPOINT, MEDIUM_ENDPOINT, SMALL_ENDPOINT } from '../heplers/css-endpoints';

const SubPost = ({ item }) => {
  const styles = `
    width: 49%;
    flex-wrap: wrap;
    @media screen and (max-width: ${LARGE_ENDPOINT}) {
      width: 100%;
    }
    @media screen and (max-width: ${SMALL_ENDPOINT}) {
      width: 100%;
    }`;

  const mediaStyles = `
    height: 300px;
    @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
      height: 200px;
    }`;

  return (
    <Item styles={styles} item={item} media={(id) => <FeaturedMedia id={id} styles={mediaStyles} />} />
  )
}

export default SubPost;