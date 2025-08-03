import { cn } from '@/lib/utils';
import * as React from 'react';
type Props = React.ComponentProps<'svg'>;

export const StarIcon = ({ className, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="29"
    height="28"
    fill="none"
    viewBox="0 0 29 28"
    className={cn(className)}
    {...props}
  >
    <path
      fill="#CCC"
      fillRule="evenodd"
      d="M16.807 1.31c-.636-1.746-3.104-1.746-3.74 0l-2.886 7.934-7.934 2.886c-1.746.636-1.746 3.104 0 3.74l7.934 2.886 2.886 7.934c.636 1.746 3.104 1.746 3.74 0l2.886-7.934 7.934-2.886c1.746-.636 1.746-3.104 0-3.74l-7.934-2.886z"
      clipRule="evenodd"
    ></path>
  </svg>
);
