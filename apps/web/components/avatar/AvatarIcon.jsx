import { MdAccountCircle } from 'react-icons/md';

const sizes = {
  sm: '40px',
  md: '60px',
  lg: '80px',
};

export function AvatarIcon({ size }) {
  return (
    <MdAccountCircle size={sizes[size || 'md']} className="text-slate-500" />
  );
}
