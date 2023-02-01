import React from 'react';
import { MdPerson } from 'react-icons/md';

import Input from './Input';

function InputUsername({ name, ...props }, ref) {
  const inputPlaceholder = 'Nombre de Usuario';
  const inputName = name || 'username';
  return (
    <Input
      left={{ icon: MdPerson }}
      id={inputName}
      name={inputName}
      placeholder={inputPlaceholder}
      ref={ref}
      {...props}
    />
  );
}

export default React.forwardRef(InputUsername);
