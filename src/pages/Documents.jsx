import { useEffect, useState } from 'react';
import { Download, Printer, Search, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../lib/api.js';
import { Button, Card, Input } from '../components/ui.jsx';

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState('');
  function load() { api.get('/documents', { params: { search } }).then(({ data }) => setDocuments(data.documents)); }
  useEffect(load, []);
  async function remove(id) {
    await api.delete(`/documents/${id}`);
    setDocuments((items) => items.filter((item) => item.id !== id));
    toast.success('Document deleted');
  }
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-bold">Document Archive</h1><p className="text-muted-foreground">Search, view, download, print, delete, and track generated documents.</p></div>
      <Card className="p-4"><div className="flex gap-3"><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documents" /><Button onClick={load}><Search size={16} />Search</Button></div></Card>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-muted text-left"><tr><th className="p-3">File</th><th className="p-3">Request</th><th className="p-3">Student</th><th className="p-3">Created</th><th className="p-3 text-right">Actions</th></tr></thead>
          <tbody>{documents.map((doc) => <tr key={doc.id} className="border-t border-border"><td className="p-3 font-medium">{doc.fileName}</td><td className="p-3">{doc.request.requestNo}</td><td className="p-3">{doc.request.student.studentName}</td><td className="p-3">{new Date(doc.createdAt).toLocaleDateString()}</td><td className="p-3"><div className="flex justify-end gap-2"><a href={doc.filePath} target="_blank" rel="noreferrer"><Button variant="outline"><Download size={16} />View</Button></a><Button variant="secondary" onClick={() => window.open(doc.filePath)?.print()}><Printer size={16} />Print</Button><Button variant="danger" onClick={() => remove(doc.id)}><Trash2 size={16} />Delete</Button></div></td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}
