import React, { useState } from 'react';
import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';

import Input from './Input';

function InputPassword({ name, ...props }, ref) {
  const [show, setShow] = useState(false);
  const Icon = show ? MdVisibilityOff : MdVisibility;
  return (
    <Input
      left={{ icon: MdLock }}
      right={{
        icon: Icon,
        onClick: () => setShow((show) => !show),
      }}
      id={name}
      name={name}
      placeholder="Contraseña"
      type={show ? 'text' : 'password'}
      ref={ref}
      {...props}
    />
  );
}

export default React.forwardRef(InputPassword);
