import React from 'react';

function CsrfToken(props, ref) {
  return <input type="hidden" ref={ref} {...props} />;
}

export default React.forwardRef(CsrfToken);
