import React from 'react';

import InputContainer from './InputContainer';
import InputErrorMessage from './InputErrorMessage';
import InputIcon from './InputIcon';
import InputLabel from './InputLabel';
import InputLeftElement from './InputLeftElement';
import InputRightElement from './InputRightElement';
import StyledInput from './StyledInput';

function Input({ left, right, placeholder, ...props }, ref) {
  return (
    <InputContainer>
      {left && (
        <InputLeftElement>
          {React.createElement(InputIcon, { ...left })}
        </InputLeftElement>
      )}
      <StyledInput placeholder={' '} hasLeftIcon={left} ref={ref} {...props} />
      <InputLabel
        forId={props.id}
        hasLeftIcon={left}
        error={props.error}
        text={placeholder}
      />
      {right && (
        <InputRightElement>
          {React.createElement(InputIcon, { ...right })}
        </InputRightElement>
      )}
      <InputErrorMessage error={props.error} />
    </InputContainer>
  );
}

export default React.forwardRef(Input);
