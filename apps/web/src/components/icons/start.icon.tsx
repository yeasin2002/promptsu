import { cn } from '@workspace/ui/lib/utils';
import type * as React from 'react';

type Props = React.ComponentProps<'svg'>;

export const StarIcon = ({ className, ...props }: Props) => (
  <svg
    className={cn(className)}
    fill="none"
    height="28"
    viewBox="0 0 29 28"
    width="29"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Star icon</title>
    <path
      clipRule="evenodd"
      d="M16.807 1.31c-.636-1.746-3.104-1.746-3.74 0l-2.886 7.934-7.934 2.886c-1.746.636-1.746 3.104 0 3.74l7.934 2.886 2.886 7.934c.636 1.746 3.104 1.746 3.74 0l2.886-7.934 7.934-2.886c1.746-.636 1.746-3.104 0-3.74l-7.934-2.886z"
      fill="#CCC"
      fillRule="evenodd"
    />
  </svg>
);
