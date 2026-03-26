import { cn } from '../../lib/utils';
import { forwardRef } from 'react';

const Button = forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => (
  <button
    className={cn(
      'inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'primary' && 'btn-primary',
      variant === 'secondary' && 'btn-secondary',
      size === 'lg' && 'px-8 py-4 text-base',
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </button>
));

Button.displayName = 'Button';

export { Button };
