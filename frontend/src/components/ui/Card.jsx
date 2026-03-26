import { cn } from '../../lib/utils';

const Card = ({ className, children, ...props }) => (
  <div className={cn('glass-card', className)} {...props}>
    {children}
  </div>
);

export { Card };
