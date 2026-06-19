import { Link, NavLink, Outlet } from 'react-router-dom';
import { GraduationCap, Menu, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui.jsx';

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'));

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    setDark(document.documentElement.classList.contains('dark'));
  }

  const nav = [
    ['Home', '/'],
    ['About', '/about'],
    ['Request Certificate', '/request-certificate'],
    ['Contact', '/contact']
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3 font-bold">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground"><GraduationCap size={22} /></span>
            <span>AL-IMRA Academic Services</span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {nav.map(([label, to]) => <NavLink key={to} to={to} className={({ isActive }) => `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-foreground'}`}>{label}</NavLink>)}
            <Button variant="outline" onClick={toggleTheme}>{dark ? <Sun size={16} /> : <Moon size={16} />}</Button>
            <Button as="a"><Link to="/login">Portal Login</Link></Button>
          </nav>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu"><Menu /></button>
        </div>
        {open && <div className="border-t border-border px-4 py-3 md:hidden">{nav.map(([label, to]) => <NavLink onClick={() => setOpen(false)} key={to} to={to} className="block rounded-md px-3 py-2 text-sm">{label}</NavLink>)}</div>}
      </header>
      <Outlet />
    </div>
  );
}
