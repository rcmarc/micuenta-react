import React from 'react';
import { MdPerson } from 'react-icons/md';

import InputContainer from './InputContainer';
import InputLeftElement from './InputLeftElement';
import Input from './Input';
import InputLabel from './InputLabel';
import InputErrorMessage from './InputErrorMessage';
import InputIcon from './InputIcon';

function InputUsername(props, ref) {
  const inputId = 'username';
  const inputPlaceholder = 'Nombre de Usuario';
  return (
    <InputContainer>
      <InputLeftElement>
        <InputIcon icon={MdPerson} />
      </InputLeftElement>
      <Input
        id={inputId}
        placeholder={' '}
        hasLeftIcon={true}
        ref={ref}
        {...props}
      />
      <InputLabel forId={inputId} hasLeftIcon={true} error={props.error}>
        {inputPlaceholder}
      </InputLabel>
      <InputErrorMessage error={props.error} />
    </InputContainer>
  );
}

export default React.forwardRef(InputUsername);
