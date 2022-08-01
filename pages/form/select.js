import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import ReactSelect from 'react-select';

export default function Select({ name, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (ref.getValue().length == 0) {
          return undefined;
        }
        return ref.getValue().at(0).value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <ReactSelect
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: '#9ca3af',
          primary: '#4ade80',
        },
      })}
      cacheOptions
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
}
