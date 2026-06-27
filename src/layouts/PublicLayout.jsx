import { Link, NavLink, Outlet } from 'react-router-dom';
import { GraduationCap, Menu, Moon, Sun, X } from 'lucide-react';
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
    ['Verify Certificate', '/verify-certificate'],
    ['Contact', '/contact']
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-white dark:bg-slate-950 shadow-soft">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3 font-bold text-lg hover:opacity-80 transition">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-soft">
              <GraduationCap size={22} />
            </span>
            <span className="hidden sm:inline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AL-IMRA</span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {nav.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="flex items-center gap-2 ml-4">
              <Button variant="ghost" onClick={toggleTheme} size="sm">
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </Button>
              <Button variant="primary">
                <Link to="/login" className="inline-flex">Portal Login</Link>
              </Button>
            </div>
          </nav>
          <button
            className="md:hidden p-2 hover:bg-muted rounded-md"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border px-4 py-3 md:hidden bg-muted">
            {nav.map(([label, to]) => (
              <NavLink
                onClick={() => setOpen(false)}
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="mt-3 flex gap-2 pt-3 border-t border-border">
              <Button variant="ghost" onClick={toggleTheme} className="flex-1">
                {dark ? <Sun size={16} /> : <Moon size={16} />} Theme
              </Button>
              <Button variant="primary" className="flex-1">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        )}
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-muted py-8 mt-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="grid h-8 w-8 place-items-center rounded bg-primary text-primary-foreground">
                <GraduationCap size={18} />
              </span>
              <span className="font-bold text-sm">AL-IMRA</span>
            </div>
            <p className="text-xs text-muted-foreground">Academic Services for Al-Imra University</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-xs text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link to="/about" className="text-xs text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link to="/request-certificate" className="text-xs text-muted-foreground hover:text-primary">Request</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/verify-certificate" className="text-xs text-muted-foreground hover:text-primary">Verify Certificate</Link></li>
              <li><Link to="/contact" className="text-xs text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><a href="mailto:info@aiu.so" className="text-xs text-muted-foreground hover:text-primary">Email Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Contact Info</h4>
            <p className="text-xs text-muted-foreground">Email: info@aiu.so</p>
            <p className="text-xs text-muted-foreground mt-1">Phone: +252 661 655 636</p>
            <p className="text-xs text-muted-foreground">Phone: +252 661 706 1918</p>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">© 2026 AL-IMRA Academic Services. All rights reserved.</p>
          <p className="text-xs text-muted-foreground mt-2">Academic records managed with care and excellence.</p>
        </div>
      </div>
    </footer>
  );
}
