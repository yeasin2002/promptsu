interface Props extends React.ComponentProps<'div'> {}

export const Logo = ({ ...props }: Props) => {
  return (
    <div
      className="flex items-center justify-center gap-2 lg:gap-[15px]"
      {...props}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-blue-500 lg:h-[30.75px] lg:w-[30.75px]">
        <span className="font-bold text-white text-xs lg:text-sm">P</span>
      </div>
      <div className="relative">
        <span className="text-center font-manrope font-medium text-lg text-white leading-[normal] tracking-[0] lg:text-[22px]">
          Promptverse
        </span>
        <span className="ormal ml-1 text-center font-n font-poppins text-lg text-white leading-[normal] tracking-[0] lg:text-[22px]">
          AI
        </span>
      </div>
    </div>
  );
};
