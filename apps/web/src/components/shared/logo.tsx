interface Props extends React.ComponentProps<'div'> {}

import logo from '@workspace/assets/images/logo.svg';
import Image from 'next/image';

export const Logo = ({ ...props }: Props) => {
  return (
    <div
      className="flex items-center justify-center gap-2 lg:gap-[15px]"
      {...props}
    >
      <Image alt="Logo" className="size-8" src={logo} />
      <div className="relative">
        <span className="text-center font-manrope font-medium text-lg text-white leading-[normal] tracking-[0] lg:text-[22px]">
          promptsu
        </span>
        <span className="ormal ml-1 text-center font-n font-poppins text-lg text-white leading-[normal] tracking-[0] lg:text-[22px]">
          AI
        </span>
      </div>
    </div>
  );
};
