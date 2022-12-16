import { useQueryErrorMessage } from '../hooks';
import ErrorMessage from './ErrorMessage';

function QueryErrorMessage({ className }) {
  const message = useQueryErrorMessage();
  return <ErrorMessage className={className}>{message}</ErrorMessage>;
}

export default QueryErrorMessage;
