import React, { useState } from 'react';
import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';

import InputContainer from './InputContainer';
import InputLeftElement from './InputLeftElement';
import Input from './Input';
import InputRightElement from './InputRightElement';
import InputIcon from './InputIcon';

function InputPassword(props, ref) {
  const [show, setShow] = useState(false);
  const Icon = show ? MdVisibilityOff : MdVisibility;
  return (
    <InputContainer>
      <InputLeftElement>
        <InputIcon icon={MdLock} />
      </InputLeftElement>
      <Input
        {...props}
        ref={ref}
        type={show ? 'text' : 'password'}
        placeholder="Contraseña"
        className={`!px-10 ${
          show ? 'tracking-normal' : 'tracking-widest'
        } placeholder:tracking-normal`}
      />
      <InputRightElement>
        <InputIcon
          icon={Icon}
          onClick={() => setShow((show) => !show)}
          className="cursor-pointer"
        />
      </InputRightElement>
    </InputContainer>
  );
}

export default React.forwardRef(InputPassword);
