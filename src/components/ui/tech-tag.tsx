import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TechTagProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function TechTag({ children, className, ...props }: TechTagProps) {
  return (
    <span
      className={cn('chip-assist', className)}
      {...props}
    >
      {children}
    </span>
  );
}
