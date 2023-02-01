import React from 'react';

import InputContainer from './InputContainer';
import InputErrorMessage from './InputErrorMessage';
import StyledSelect from './StyledSelect';

const InputSelect = React.forwardRef(({ error, children, ...props }, ref) => (
  <InputContainer>
    <StyledSelect error={error} ref={ref} {...props}>
      {children}
    </StyledSelect>
    <InputErrorMessage error={error} />
  </InputContainer>
));

InputSelect.displayName = 'InputSelect';

export default InputSelect;
