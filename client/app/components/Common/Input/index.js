/**
 *
 * Input
 *
 */

import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Input = props => {
  const {
    autoComplete,
    type,
    value,
    error,
    step,
    decimals,
    min,
    max,
    disabled,
    placeholder,
    rows,
    label,
    name,
    onInputChange,
    inlineElement,
    style,
  } = props;

  const _onChange = e => {
    if (e.target.name == 'image') {
      onInputChange(e.target.name, e.target.files[0]);
    } else {
      onInputChange(e.target.name, e.target.value);
    }
  };

  if (type === 'textarea') {
    const classname = `input-box${error ? ' invalid' : ''}`;

    return (
      <div className={classname}>
        {label && <label>{label}</label>}
        <textarea
          type={'textarea'}
          onChange={e => {
            _onChange(e);
          }}
          rows={rows}
          name={name}
          value={value}
          placeholder={placeholder}
          className={'textarea-text'}
          style={style}
        />
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  } else if (type === 'number') {
    const classname = `input-box${error ? ' invalid' : ''}`;

    const handleOnInput = e => {
      if (!decimals) {
        e.target.value = e.target.value.replace(/[^0-9]*/g, '');
      }
    };
    return (
      <div className={classname}>
        {label && <label>{label}</label>}
        <input
          autoComplete={autoComplete}
          step='step'
          min={min || 0}
          max={max || null}
          pattern='[0-9]'
          onInput={handleOnInput}
          type={type}
          onChange={e => {
            _onChange(e);
          }}
          disabled={disabled}
          name={name}
          value={value}
          placeholder={placeholder}
          className={'input-number'}
          style={style}
        />
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  } else if (type === 'stars') {
    const classname = `input-box${error ? ' invalid' : ''}`;

    return (
      <div className={classname}>
        {label && <label>{label}</label>}
        <ReactStars
          name={name}
          starCount={5}
          size={30}
          color={'#adb5bd'}
          activeColor={'#ffb302'}
          a11y={true}
          isHalf={false}
          emptyIcon={<i className='fa fa-star' />}
          halfIcon={<i className='fa fa-star-half-alt' />}
          filledIcon={<i className='fa fa-star' />}
          value={value}
          onChange={value => {
            onInputChange(name, value);
          }}
          style={style}
        />
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  } else {
    const classname = `input-box${inlineElement ? ` inline-btn-box` : ''} ${
      error ? 'invalid' : ''
    }`;

    return (
      <div className={classname}>
        {label && <label>{label}</label>}
        <div className='input-text-block'>
          <input
            className={'input-text'}
            autoComplete={autoComplete}
            type={type}
            onChange={e => {
              _onChange(e);
            }}
            disabled={disabled}
            name={name}
            value={value}
            placeholder={placeholder}
            style={style}
          />
          {inlineElement}
        </div>
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  }
};

Input.defaultProps = {
  step: 1,
  decimals: true,
  rows: '4',
  inlineElement: null,
  autoComplete: 'on'
};

export default Input;
