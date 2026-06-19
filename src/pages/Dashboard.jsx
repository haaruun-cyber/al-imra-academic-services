import { useEffect, useState } from 'react';
import { Activity, CheckCircle, Clock, GraduationCap, ScrollText } from 'lucide-react';
import { api } from '../lib/api.js';
import { Badge, Card } from '../components/ui.jsx';
import { prettyStatus } from '../lib/utils.js';

export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { api.get('/dashboard').then(({ data }) => setData(data)); }, []);
  const stats = data?.stats || {};
  const cards = [
    ['Total Students', stats.students || 0, GraduationCap],
    ['Total Requests', stats.total || 0, ScrollText],
    ['Pending Requests', stats.pending || 0, Clock],
    ['Accepted Requests', stats.accepted || 0, CheckCircle],
    ['Completed Requests', stats.completed || 0, Activity]
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Dashboard</h1><p className="text-muted-foreground">Statistics, recent requests, notifications, and activity logs.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(([label, value, Icon]) => <Card key={label} className="p-5"><Icon className="text-primary" /><div className="mt-4 text-3xl font-bold">{value}</div><p className="text-sm text-muted-foreground">{label}</p></Card>)}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="overflow-hidden"><div className="border-b border-border p-4 font-semibold">Recent Requests</div><table className="w-full text-sm"><tbody>{data?.recentRequests?.map((r) => <tr key={r.id} className="border-b border-border"><td className="p-3">{r.requestNo}<p className="text-muted-foreground">{r.student.studentName}</p></td><td className="p-3 text-right"><Badge>{prettyStatus(r.status)}</Badge></td></tr>)}</tbody></table></Card>
        <Card className="overflow-hidden"><div className="border-b border-border p-4 font-semibold">Activity Logs</div><div className="divide-y divide-border">{data?.logs?.map((log) => <div key={log.id} className="p-3 text-sm"><b>{log.action}</b><p className="text-muted-foreground">{log.description}</p></div>)}</div></Card>
      </div>
    </div>
  );
}
