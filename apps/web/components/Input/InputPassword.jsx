import React, { useState } from 'react';
import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';

import InputContainer from './InputContainer';
import InputLeftElement from './InputLeftElement';
import Input from './Input';
import InputRightElement from './InputRightElement';
import InputIcon from './InputIcon';
import InputLabel from './InputLabel';
import InputErrorMessage from './InputErrorMessage';

function InputPassword(props, ref) {
  const [show, setShow] = useState(false);
  const Icon = show ? MdVisibilityOff : MdVisibility;
  const inputId = 'password';
  const inputPlaceholder = 'Contraseña';
  return (
    <InputContainer>
      <InputLeftElement>
        <InputIcon icon={MdLock} />
      </InputLeftElement>
      <Input
        id={inputId}
        type={show ? 'text' : 'password'}
        placeholder={' '}
        hasLeftIcon={true}
        ref={ref}
        {...props}
      />
      <InputLabel forId={inputId} hasLeftIcon={true} error={props.error}>
        {inputPlaceholder}
      </InputLabel>
      <InputRightElement>
        <InputIcon
          icon={Icon}
          onClick={() => setShow((show) => !show)}
          className="cursor-pointer"
        />
      </InputRightElement>
      <InputErrorMessage error={props.error} />
    </InputContainer>
  );
}

export default React.forwardRef(InputPassword);
