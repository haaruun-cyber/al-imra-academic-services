import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';
import { api } from '../lib/api.js';
import { Badge, Button, Card, Input, Select } from '../components/ui.jsx';

const blank = { name: '', email: '', password: 'Admin@12345', role: 'ADMIN', status: 'ACTIVE', permissions: [] };

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(blank);
  useEffect(() => { load(); }, []);
  function load() { api.get('/users').then(({ data }) => setUsers(data.users)); }
  async function create(event) {
    event.preventDefault();
    try {
      const payload = { ...form, password: form.password.trim() || undefined };
      await api.post('/users', payload);
      setForm(blank);
      load();
      toast.success('User created');
    } catch (error) {
      toast.error(error.response?.data?.errors?.[0] || error.response?.data?.message || 'Unable to create user');
    }
  }
  async function remove(id) {
    try {
      await api.delete(`/users/${id}`);
      setUsers((items) => items.filter((item) => item.id !== id));
      toast.success('User deleted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to delete user');
    }
  }
  async function update(user, patch) {
    try {
      const payload = { name: user.name, email: user.email, role: user.role, status: user.status, permissions: user.permissions, ...patch };
      await api.put(`/users/${user.id}`, payload);
      load();
      toast.success('User updated');
    } catch (error) {
      toast.error(error.response?.data?.errors?.[0] || error.response?.data?.message || 'Unable to update user');
    }
  }
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-bold">User Management</h1><p className="text-muted-foreground">Create users, assign roles and permissions, activate or deactivate accounts.</p></div>
      <Card className="p-4">
        <form onSubmit={create} className="grid gap-3 md:grid-cols-5">
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>{['SUPER_ADMIN', 'ADMIN', 'REGISTRAR_USER', 'FINANCE_USER', 'STUDENT'].map((r) => <option key={r}>{r}</option>)}</Select>
          <Button type="submit"><Plus size={16} />Create</Button>
        </form>
      </Card>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-muted text-left"><tr><th className="p-3">Name</th><th className="p-3">Role</th><th className="p-3">Status</th><th className="p-3">Permissions</th><th className="p-3 text-right">Actions</th></tr></thead>
          <tbody>{users.map((user) => <tr key={user.id} className="border-t border-border"><td className="p-3">{user.name}<p className="text-muted-foreground">{user.email}</p></td><td className="p-3"><Badge>{user.role}</Badge></td><td className="p-3"><Select value={user.status} onChange={(e) => update(user, { status: e.target.value })}><option>ACTIVE</option><option>INACTIVE</option></Select></td><td className="p-3">{user.permissions?.join(', ') || 'Standard role access'}</td><td className="p-3 text-right"><Button variant="danger" onClick={() => remove(user.id)}><Trash2 size={16} />Delete</Button></td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}
