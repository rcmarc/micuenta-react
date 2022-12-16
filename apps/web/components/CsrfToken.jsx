import React from 'react';

function CsrfToken(props, ref) {
  return <input {...props} ref={ref} type="hidden" name="csrfToken" />;
}

export default React.forwardRef(CsrfToken);
