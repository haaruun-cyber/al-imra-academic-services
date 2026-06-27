import { cn } from '../lib/utils.js';

export function Button({ className, variant = 'primary', type = 'button', ...props }) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-soft',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-soft',
    outline: 'border border-border bg-transparent hover:bg-muted text-foreground',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-foreground hover:bg-muted'
  };
  return <button type={type} className={cn('inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50', variants[variant], className)} {...props} />;
}

export function Card({ className, ...props }) {
  return <div className={cn('rounded-lg border border-border bg-background shadow-sm hover:shadow-card transition', className)} {...props} />;
}

export function Input(props) {
  return <input className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary" {...props} />;
}

export function Textarea(props) {
  return <textarea className="min-h-24 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary" {...props} />;
}

export function Select(props) {
  return <select className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary" {...props} />;
}

export function Badge({ children, className, variant = 'default' }) {
  const variants = {
    default: 'inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground',
    primary: 'inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary',
    success: 'inline-flex rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success',
    secondary: 'inline-flex rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary'
  };
  return <span className={cn(variants[variant], className)}>{children}</span>;
}

export function Alert({ children, className, variant = 'default' }) {
  const variants = {
    default: 'bg-muted border-l-4 border-primary',
    success: 'bg-success/10 border-l-4 border-success',
    error: 'bg-red-50 border-l-4 border-red-500',
    warning: 'bg-accent/10 border-l-4 border-accent'
  };
  return <div className={cn('rounded p-4', variants[variant], className)}>{children}</div>;
}

