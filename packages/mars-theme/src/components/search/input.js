import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled, connect } from 'frontity';

const InputWrapper = styled.input`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #aaa;
  border: 0;
  z-index: 8;
  font-size: 1.375rem;
  line-height: 1.25;
  padding: 1rem;
`;

const Input = ({
  actions,
  inputClickHandler,
  searchHandler,
  resetHandler,
  defaultValue = '',
}) => {
  const [input, setInput] = useState(defaultValue);
  const ref = useRef();
  const inputHandler = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    searchHandler(e.target.value);
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      resetHandler();
      actions.router.set(`?s=${input}`);
    }
  };

  useEffect(() => {
    ref.current.focus();
  }, [defaultValue]);

  return (
    <InputWrapper
      ref={ref}
      type="text"
      name="search"
      value={input}
      onClick={inputClickHandler}
      onChange={inputHandler}
      onKeyDown={keyDownHandler}
      placeholder="Search the GFW blog  (eg. fires, Brazil, palm oil)"
    />
  );
};

export default connect(Input);

Input.propTypes = {
  actions: PropTypes.object,
  inputClickHandler: PropTypes.func,
  searchHandler: PropTypes.func,
  resetHandler: PropTypes.func,
  defaultValue: PropTypes.string,
};
