import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock } from 'lucide-react';
import { Button, Card, Input } from '../components/ui.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'superadmin@alimra.edu', password: 'Admin@12345' });
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back');
      navigate('/app');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-[calc(100vh-64px)] place-items-center px-4 py-12">
      <Card className="w-full max-w-md p-6 shadow-soft">
        <div className="mb-6 grid h-12 w-12 place-items-center rounded-md bg-primary text-primary-foreground"><Lock /></div>
        <h1 className="text-2xl font-bold">Portal Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">Access dashboards, requests, reports, users, and documents.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</Button>
        </form>
      </Card>
    </main>
  );
}
