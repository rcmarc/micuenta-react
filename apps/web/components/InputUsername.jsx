import InputContainer from './InputContainer';
import InputLeftElement from './InputLeftElement';
import Input from './Input';

import React from 'react';
import { MdPerson } from 'react-icons/md';

function InputUsername(props, ref) {
  return (
    <>
      <InputContainer>
        <InputLeftElement>
          <MdPerson className="h-[24px] w-[24px] fill-slate-500" />
        </InputLeftElement>
        <Input
          placeholder="Nombre de usuario"
          className="!px-10"
          ref={ref}
          {...props}
        />
      </InputContainer>
    </>
  );
}

export default React.forwardRef(InputUsername);
