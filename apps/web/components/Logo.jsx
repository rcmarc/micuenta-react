import Image from 'next/image';

function Logo({ size }) {
  return (
    <Image
      src={`/ucf_64.svg`}
      width={size || 64}
      height={size || 64}
      priority={true}
      alt="UCF logo"
    />
  );
}

export default Logo;
