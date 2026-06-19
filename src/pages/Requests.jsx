import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Download, FileText, Search } from 'lucide-react';
import { api } from '../lib/api.js';
import { Badge, Button, Card, Input, Select } from '../components/ui.jsx';
import { prettyStatus } from '../lib/utils.js';

const statuses = ['PENDING', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'COMPLETED'];

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  function load() {
    api.get('/requests', { params: { search, status, limit: 50 } }).then(({ data }) => setRequests(data.requests));
  }
  useEffect(load, []);

  async function updateStatus(id, nextStatus) {
    try {
      const { data } = await api.patch(`/requests/${id}/status`, { status: nextStatus });
      setRequests((items) => items.map((item) => item.id === id ? data.request : item));
      toast.success('Request status updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to update status');
    }
  }

  async function generatePdf(id) {
    try {
      const { data } = await api.post(`/requests/${id}/pdf`);
      setRequests((items) => items.map((item) => item.id === id ? data.request : item));
      toast.success('PDF generated');
    } catch (error) {
      toast.error(error.response?.data?.detail || error.response?.data?.message || 'Unable to generate PDF');
    }
  }

  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-bold">Certificate Requests</h1><p className="text-muted-foreground">Review, accept, reject, complete, generate PDF, and print requests.</p></div>
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <Input placeholder="Search request, student name, or ID" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All statuses</option>{statuses.map((s) => <option key={s} value={s}>{prettyStatus(s)}</option>)}</Select>
          <Button onClick={load}><Search size={16} />Search</Button>
        </div>
      </Card>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-sm">
          <thead className="bg-muted text-left"><tr><th className="p-3">Request</th><th className="p-3">Student</th><th className="p-3">Faculty</th><th className="p-3">Status</th><th className="p-3">Workflow</th><th className="p-3 text-right">Actions</th></tr></thead>
          <tbody>
            {requests.map((request) => <tr key={request.id} className="border-t border-border">
              <td className="p-3 font-medium">{request.requestNo}</td>
              <td className="p-3">{request.student.studentName}<p className="text-muted-foreground">{request.student.studentId}</p></td>
              <td className="p-3">{request.student.faculty}<p className="text-muted-foreground">{request.student.department}</p></td>
              <td className="p-3"><Badge>{prettyStatus(request.status)}</Badge></td>
              <td className="p-3"><Select value={request.status} onChange={(e) => updateStatus(request.id, e.target.value)}>{statuses.map((s) => <option key={s} value={s}>{prettyStatus(s)}</option>)}</Select></td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => generatePdf(request.id)}><FileText size={16} />PDF</Button>
                  {request.pdfUrl && <a href={request.pdfUrl} target="_blank" rel="noreferrer"><Button variant="outline"><Download size={16} />Open</Button></a>}
                </div>
              </td>
            </tr>)}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
