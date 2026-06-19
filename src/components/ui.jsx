import { cn } from '../lib/utils.js';

export function Button({ className, variant = 'primary', type = 'button', ...props }) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-muted text-foreground hover:bg-border',
    outline: 'border border-border bg-transparent hover:bg-muted',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  return <button type={type} className={cn('inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50', variants[variant], className)} {...props} />;
}

export function Card({ className, ...props }) {
  return <div className={cn('rounded-lg border border-border bg-background shadow-sm', className)} {...props} />;
}

export function Input(props) {
  return <input className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary" {...props} />;
}

export function Textarea(props) {
  return <textarea className="min-h-24 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" {...props} />;
}

export function Select(props) {
  return <select className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary" {...props} />;
}

export function Badge({ children, className }) {
  return <span className={cn('inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground', className)}>{children}</span>;
}
