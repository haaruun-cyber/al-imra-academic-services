import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Bell, FileArchive, LayoutDashboard, LogOut, Moon, ScrollText, Sun, Users, BarChart3, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button, Badge } from '../components/ui.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../lib/api.js';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'));

  const fetchNotifications = () => {
    api.get('/notifications')
      .then(({ data }) => {
        setNotifications(data.notifications);
        setUnread(data.unread);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  function signOut() {
    logout();
    navigate('/login');
  }

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    setDark(document.documentElement.classList.contains('dark'));
  }

  async function markAsRead(id) {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      setUnread(prev => Math.max(0, prev - 1));
    } catch {}
  }

  async function markAllAsRead() {
    try {
      const unreadItems = notifications.filter(n => !n.isRead);
      await Promise.all(unreadItems.map(n => api.patch(`/notifications/${n.id}/read`)));
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnread(0);
    } catch {}
  }

  const links = [
    ['Dashboard', '/app', LayoutDashboard],
    ['Requests', '/app/requests', ScrollText],
    ['Reports', '/app/reports', BarChart3],
    ['Documents', '/app/documents', FileArchive],
    ...(user?.role === 'SUPER_ADMIN' ? [['Users', '/app/users', Users]] : [])
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-background p-4 md:block">
        <div className="mb-8 font-bold text-primary text-xl flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded bg-primary text-primary-foreground"><GraduationCap size={16} /></span>
          AL-IMRA Portal
        </div>
        <nav className="space-y-1">
          {links.map(([label, to, Icon]) => (
            <NavLink 
              key={to} 
              end={to === '/app'} 
              to={to} 
              className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              <Icon size={17} />{label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="md:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4">
          <div>
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <h1 className="font-semibold">{user?.name} <Badge>{user?.role?.replaceAll('_', ' ')}</Badge></h1>
          </div>
          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <Button variant="outline" className="flex items-center gap-2 relative" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={16} />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground animate-pulse">
                    {unread}
                  </span>
                )}
              </Button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-md border border-border bg-background p-2 shadow-lg z-50 max-w-sm">
                  <div className="flex items-center justify-between border-b border-border pb-2 mb-2 px-2">
                    <span className="font-semibold text-sm">Recent Notifications</span>
                    {unread > 0 && (
                      <button onClick={markAllAsRead} className="text-xs text-primary hover:underline font-semibold">
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-4">No notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            if (!n.isRead) markAsRead(n.id);
                          }} 
                          className={`p-2 rounded text-xs transition cursor-pointer hover:bg-muted ${!n.isRead ? 'bg-primary/5 font-semibold' : 'opacity-70'}`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <span>{n.title}</span>
                            {!n.isRead && <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1 shrink-0" />}
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{n.message}</p>
                          <span className="text-[9px] text-muted-foreground mt-1 block">
                            {new Date(n.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <Button variant="outline" onClick={toggleTheme}>{dark ? <Sun size={16} /> : <Moon size={16} />}</Button>
            <Button variant="secondary" onClick={signOut}><LogOut size={16} />Logout</Button>
          </div>
        </header>
        <div className="p-4 md:p-6"><Outlet /></div>
      </main>
    </div>
  );
}
