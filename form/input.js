import React, { useEffect, useRef } from 'react';
import ReactInputMask from 'react-input-mask';
import { useField } from '@unform/core';

React.useLayoutEffect = React.useEffect;

export default function InputMask({ name, ...rest }) {
  const inputRef = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.value = value;
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <ReactInputMask
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <p>{error}</p>}
    </div>
  );
}
